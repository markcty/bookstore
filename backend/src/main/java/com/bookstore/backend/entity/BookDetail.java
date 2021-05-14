package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class BookDetail {
  private Integer id;
  private String isbn;
  private String title;
  private String author;
  private String description;
  private Double price;
  private Integer inventory;
  private String coverUrl;
}
