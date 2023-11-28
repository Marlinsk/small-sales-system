package com.eng.project.productbackendapplication.modules.supplier.model;

import com.eng.project.productbackendapplication.modules.supplier.dto.SupplierRequest;
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
@Table(name = "Supplier")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    public static Supplier of(SupplierRequest request) {
        var supplier = new Supplier();
        BeanUtils.copyProperties(request, supplier);
        return supplier;
    }
}
