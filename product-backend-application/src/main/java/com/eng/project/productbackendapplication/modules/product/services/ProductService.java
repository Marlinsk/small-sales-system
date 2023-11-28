package com.eng.project.productbackendapplication.modules.product.services;

import com.eng.project.productbackendapplication.config.exception.SuccessResponse;
import com.eng.project.productbackendapplication.config.exception.ValidationException;
import com.eng.project.productbackendapplication.modules.category.services.CategoryService;
import com.eng.project.productbackendapplication.modules.product.dto.ProductRequest;
import com.eng.project.productbackendapplication.modules.product.dto.ProductResponse;
import com.eng.project.productbackendapplication.modules.product.model.Product;
import com.eng.project.productbackendapplication.modules.product.repository.ProductRepository;
import com.eng.project.productbackendapplication.modules.supplier.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class ProductService {

    private static final Integer ZERO = 0;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private CategoryService categoryService;

    public List<ProductResponse> findByAll() {
        return productRepository
                .findAll()
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findByName(String name) {
        if (isEmpty(name)) {
            throw new ValidationException("The product name must be informed.");
        }
        return productRepository
                .findByNameIgnoreCaseContaining(name)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findByCategoryId(Integer categoryId) {
        if (isEmpty(categoryId)) {
            throw new ValidationException("The product's category ID must be informed.");
        }
        return productRepository
                .findByCategoryId(categoryId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findBySupplierId(Integer supplierId) {
        if (isEmpty(supplierId)) {
            throw new ValidationException("The product's supplier ID must be informed.");
        }
        return productRepository
                .findBySupplierId(supplierId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public ProductResponse findByIdResponse(Integer id) {
        return ProductResponse.of(findById(id));
    }

    public Product findById(Integer id) {
        validateInformedId(id);
        return productRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("There's no product for the given ID."));
    }

    public ProductResponse save(ProductRequest request) {
        validateProductDataInformed(request);
        validateCategoryAndSupplierIdInformed(request);
        var category = categoryService.findById(request.getCategoryId());
        var supplier = supplierService.findById(request.getSupplierId());
        var product = productRepository.save(Product.of(request, category, supplier));
        return ProductResponse.of(product);
    }

    public ProductResponse update(ProductRequest request, Integer id) {
        validateProductDataInformed(request);
        validateCategoryAndSupplierIdInformed(request);
        var category = categoryService.findById(request.getCategoryId());
        var supplier = supplierService.findById(request.getSupplierId());
        var product = Product.of(request, category, supplier);
        product.setId(id);
        productRepository.save(product);
        return ProductResponse.of(product);
    }

    public SuccessResponse delete(Integer id) {
        validateInformedId(id);
        productRepository.deleteById(id);
        return SuccessResponse.create("The product was deleted.");
    }

    private void validateProductDataInformed(ProductRequest request) {
        if (isEmpty(request.getName())) {
            throw new ValidationException("The product's name was not informed.");
        }
        if (isEmpty(request.getQuantityAvailable())) {
            throw new ValidationException("The product's quantity was not informed.");
        }
        if (request.getQuantityAvailable() <= ZERO) {
            throw new ValidationException("The quantity should not be less or equal to zero.");
        }
    }

    private void validateCategoryAndSupplierIdInformed(ProductRequest request) {
        if (isEmpty(request.getCategoryId())) {
            throw new ValidationException("The category ID name was not informed.");
        }
        if (isEmpty(request.getSupplierId())) {
            throw new ValidationException("The supplier ID name was not informed.");
        }
    }

    private void validateInformedId(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("The product ID must be informed.");
        }
    }

    public Boolean existsByCategoryId(Integer categoryId) {
        return productRepository.existsByCategoryId(categoryId);
    }

    public Boolean existsBySupplierId(Integer supplierId) {
        return productRepository.existsBySupplierId(supplierId);
    }
}
