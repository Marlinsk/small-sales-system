package com.eng.project.productbackendapplication.modules.supplier.controller;

import com.eng.project.productbackendapplication.config.exception.SuccessResponse;
import com.eng.project.productbackendapplication.modules.supplier.dto.SupplierRequest;
import com.eng.project.productbackendapplication.modules.supplier.dto.SupplierResponse;
import com.eng.project.productbackendapplication.modules.supplier.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<SupplierResponse> findAll() {
        return supplierService.findByAll();
    }

    @GetMapping("{id}")
    public SupplierResponse findById(@PathVariable(name = "id") Integer id) {
        return supplierService.findByIdResponse(id);
    }

    @GetMapping("/name/{name}")
    public List<SupplierResponse> findByName(@PathVariable(name = "name") String name) {
        return supplierService.findByName(name);
    }

    @PostMapping
    public SupplierResponse save(@RequestBody SupplierRequest request) {
        return supplierService.save(request);
    }

    @PutMapping("{id}")
    public SupplierResponse update(@RequestBody SupplierRequest request, @PathVariable(name = "id") Integer id) {
        return supplierService.update(request, id);
    }

    @DeleteMapping("{id}")
    public SuccessResponse delete(@PathVariable(name = "id") Integer id) {
        return supplierService.delete(id);
    }
}
