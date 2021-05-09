package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class Book {
    private String ISBN;
    private String title;
    private String author;
    private String description;
    private Double price;
    private Integer inventory;
    private String coverUrl;
}
