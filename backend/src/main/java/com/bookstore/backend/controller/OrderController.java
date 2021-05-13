package com.bookstore.backend.controller;

import java.util.List;
import java.util.Map;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.security.auth.AuthUserDetail;
import com.bookstore.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class OrderController {

  @Autowired
  OrderService orderService;

  @PostMapping("/checkout")
  public String checkout(@RequestBody Map<String, String> body) {
    var userId = Integer.parseInt(body.get("userId"));
    var name = body.get("name");
    var note = body.get("note");
    var phoneNumber = body.get("phoneNumber");
    var address = body.get("address");
    orderService.checkout(userId, name, phoneNumber, address, note);
    return "success";
  }

  @GetMapping("/orders")
  public List<Order> getOrders() {
    AuthUserDetail user = (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return orderService.getOrders(user.getId());
  }
}
