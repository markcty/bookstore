package com.bookstore.backend.service.impl;

import java.util.List;

import com.bookstore.backend.entity.CartItemMeta;
import com.bookstore.backend.repository.CartDao;
import com.bookstore.backend.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

  @Autowired
  CartDao cartDao;

  @Override
  public List<CartItemMeta> getCart(Integer userId) {
    return cartDao.getCart(userId);
  }

  @Override
  public void delCartItem(Integer userId, Integer bookId) {
    var quantity = cartDao.getQuantityOfBook(userId, bookId);
    if (quantity <= 0)
      return;
    cartDao.updateQuantityOfBook(userId, bookId, quantity - 1);
  }

  @Override
  public void addCartItem(Integer userId, Integer bookId) {
    var quantity = cartDao.getQuantityOfBook(userId, bookId);
    cartDao.updateQuantityOfBook(userId, bookId, quantity + 1);

  }

  @Override
  public void clearCart(Integer userId) {
    cartDao.clearCart(userId);
  }

}
