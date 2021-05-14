package com.bookstore.backend.dao;

import com.bookstore.backend.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> getBooks();

    Book getBook(Integer id);

    void addBook(Book book);

    void updateBook(Book book);

    void delBook(Integer id);
}
