package com.bookstore.backend.repository.impl;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookDetail;
import com.bookstore.backend.repository.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepositoryImpl implements BookRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void addBook(BookDetail book) {
        String sql = "INSERT INTO `book`(isbn, title, author, description, price, inventory, coverUrl) VALUE (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, book.getIsbn(), book.getTitle(), book.getAuthor(), book.getDescription(),
                book.getPrice(), book.getInventory(), book.getCoverUrl());

    }

    @Override
    public void updateBook(BookDetail book) {
        String sql = "UPDATE `book` SET isbn = ?, title = ?, author = ?, description = ?, price = ?, inventory = ?, coverUrl = ? where id = ?";
        jdbcTemplate.update(sql, book.getIsbn(), book.getTitle(), book.getAuthor(), book.getDescription(),
                book.getPrice(), book.getInventory(), book.getCoverUrl(), book.getId());

    }

    @Override
    public List<Book> getBooks() {
        return jdbcTemplate.query("SELECT * FROM book where visible = 1", new BeanPropertyRowMapper<>(Book.class));
    }

    @Override
    public BookDetail getBookDetail(Integer id) {
        String sql = "SELECT * FROM book WHERE id = " + id + " and visible = 1";
        var list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(BookDetail.class));
        return list.get(0);
    }

    @Override
    public void delBook(Integer id) {
        String sql = "UPDATE bookstore.book t SET t.visible = 0 WHERE t.id = ?";
        jdbcTemplate.update(sql, id);
    }
}
