package com.bookstore.backend.dao.impl;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void addBook(Book book) {
        String sql = "INSERT INTO `book`(isbn, title, author, description, price, inventory, coverUrl) VALUE (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, book.getIsbn(), book.getTitle(), book.getAuthor(), book.getDescription(),
                book.getPrice(), book.getInventory(), book.getCoverUrl());

    }

    @Override
    public void updateBook(Book book) {
        String sql = "UPDATE `book` SET isbn = ?, title = ?, author = ?, description = ?, price = ?, inventory = ?, coverUrl = ? where id = ?";
        jdbcTemplate.update(sql, book.getIsbn(), book.getTitle(), book.getAuthor(), book.getDescription(),
                book.getPrice(), book.getInventory(), book.getCoverUrl(), book.getId());

    }

    @Override
    public List<Book> getBooks() {
        return jdbcTemplate.query("SELECT * FROM book", new BeanPropertyRowMapper<>(Book.class));
    }

    @Override
    public Book getBook(Integer id) {
        String sql = "SELECT * FROM book WHERE id='" + id + "'";
        var list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Book.class));
        return list.get(0);
    }
}
