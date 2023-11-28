package com.eng.project.productbackendapplication.modules.supplier.dto;

import com.eng.project.productbackendapplication.modules.supplier.model.Supplier;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Data
public class SupplierResponse {

    private Integer id;
    private String name;

    public static SupplierResponse of(Supplier supplier) {
        var response = new SupplierResponse();
        BeanUtils.copyProperties(supplier, response);
        return response;
    }
}
