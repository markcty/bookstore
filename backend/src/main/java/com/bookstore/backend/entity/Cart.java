package com.bookstore.backend.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Entity
@Table(name = "cart")
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Setter(AccessLevel.NONE)
  private Integer id;

  private Integer userId;

  @OneToMany(orphanRemoval = true, fetch = FetchType.EAGER)
  @JoinColumn(name = "cart_id")
  private Set<CartItem> items;

  public Set<CartItem> getItems() {
    return items;
  }
}
