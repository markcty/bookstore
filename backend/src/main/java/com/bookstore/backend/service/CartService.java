package com.bookstore.backend.service;

import java.util.Set;

import com.bookstore.backend.msg.CartItemMsg;

public interface CartService {
  Set<CartItemMsg> getCartItems(Integer userId);

  void delCartItem(Integer userId, Integer bookId);

  void addCartItem(Integer userId, Integer bookId);

  void clearCart(Integer userId);
}
