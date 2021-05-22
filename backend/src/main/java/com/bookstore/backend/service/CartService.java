package com.bookstore.backend.service;

import java.util.Set;

import com.bookstore.backend.entity.CartItem;

public interface CartService {
  Set<CartItem> getCart(Integer userId);

  void delCartItem(Integer userId, Integer bookId);

  void addCartItem(Integer userId, Integer bookId);

  void clearCart(Integer userId);
}
