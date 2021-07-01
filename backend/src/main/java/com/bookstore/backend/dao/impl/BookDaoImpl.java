package com.bookstore.backend.dao.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.repository.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAllByIsDeletedFalse();

    }

    @Override
    public Optional<Book> getBook(Integer id) {
        return bookRepository.findById(id);
    }

    @Override
    public void delBook(Integer id) {
        var temp = bookRepository.findById(id);
        if (temp.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No such book to delete");

        var book = temp.get();
        book.setIsDeleted(1);
        bookRepository.save(book);
    }

    @Override
    public void updateBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public List<Book> getBooks(Integer page, Integer pageSize) {
        var p = PageRequest.of(page, pageSize);
        return bookRepository.findAllByIsDeleted(0, p);
    }

    @Override
    public Long getCount() {
        return bookRepository.countBooksByIsDeleted(0);
    }
}
