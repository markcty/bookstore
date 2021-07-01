package com.bookstore.backend.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.dao.OrderDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookSaleStat;
import com.bookstore.backend.service.BookService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private OrderDao orderDao;

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book getBookDetail(Integer id) {
        var book = bookDao.getBook(id);
        if (book.isPresent())
            return book.get();
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such book");
    }

    @Override
    public void updateBook(Book book) {
        if (book.getIsDeleted() == null)
            book.setIsDeleted(0);
        bookDao.updateBook(book);
    }

    @Override
    public void delBook(Integer id) {
        bookDao.delBook(id);
    }

    @Override
    public List<BookSaleStat> getAllSales(LocalDate start, LocalDate end) {
        var startDate = Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant());
        var endDate = Date.from(end.atStartOfDay(ZoneId.systemDefault()).toInstant());

        var orders = orderDao.getAllOrders();
        var sales = new HashMap<String, Integer>();
        for (var order : orders) {
            var date = order.getPurchaseTime();
            if (!(date.after(startDate) && date.before(endDate)))
                continue;

            for (var item : order.getOrderItems()) {
                var bookTitle = item.getBook().getTitle();
                var quantity = item.getQuantity();
                if (sales.containsKey(bookTitle))
                    sales.replace(bookTitle, sales.get(bookTitle) + quantity);
                else
                    sales.put(bookTitle, quantity);
            }
        }
        var bookSales = new ArrayList<BookSaleStat>();
        for (var sale : sales.entrySet()) {
            bookSales.add(new BookSaleStat(sale.getKey(), sale.getValue()));
        }
        bookSales.sort((a, b) -> b.getSales() - a.getSales());
        return bookSales;
    }

    @Override
    public Map<String, Object> getBooks(Integer page, Integer pageSize) {
        var books=new HashMap<String,Object>();
        books.put("books",bookDao.getBooks(page,pageSize));
        books.put("total",bookDao.getCount());
        return books;
    }

}
