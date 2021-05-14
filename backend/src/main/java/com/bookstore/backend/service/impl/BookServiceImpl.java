package com.bookstore.backend.service.impl;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book getBook(Integer id) {
        return bookDao.getBook(id);
    }

    @Override
    public void updateBook(Book book) {
        if (book.getId() == -1)
            bookDao.addBook(book);
        bookDao.updateBook(book);
    }

}
