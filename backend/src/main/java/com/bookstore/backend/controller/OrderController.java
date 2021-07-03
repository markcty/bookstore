package com.bookstore.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderItem;
import com.bookstore.backend.security.auth.AuthUserDetail;
import com.bookstore.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderController {

  @Autowired OrderService orderService;

  @PostMapping("/checkout")
  public void checkout(@RequestBody Map<String, String> body) {
    AuthUserDetail user =
        (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    var userId = user.getId();
    var consignee = body.get("consignee");
    var note = body.get("note");
    var phoneNumber = body.get("phoneNumber");
    var address = body.get("address");
    orderService.checkout(userId, consignee, phoneNumber, address, note);
  }

  @GetMapping("/orders")
  public List<Order> getOrders() {
    AuthUserDetail user =
        (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return orderService.getOrders(user.getId());
  }

  @GetMapping("/ordersPage")
  public List<Order> getOrdersPage(@RequestParam Integer page, @RequestParam Integer pageSize) {
    AuthUserDetail user =
        (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return orderService.getOrdersPage(user.getId(), page, pageSize);
  }

  @GetMapping("/order")
  public Set<OrderItem> getOrderDetail(@RequestParam Integer id) {
    AuthUserDetail user =
        (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return orderService.getOrder(user.getId(), id);
  }

  @GetMapping("/admin/orders")
  public List<Order> getAllOrders() {
    return orderService.getAllOrders();
  }

  @GetMapping("/admin/ordersPage")
  public List<Order> getAllOrdersPage(@RequestParam Integer page, @RequestParam Integer pageSize) {
    return orderService.getAllOrdersPage(page, pageSize);
  }
}
