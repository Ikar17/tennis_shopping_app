package com.app.repository;

import com.app.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);
    Page<Product> findByCategory_Name(String categoryName, Pageable pageable);
    List<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);

}