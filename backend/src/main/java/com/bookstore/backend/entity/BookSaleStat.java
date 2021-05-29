package com.bookstore.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookSaleStat {
  private String title;
  private Integer sales;
}
