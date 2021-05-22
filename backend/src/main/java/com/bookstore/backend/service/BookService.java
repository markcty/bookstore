package com.bookstore.backend.service;

import java.util.List;

import com.bookstore.backend.entity.Book;

public interface BookService {
    List<Book> getBooks();

    Book getBookDetail(Integer id);

    void updateBook(Book book);

    void delBook(Integer id);
}
