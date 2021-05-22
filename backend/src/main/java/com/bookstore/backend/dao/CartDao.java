package com.bookstore.backend.dao;

import java.util.Set;

import com.bookstore.backend.entity.CartItem;

public interface CartDao {
  Set<CartItem> getCartItems(Integer userId);
}
