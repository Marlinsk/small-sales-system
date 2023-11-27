package com.eng.project.productbackendapplication.modules.product.repository;

import com.eng.project.productbackendapplication.modules.product.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> { }
