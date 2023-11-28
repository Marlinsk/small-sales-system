package com.eng.project.productbackendapplication.modules.product.dto;

import com.eng.project.productbackendapplication.modules.category.dto.CategoryResponse;
import com.eng.project.productbackendapplication.modules.product.model.Product;
import com.eng.project.productbackendapplication.modules.supplier.dto.SupplierResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Integer id;
    private String name;
    @JsonProperty("quantity_available")
    private Integer quantityAvailable;
    @JsonProperty("created_at")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonProperty("updated_at")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;
    private CategoryResponse category;
    private SupplierResponse supplier;

    public static ProductResponse of(Product product) {
        return ProductResponse
                .builder()
                .id(product.getId())
                .name(product.getName())
                .quantityAvailable(product.getQuantityAvailable())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .category(CategoryResponse.of(product.getCategory()))
                .supplier(SupplierResponse.of(product.getSupplier()))
                .build();
    }
}
