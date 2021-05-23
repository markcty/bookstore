package com.bookstore.backend.dao;

import java.util.Set;

import com.bookstore.backend.entity.CartItem;

public interface CartDao {

  Set<CartItem> getCartItems(Integer userId);

  Integer getQuantityOfBook(Integer userId, Integer bookId);

  void updateQuantityOfBook(Integer userId, Integer bookId, int quantity);

  void clearCart(Integer userId);
}
