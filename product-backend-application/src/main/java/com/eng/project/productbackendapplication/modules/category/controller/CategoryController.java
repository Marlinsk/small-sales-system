package com.eng.project.productbackendapplication.modules.category.controller;

import com.eng.project.productbackendapplication.config.exception.SuccessResponse;
import com.eng.project.productbackendapplication.modules.category.dto.CategoryRequest;
import com.eng.project.productbackendapplication.modules.category.dto.CategoryResponse;
import com.eng.project.productbackendapplication.modules.category.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryResponse> findAll() {
        return categoryService.findByAll();
    }

    @GetMapping("{id}")
    public CategoryResponse findById(@PathVariable(name = "id") Integer id) {
        return categoryService.findByIdResponse(id);
    }

    @GetMapping("description/{description}")
    public List<CategoryResponse> findByDescription(@PathVariable(name = "description") String description) {
        return categoryService.findByDescription(description);
    }

    @PostMapping
    public CategoryResponse save(@RequestBody CategoryRequest request) {
        return categoryService.save(request);
    }

    @PutMapping("{id}")
    public CategoryResponse update(@RequestBody CategoryRequest request, @PathVariable(name = "id") Integer id) {
        return categoryService.update(request, id);
    }

    @DeleteMapping("{id}")
    public SuccessResponse delete(@PathVariable(name = "id") Integer id) {
        return categoryService.delete(id);
    }
}
