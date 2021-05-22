package com.bookstore.backend.repository;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookDetail;

import java.util.List;

public interface BookDao {
    List<Book> getBooks();

    BookDetail getBookDetail(Integer id);

    void addBook(BookDetail book);

    void updateBook(BookDetail book);

    void delBook(Integer id);
}
