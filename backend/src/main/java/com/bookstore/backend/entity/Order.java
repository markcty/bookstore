package com.bookstore.backend.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class Order {
  private Integer id;
  private Integer userId;
  private Timestamp time;
  private String name;
  private String phoneNumber;
  private String address;
  private String note;
  private BigDecimal totalPrice;
}
