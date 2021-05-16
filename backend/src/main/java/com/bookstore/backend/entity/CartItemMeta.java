package com.bookstore.backend.entity;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CartItemMeta {
  private Integer bookId;
  private String title;
  private String author;
  private BigDecimal price;
  private String coverUrl;
  private Integer quantity;
}
