package com.bookstore.backend.controller;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/books")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/book")
    public Book getBook(@RequestParam Integer id) {
        return bookService.getBook(id);
    }

    @PostMapping("/updateBook")
    public void updateBook(@RequestBody Book book) {
        System.out.println("update!!!!!!");
        System.out.println(book);
        bookService.updateBook(book);
    }

}
