package com.app.model;

import com.app.utils.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetails {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private User user;
    @ManyToMany
    private List<OrderProduct> products;
    private Date createdAt;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @PrePersist
    public void create(){
        createdAt = new Date();
    }
}
