package com.bookstore.backend.service.impl;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.BuyerStat;
import com.bookstore.backend.entity.User;
import com.bookstore.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserDao userDao;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Override
  public void register(String username, String password) {
    userDao.register(username, passwordEncoder.encode(password));
  }

  @Override
  public User getUser(String username) {
    return userDao.getUser(username).get();
  }

  @Override
  public Set<User> getUsers() {
    return userDao.getUsers();
  }

  @Override
  public List<BuyerStat> getGoldenBuyers(LocalDate start, LocalDate end) {
    var startDate = Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant());
    var endDate = Date.from(end.atStartOfDay(ZoneId.systemDefault()).toInstant());
    var users = userDao.getUsers();
    var buyers = new ArrayList<BuyerStat>();
    for (var user : users) {
      var orders = user.getOrders();
      Integer booksBought = 0;
      for (var order : orders) {
        var date = order.getPurchaseTime();
        if (!(date.after(startDate) && date.before(endDate)))
          continue;
        for (var item : order.getOrderItems()) {
          booksBought += item.getQuantity();
        }
      }
      buyers.add(new BuyerStat(user.getUsername(), booksBought));
    }
    buyers.sort((a, b) -> b.getBooksBought() - a.getBooksBought());
    return buyers;
  }

}
