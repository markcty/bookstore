package com.bookstore.backend.dao;

import com.bookstore.backend.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> getBooks();

    Book getBook(String ISBN);
}
