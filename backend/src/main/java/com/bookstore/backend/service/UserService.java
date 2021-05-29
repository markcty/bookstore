package com.bookstore.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.bookstore.backend.entity.BuyerStat;
import com.bookstore.backend.entity.User;

public interface UserService {
  void register(String username, String password);

  User getUser(String username);

  Set<User> getUsers();

  List<BuyerStat> getGoldenBuyers(LocalDate start, LocalDate end);
}
