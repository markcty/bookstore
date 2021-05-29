package com.bookstore.backend.service;

import java.time.LocalDate;
import java.util.List;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookSaleStat;

public interface BookService {
    List<Book> getBooks();

    Book getBookDetail(Integer id);

    void updateBook(Book book);

    void delBook(Integer id);

    List<BookSaleStat> getHotSales(LocalDate start, LocalDate end);
}
