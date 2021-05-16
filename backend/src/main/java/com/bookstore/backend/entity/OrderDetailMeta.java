package com.bookstore.backend.entity;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderDetailMeta {
  private Integer bookId;
  private String title;
  private BigDecimal price;
  private Integer quantity;
}
