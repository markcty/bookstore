package com.bookstore.backend.dao;

import java.util.List;

import com.bookstore.backend.entity.CartItemMeta;

public interface CartDao {
  List<CartItemMeta> getCart(Integer userId);

  void delCartItem(Integer id);

  void addCartItem(Integer userId, Integer bookId);

  void clearCart(Integer userId);
}
