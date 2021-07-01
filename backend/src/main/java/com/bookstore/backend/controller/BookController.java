package com.bookstore.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.BookSaleStat;
import com.bookstore.backend.service.BookService;
import com.bookstore.backend.utils.OssUtils;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    BookService bookService;

    @Autowired
    OssUtils ossUtils;

    @GetMapping("/public/books")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/public/bookPage")
    public Map<String, Object> getBooks(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return bookService.getBooks(page, pageSize);
    }

    @GetMapping("/public/book")
    public Book getBook(@RequestParam Integer id) {
        return bookService.getBookDetail(id);
    }

    @PostMapping("/admin/book")
    public void updateBook(@RequestBody Book book) {
        bookService.updateBook(book);
    }

    @DeleteMapping("/admin/book")
    public void delBook(@RequestParam Integer id) {
        bookService.delBook(id);
    }

    @GetMapping("/admin/sales")
    public List<BookSaleStat> getAllSales(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return bookService.getAllSales(start.toLocalDate(), end.toLocalDate());
    }

    @GetMapping("/createBucket")
    public void createBucket() {
        ossUtils.createBucket();
    }

    @PostMapping("/admin/uploadBookCover")
    public String upload(@RequestPart MultipartFile cover) {
        System.out.println(cover.getOriginalFilename());
        String url = ossUtils.uploadBookCover(cover);
        System.out.println(url);
        return url;
    }

}
