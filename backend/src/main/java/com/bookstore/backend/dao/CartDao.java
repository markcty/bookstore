package com.bookstore.backend.dao;

import java.util.List;

import com.bookstore.backend.entity.CartItem;

public interface CartDao {
  List<CartItem> getCartItems(Integer userId);
}
