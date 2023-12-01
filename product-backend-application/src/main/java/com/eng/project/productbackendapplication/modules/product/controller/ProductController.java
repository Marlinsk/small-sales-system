package com.eng.project.productbackendapplication.modules.product.controller;

import com.eng.project.productbackendapplication.config.exception.SuccessResponse;
import com.eng.project.productbackendapplication.modules.product.dto.ProductCheckStockRequest;
import com.eng.project.productbackendapplication.modules.product.dto.ProductRequest;
import com.eng.project.productbackendapplication.modules.product.dto.ProductResponse;
import com.eng.project.productbackendapplication.modules.product.dto.ProductSalesResponse;
import com.eng.project.productbackendapplication.modules.product.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductResponse> findAll() {
        return productService.findByAll();
    }

    @GetMapping("{id}")
    public ProductResponse findById(@PathVariable(name = "id") Integer id) {
        return productService.findByIdResponse(id);
    }

    @GetMapping("name/{name}")
    public List<ProductResponse> findByName(@PathVariable(name = "name") String name) {
        return productService.findByName(name);
    }

    @GetMapping("category/{categoryId}")
    public List<ProductResponse> findByCategoryId(@PathVariable(name = "categoryId") Integer categoryId) {
        return productService.findByCategoryId(categoryId);
    }

    @GetMapping("supplier/{supplierId}")
    public List<ProductResponse> findBySupplierId(@PathVariable(name = "supplierId") Integer supplierId) {
        return productService.findBySupplierId(supplierId);
    }

    @PostMapping
    public ProductResponse save(@RequestBody ProductRequest request) {
        return productService.save(request);
    }

    @PutMapping("{id}")
    public ProductResponse update(@RequestBody ProductRequest request, @PathVariable(name = "id") Integer id) {
        return productService.update(request, id);
    }

    @DeleteMapping("{id}")
    public SuccessResponse delete(@PathVariable(name = "id") Integer id) {
        return productService.delete(id);
    }

    @PostMapping("check-stock")
    public SuccessResponse checkProductStock(@RequestBody ProductCheckStockRequest request) {
        return productService.checkProductStock(request);
    }

    @GetMapping("{id}/sales")
    public ProductSalesResponse findProductSales(@PathVariable(name = "id")  Integer id) {
        return productService.findProductSales(id);
    }
}
