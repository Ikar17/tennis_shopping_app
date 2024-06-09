package com.app.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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