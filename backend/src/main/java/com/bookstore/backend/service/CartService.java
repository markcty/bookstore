package com.bookstore.backend.service;

import java.util.List;

import com.bookstore.backend.entity.CartItemMeta;

public interface CartService {
  List<CartItemMeta> getCart(Integer userId);

  void delCartItem(Integer userId, Integer bookId);

  void addCartItem(Integer userId, Integer bookId);

  void clearCart(Integer userId);
}
