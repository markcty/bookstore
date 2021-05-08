package com.bookstore.backend.service.impl;

import com.bookstore.backend.dao.impl.BookDaoImpl;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired
    private BookDaoImpl bookDao;

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }
}
