package com.bookstore.backend.entity;

import java.util.ArrayList;

import lombok.Data;

@Data
public class Order {
  private Integer id;
  private Integer userId;
  private String phoneNumber;
  private String address;
  private String note;
  private ArrayList<Integer> books;
}
