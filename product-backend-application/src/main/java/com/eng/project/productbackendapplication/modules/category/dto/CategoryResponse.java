package com.eng.project.productbackendapplication.modules.product.dto;

import com.eng.project.productbackendapplication.modules.product.model.Category;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Data
public class CategoryResponse {

    private Integer id;
    private String description;

    private Date createdAt;

    private Date updatedAt;

    public static CategoryResponse of(Category category) {
        var response = new CategoryResponse();
        BeanUtils.copyProperties(category, response);
        return response;
    }
}
