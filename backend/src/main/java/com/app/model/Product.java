package com.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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
    private byte[] image;

}
