package com.bookstore.backend.repository;

import com.bookstore.backend.entity.Book;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BookRepository extends PagingAndSortingRepository<Book, Integer> {
    Long countBooksByIsDeleted(Integer isDeleted);

    List<Book> findAllByIsDeletedFalse();

    List<Book> findAllByIsDeleted(Integer isDeleted, Pageable page);
}
