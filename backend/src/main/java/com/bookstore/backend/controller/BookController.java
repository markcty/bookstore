package com.bookstore.backend.controller;

import java.util.List;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookDetail;
import com.bookstore.backend.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/books")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/book")
    public BookDetail getBook(@RequestParam Integer id) {
        return bookService.getBookDetail(id);
    }

    @PostMapping("/admin/book")
    public void updateBook(@RequestBody BookDetail book) {
        System.out.println("update!!!!!!");
        System.out.println(book);
        bookService.updateBook(book);
    }

    @DeleteMapping("/admin/book")
    public void delBook(@RequestParam Integer id) {
        bookService.delBook(id);
    }
}
