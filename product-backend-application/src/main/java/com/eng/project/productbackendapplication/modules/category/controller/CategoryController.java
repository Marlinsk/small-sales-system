package com.eng.project.productbackendapplication.modules.product.controller;

import com.eng.project.productbackendapplication.modules.product.dto.CategoryRequest;
import com.eng.project.productbackendapplication.modules.product.dto.CategoryResponse;
import com.eng.project.productbackendapplication.modules.product.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public CategoryResponse save(@RequestBody CategoryRequest request) {
        return categoryService.save(request);
    }
}
