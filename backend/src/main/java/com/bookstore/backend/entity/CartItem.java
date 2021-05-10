package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class CartItem {
  private Integer id;
  private Integer bookId;
  private String title;
  private String author;
  private Double price;
  private Integer inventory;
  private String coverUrl;
}
