package com.eng.project.productbackendapplication.modules.product.model;

import com.eng.project.productbackendapplication.modules.category.model.Category;
import com.eng.project.productbackendapplication.modules.product.dto.ProductRequest;
import com.eng.project.productbackendapplication.modules.supplier.model.Supplier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "FK_Category", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "FK_Supplier", nullable = false)
    private Supplier supplier;

    public static Product of(ProductRequest request, Category category, Supplier supplier) {
        return Product
                .builder()
                .name(request.getName())
                .quantityAvailable(request.getQuantityAvailable())
                .category(category)
                .supplier(supplier)
                .build();
    }
}
