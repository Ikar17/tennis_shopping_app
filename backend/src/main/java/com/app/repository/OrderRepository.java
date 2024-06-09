package com.app.repository;

import com.app.model.OrderDetails;
import com.app.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderDetails, Integer> {
    Page<OrderDetails> findByUser(User user, Pageable pageable);
    @Transactional
    Page<OrderDetails> findAll(Pageable pageable);
}
