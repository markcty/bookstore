package com.bookstore.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BuyerStat {
  String username;
  Integer booksBought;
}
