package com.bookstore.backend.dao.impl;

import java.util.List;
import java.util.Optional;

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
    return bookRepository.findAll();
  }

  @Override
  public Optional<Book> getBookDetail(Integer id) {
    return bookRepository.findById(id);
  }

  @Override
  public void delBook(Integer id) {
    bookRepository.deleteById(id);
  }

  @Override
  public void updateBook(Book book) {
    bookRepository.save(book);
  }
}
