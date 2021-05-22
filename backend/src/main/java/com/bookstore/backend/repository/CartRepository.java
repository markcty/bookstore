package com.bookstore.backend.repository;

import java.util.List;

import com.bookstore.backend.entity.CartItemMeta;

public interface CartRepository {
  List<CartItemMeta> getCart(Integer userId);

  Integer getQuantityOfBook(Integer userId, Integer bookId);

  void updateQuantityOfBook(Integer userId, Integer bookId, Integer quantity);

  Integer getCartIdOfUser(Integer userId);

  void clearCart(Integer userId);
}
