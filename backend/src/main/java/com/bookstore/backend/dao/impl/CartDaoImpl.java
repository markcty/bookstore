package com.bookstore.backend.dao.impl;

import java.util.Set;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.Cart;
import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {

  @Autowired
  UserDao userDao;

  @Autowired
  BookDao bookDao;

  @Autowired
  CartRepository cartRepository;

  @Override
  public Set<CartItem> getCartItems(Integer userId) {
    return getCart(userId).getItems();
  }

  @Override
  public Integer getQuantityOfBook(Integer userId, Integer bookId) {
    var cart = getCart(userId);
    var cartItems = cart.getItems();
    for (var item : cartItems)
      if (item.getBook().getId() == bookId)
        return item.getQuantity();
    cartRepository.save(cart);
    return 0;
  }

  @Override
  public void updateQuantityOfBook(Integer userId, Integer bookId, int quantity) {
    var cart = getCart(userId);
    var cartItems = cart.getItems();
    CartItem newItem = null;
    for (var item : cartItems)
      if (item.getBook().getId() == bookId) {
        item.setQuantity(quantity);
        newItem = item;
        break;
      }
    if (newItem == null) {
      newItem = new CartItem();
      var book = bookDao.getBook(bookId).get();
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

  @Override
  public void clearCart(Integer userId) {
    var cart = userDao.getUser(userId).get().getCart();
    cart.getItems().clear();
    cartRepository.save(cart);
  }

  private Cart getCart(Integer userId) {
    return userDao.getUser(userId).get().getCart();
  }
}
