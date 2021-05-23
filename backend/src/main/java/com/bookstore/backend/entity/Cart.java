package com.bookstore.backend.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private Integer userId;

  @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "cart")
  private Set<CartItem> items = new HashSet<>();

  public Set<CartItem> getItems() {
    return items;
  }

  public Integer getId() {
    return id;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public void setItems(Set<CartItem> items) {
    this.items = items;
  }
}
