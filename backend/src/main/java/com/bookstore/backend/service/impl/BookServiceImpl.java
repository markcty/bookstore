package com.bookstore.backend.service.impl;

import java.util.List;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book getBookDetail(Integer id) {
        var book = bookDao.getBookDetail(id);
        if (book.isPresent())
            return book.get();
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such book");
    }

    @Override
    public void updateBook(Book book) {
        if (book.getId() == -1)
            bookDao.addBook(book);
        bookDao.updateBook(book);
    }

    @Override
    public void delBook(Integer id) {
        bookDao.delBook(id);
    }

}
