package com.bookstore.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookSaleStat;

public interface BookService {
    List<Book> getBooks();

    Map<String, Object> getBooks(Integer page, Integer pageSize);

    Book getBookDetail(Integer id);

    void updateBook(Book book);

    void delBook(Integer id);

    List<BookSaleStat> getAllSales(LocalDate start, LocalDate end);

    List<Book> getBooks(String title);
}
