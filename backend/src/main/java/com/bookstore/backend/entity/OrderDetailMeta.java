package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class OrderDetailMeta {
  private Integer bookId;
  private String title;
  private Double price;
  private Integer quantity;
}
