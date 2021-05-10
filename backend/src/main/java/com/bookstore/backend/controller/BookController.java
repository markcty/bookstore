package com.bookstore.backend.controller;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    BookService bookService;

    @CrossOrigin
    @GetMapping("/api/books")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @CrossOrigin
    @GetMapping("/api/book")
    public Book getBook(@RequestParam Integer id) {
        return bookService.getBook(id);
    }

}
