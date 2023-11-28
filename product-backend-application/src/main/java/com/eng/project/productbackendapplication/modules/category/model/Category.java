package com.eng.project.productbackendapplication.modules.category.model;

import com.eng.project.productbackendapplication.modules.category.dto.CategoryRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

    public static Category of(CategoryRequest request) {
        var category = new Category();
        BeanUtils.copyProperties(request, category);
        return category;
    }
}
