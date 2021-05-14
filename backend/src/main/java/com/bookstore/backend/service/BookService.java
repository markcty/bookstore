package com.bookstore.backend.service;

import com.bookstore.backend.entity.Book;

import java.util.List;

public interface BookService {
    List<Book> getBooks();

    Book getBook(Integer id);

    void updateBook(Book book);

    void delBook(Integer id);
}
