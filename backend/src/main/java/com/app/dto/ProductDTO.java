package com.app.dto;


import lombok.Data;

@Data
public class ProductDTO {
    private String category;
    private String name;
    private Double price;
    private Integer quantity;
    private Boolean available;
    private String image;
}
