package com.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDetailsDTO {
    private List<Integer> productsId;
}
