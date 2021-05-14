package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class CartItemMeta {
  private Integer bookId;
  private String title;
  private String author;
  private Double price;
  private String coverUrl;
  private Integer quantity;
}
