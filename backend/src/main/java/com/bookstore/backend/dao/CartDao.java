package com.bookstore.backend.dao;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.Cart;

public interface CartDao {
  Integer getQuantityOfBook(Cart cart, Book book);

  void updateQuantityOfBook(Cart cart, Book book, int quantity);

  void clearCart(Cart cart);
}
