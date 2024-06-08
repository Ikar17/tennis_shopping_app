package com.app.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private Category category;
    private String name;
    private Double price;
    private Integer quantity;
    private Boolean available;
    @Lob
    private String image;
    private Date createdAt;
    private Date updateAt;

    @PrePersist
    public void create(){
        createdAt = new Date();
        updateAt = createdAt;
    }
    @PreUpdate
    public void update(){
        updateAt = new Date();
    }
}