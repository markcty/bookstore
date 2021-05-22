package com.bookstore.backend.dao.impl;

import java.util.Set;

import com.bookstore.backend.dao.CartDao;
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
  public Set<CartItem> getCartItems(Integer userId) {
    var cart = cartRepository.findByUserId(userId);
    if (!cart.isPresent()) {
      Cart newCart = new Cart();
      newCart.setUserId(userId);
      cartRepository.save(newCart);
      return newCart.getItems();
    }
    return cart.get().getItems();
  }

}
