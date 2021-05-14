package com.bookstore.backend.service;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookDetail;

import java.util.List;

public interface BookService {
    List<Book> getBooks();

    BookDetail getBookDetail(Integer id);

    void updateBook(BookDetail book);

    void delBook(Integer id);
}
