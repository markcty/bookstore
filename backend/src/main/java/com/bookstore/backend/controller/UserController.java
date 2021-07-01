package com.bookstore.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bookstore.backend.entity.BuyerStat;
import com.bookstore.backend.entity.User;
import com.bookstore.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  UserService userService;

  @PostMapping("/public/register")
  public void register(@RequestBody Map<String, String> body) {
    userService.register(body.get("username"), body.get("password"));
  }

  @GetMapping("/admin/users")
  public Set<User> getUsers() {
    return userService.getUsers();
  }

  @GetMapping("/admin/goldenBuyers")
  public List<BuyerStat> getGoldenBuyers(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
    return userService.getGoldenBuyers(start.toLocalDate(), end.toLocalDate());
  }

  @DeleteMapping("/admin/disableUser")
  public void disableUser(@RequestParam Integer id) {
    userService.disableUser(id);
  }

  @GetMapping("/admin/enableUser")
  public void enableUser(@RequestParam Integer id) {
    userService.enableUser(id);
  }
}
