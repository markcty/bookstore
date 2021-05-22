package com.bookstore.backend.repository;

import java.util.Optional;

import com.bookstore.backend.entity.Cart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
  Optional<Cart> findByUserId(Integer userId);
}