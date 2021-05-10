package com.bookstore.backend.controller;

import java.util.List;

import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartController {

  @Autowired
  CartService cartService;

  @CrossOrigin
  @GetMapping("/api/cart")
  public List<CartItem> getCartItems(@RequestParam Integer userId) {
    return cartService.getCartItems(userId);
  }

  @CrossOrigin
  @DeleteMapping("/api/cart")
  public void delCartItem(@RequestParam Integer id) {
    cartService.delCartItem(id);
  }
}
