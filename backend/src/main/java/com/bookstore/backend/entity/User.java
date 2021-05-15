package com.bookstore.backend.entity;

import lombok.Data;

@Data
public class User {
  private Integer id;
  private String username;
  private String password;
  private Integer isAdmin;
  private Integer isEnabled;
}
