package com.bookstore.backend.controller;

import java.util.Map;

import com.bookstore.backend.entity.User;
import com.bookstore.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

  @Autowired
  UserService userService;

  @PostMapping("/register")
  public void register(@RequestBody Map<String, String> body) {
    userService.register(body.get("username"), body.get("password"));
  }

  @GetMapping("/login")
  public User login() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();
    var user = userService.getUser(username);
    return user.get();
  }
}
