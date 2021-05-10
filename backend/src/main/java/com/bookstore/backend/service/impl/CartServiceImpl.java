package com.bookstore.backend.service.impl;

import java.util.List;

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
  public List<CartItem> getCartItems(Integer userId) {
    return cartDao.getCartItems(userId);
  }
}
