package com.bookstore.backend.controller;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class BookController {

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired
    BookService bookService;

    @CrossOrigin
    @GetMapping("/api/books")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @CrossOrigin
    @GetMapping("/api/book")
    public Book getBook(@RequestParam String ISBN) {
        return bookService.getBook(ISBN);
    }

}
