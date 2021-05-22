package com.bookstore.backend.service.impl;

import java.util.Set;

import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.entity.CartItem;
import com.bookstore.backend.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

  @Autowired
  CartDao cartDao;

  @Override
  public Set<CartItem> getCart(Integer userId) {
    return cartDao.getCartItems(userId);
  }

  @Override
  public void delCartItem(Integer userId, Integer bookId) {
    // var quantity = cartDao.getQuantityOfBook(userId, bookId);
    // if (quantity <= 0)
    // return;
    // cartDao.updateQuantityOfBook(userId, bookId, quantity - 1);
  }

  @Override
  public void addCartItem(Integer userId, Integer bookId) {
    // var quantity = cartDao.getQuantityOfBook(userId, bookId);
    // cartDao.updateQuantityOfBook(userId, bookId, quantity + 1);
  }

  @Override
  public void clearCart(Integer userId) {
    // cartDao.clearCart(userId);
  }

}
