package com.eng.project.productbackendapplication.modules.product.services;

import com.eng.project.productbackendapplication.config.exception.ValidationException;
import com.eng.project.productbackendapplication.modules.product.dto.CategoryRequest;
import com.eng.project.productbackendapplication.modules.product.dto.CategoryResponse;
import com.eng.project.productbackendapplication.modules.product.model.Category;
import com.eng.project.productbackendapplication.modules.product.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryResponse save(CategoryRequest request) {
        validateCategoryNameInformed(request);
        var category = categoryRepository.save(Category.of(request));
        return CategoryResponse.of(category);
    }

    private void validateCategoryNameInformed(CategoryRequest request) {
        if (isEmpty(request.getDescription())) {
            throw new ValidationException("The category description was not informed.");
        }
    }
}
