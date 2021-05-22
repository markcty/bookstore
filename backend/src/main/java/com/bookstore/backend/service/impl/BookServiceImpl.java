package com.bookstore.backend.service.impl;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookDetail;
import com.bookstore.backend.repository.BookRepository;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookDao;

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public BookDetail getBookDetail(Integer id) {
        return bookDao.getBookDetail(id);
    }

    @Override
    public void updateBook(BookDetail book) {
        if (book.getId() == -1)
            bookDao.addBook(book);
        bookDao.updateBook(book);
    }

    @Override
    public void delBook(Integer id) {
        bookDao.delBook(id);
    }

}
