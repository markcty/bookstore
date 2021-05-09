package com.bookstore.backend.service;

import com.bookstore.backend.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookService {
    List<Book> getBooks();

    Book getBook(String ISBN);
}
