package com.bookstore.backend.controller;

import java.util.Set;

import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.security.auth.AuthUserDetail;
import com.bookstore.backend.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('User')")
public class CartController {

  @Autowired
  CartService cartService;

  @GetMapping("/user/cart")
  public Set<CartItem> getCartItems() {
    AuthUserDetail user = (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return cartService.getCart(user.getId());
  }

  @DeleteMapping("/user/cart")
  public void delCartItem(@RequestParam Integer bookId) {
    AuthUserDetail user = (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    cartService.delCartItem(user.getId(), bookId);
  }

  @PostMapping("/user/cart")
  public void addCartItem(@RequestParam Integer bookId) {
    AuthUserDetail user = (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    cartService.addCartItem(user.getId(), bookId);
  }
}
