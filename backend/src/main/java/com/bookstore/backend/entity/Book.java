package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class Book {
    private String ISBN;
    private String title;
    private String author;
    private String description;
    private String imageUrl;
    private Double price;
    private Integer inventory;

    public Book(String ISBN, String title, String author, String description, String imageUrl, Double price, Integer inventory) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.inventory = inventory;
    }
}
