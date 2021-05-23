package com.bookstore.backend.msg;

import java.math.BigDecimal;

import com.bookstore.backend.entity.CartItem;

import lombok.Data;

@Data
public class CartItemMsg {
  private Integer bookId;
  private String title;
  private String author;
  private BigDecimal price;
  private String coverUrl;
  private Integer quantity;

  public CartItemMsg(final CartItem cartItem) {
    var book = cartItem.getBook();
    bookId = book.getId();
    title = book.getTitle();
    author = book.getAuthor();
    price = book.getPrice();
    coverUrl = book.getCoverUrl();
    quantity = cartItem.getQuantity();
  }
}
