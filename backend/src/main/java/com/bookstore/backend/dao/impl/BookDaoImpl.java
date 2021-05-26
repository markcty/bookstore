package com.bookstore.backend.dao.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.repository.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {

  @Autowired
  BookRepository bookRepository;

  @Override
  public List<Book> getBooks() {
    return bookRepository.findAll().stream().filter(book -> book.getIsDeleted() != 1).collect(Collectors.toList());
  }

  @Override
  public Optional<Book> getBook(Integer id) {
    return bookRepository.findById(id);
  }

  @Override
  public void delBook(Integer id) {
    var book = bookRepository.findById(id).get();
    book.setIsDeleted(1);
    bookRepository.save(book);
  }

  @Override
  public void updateBook(Book book) {
    bookRepository.save(book);
  }
}
