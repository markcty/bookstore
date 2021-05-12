package com.bookstore.backend.controller;

import java.util.Map;

import com.bookstore.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

  @Autowired
  UserService authService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @PostMapping("/register")
  public void register(@RequestBody Map<String, String> body) {
    var username = body.get("username");
    var password = body.get("password");
    System.out.println("register!!!!!!");
    System.out.println(username);
    System.out.println(password);
    authService.register(username, password);
  }

  @GetMapping("/login")
  public String login() {
    System.out.println("login!!!!!!!!!!");
    return "Welcome";
  }
}
