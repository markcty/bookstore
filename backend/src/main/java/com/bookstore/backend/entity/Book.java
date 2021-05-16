package com.bookstore.backend.entity;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class Book {
    private Integer id;
    private String isbn;
    private Integer inventory;
    private String title;
    private String author;
    private BigDecimal price;
    private String coverUrl;
}
