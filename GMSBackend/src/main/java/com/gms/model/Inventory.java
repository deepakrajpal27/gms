package com.gms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "product")
@EqualsAndHashCode(exclude = "product")
@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnoreProperties("inventory")
    private Product product;

    @Column(nullable = false)
    private Integer quantity;
    /*
    @Column(name = "min_stock_level")
    private Integer minimumStockLevel;

    @Column(name = "max_stock_level")
    private Integer maximumStockLevel;
*/
}
