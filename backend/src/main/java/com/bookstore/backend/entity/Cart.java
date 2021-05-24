package com.bookstore.backend.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "cart")
  private Set<CartItem> items = new HashSet<>();

  public Set<CartItem> getItems() {
    return items;
  }

  public Integer getId() {
    return id;
  }

  public void setItems(Set<CartItem> items) {
    this.items = items;
  }
}
