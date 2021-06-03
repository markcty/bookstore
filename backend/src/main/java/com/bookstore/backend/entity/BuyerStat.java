package com.bookstore.backend.entity;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BuyerStat {
  String username;
  BigDecimal moneySpent;
}
