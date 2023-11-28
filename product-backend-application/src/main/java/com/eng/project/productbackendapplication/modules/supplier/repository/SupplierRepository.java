package com.eng.project.productbackendapplication.modules.supplier.repository;

import com.eng.project.productbackendapplication.modules.supplier.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    List<Supplier> findByNameIgnoreCaseContaining(String name);
}
