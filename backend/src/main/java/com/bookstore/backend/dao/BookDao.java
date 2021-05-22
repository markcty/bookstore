package com.bookstore.backend.dao;

import java.util.List;
import java.util.Optional;

import com.bookstore.backend.entity.Book;

public interface BookDao {
  List<Book> getBooks();

  Optional<Book> getBookDetail(Integer id);

  void updateBook(Book book);

  void delBook(Integer id);
}
