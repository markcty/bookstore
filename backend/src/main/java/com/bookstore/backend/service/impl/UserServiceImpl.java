package com.bookstore.backend.service.impl;

import java.math.BigDecimal;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserDao userDao;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Override
  public void register(String username, String password) {
    if (userDao.getUser(username).isPresent())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username duplicated");
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
      BigDecimal moneySpent = new BigDecimal(0);
      for (var order : orders) {
        var date = order.getPurchaseTime();
        if (!(date.after(startDate) && date.before(endDate)))
          continue;
        moneySpent = moneySpent.add(order.getTotalPrice());
      }
      buyers.add(new BuyerStat(user.getUsername(), moneySpent));
    }
    buyers.sort((a, b) -> b.getMoneySpent().compareTo(a.getMoneySpent()));
    return buyers;
  }

  @Override
  public void disableUser(Integer id) {
    var user = userDao.getUser(id);
    if (!user.isPresent())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "no such user");
    user.get().setIsEnabled(0);
    userDao.updateUser(user.get());
  }

  @Override
  public void enableUser(Integer id) {
    var user = userDao.getUser(id);
    if (!user.isPresent())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "no such user");
    user.get().setIsEnabled(1);
    userDao.updateUser(user.get());
  }

}
