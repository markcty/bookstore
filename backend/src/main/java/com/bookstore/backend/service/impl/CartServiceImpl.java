package com.bookstore.backend.service.impl;

import java.util.Set;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

  @Autowired
  CartDao cartDao;

  @Autowired
  UserDao userDao;

  @Autowired
  BookDao bookDao;

  @Override
  public Set<CartItem> getCartItems(Integer userId) {
    return userDao.getUser(userId).get().getCart().getItems();
  }

  @Override
  public void delCartItem(Integer userId, Integer bookId) {
    var user = userDao.getUser(userId).get();
    var cart = user.getCart();
    var book = bookDao.getBook(bookId).get();
    var quantity = cartDao.getQuantityOfBook(cart, book);
    if (quantity <= 0)
      return;
    cartDao.updateQuantityOfBook(cart, book, quantity - 1);
  }

  @Override
  public void addCartItem(Integer userId, Integer bookId) {
    var user = userDao.getUser(userId).get();
    var cart = user.getCart();
    var book = bookDao.getBook(bookId).get();
    var quantity = cartDao.getQuantityOfBook(cart, book);
    cartDao.updateQuantityOfBook(cart, book, quantity + 1);
  }

  @Override
  public void clearCart(Integer userId) {
    var user = userDao.getUser(userId).get();
    var cart = user.getCart();
    cartDao.clearCart(cart);
  }

}
