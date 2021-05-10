package com.bookstore.backend.service;

import java.util.List;

import com.bookstore.backend.entity.CartItem;

public interface CartService {
  List<CartItem> getCartItems(Integer userId);

  void delCartItem(Integer id);

  void addCartItem(Integer userId, Integer bookId);
}
