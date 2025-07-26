package com.gms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCreateRequest {
    private String name;
    private String description;
    private java.math.BigDecimal price;
    private Long categoryId;
    private Integer quantity;
}

