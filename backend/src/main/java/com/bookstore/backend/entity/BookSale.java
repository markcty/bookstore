package com.bookstore.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookSale {
  private String title;
  private Integer sales;
}
