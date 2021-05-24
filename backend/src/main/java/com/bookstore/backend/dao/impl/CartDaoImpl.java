package com.bookstore.backend.dao.impl;

import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.Cart;
import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {

  @Autowired
  CartRepository cartRepository;

  @Override
  public void clearCart(Cart cart) {
    cart.getItems().clear();
    cartRepository.save(cart);
  }

  @Override
  public Integer getQuantityOfBook(Cart cart, Book book) {
    var cartItems = cart.getItems();
    for (var item : cartItems)
      if (item.getBook().equals(book))
        return item.getQuantity();
    return 0;
  }

  @Override
  public void updateQuantityOfBook(Cart cart, Book book, int quantity) {
    var cartItems = cart.getItems();
    CartItem newItem = null;
    for (var item : cartItems)
      if (item.getBook().equals(book)) {
        item.setQuantity(quantity);
        newItem = item;
        break;
      }
    if (newItem == null) {
      newItem = new CartItem();
      newItem.setBook(book);
      newItem.setCart(cart);
      newItem.setQuantity(quantity);
      cartItems.add(newItem);
    }
    if (quantity == 0)
      cartItems.remove(newItem);
    cart.setItems(cartItems);
    cartRepository.save(cart);
  }
}
