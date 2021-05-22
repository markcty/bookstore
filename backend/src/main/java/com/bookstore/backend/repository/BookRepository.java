package com.bookstore.backend.repository;

import com.bookstore.backend.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
