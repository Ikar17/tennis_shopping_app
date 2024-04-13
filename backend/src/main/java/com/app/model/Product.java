package com.app.model;

import jakarta.persistence.*;
import lombok.*;

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
    private byte[] image;

}
