package com.bookstore.backend.controller;

import java.util.List;
import java.util.Map;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CartController {

  @Autowired
  CartService cartService;

  @CrossOrigin
  @GetMapping("/cart")
  public List<CartItem> getCartItems(@RequestParam Integer userId) {
    return cartService.getCartItems(userId);
  }

  @CrossOrigin
  @DeleteMapping("/cart")
  public void delCartItem(@RequestParam Integer id) {
    cartService.delCartItem(id);
  }

  @CrossOrigin
  @PostMapping("/cart")
  public void addCartItem(@RequestBody Map<String, Integer> body) {
    var userId = body.get("userId");
    var bookId = body.get("bookId");
    cartService.addCartItem(userId, bookId);
  }
}
