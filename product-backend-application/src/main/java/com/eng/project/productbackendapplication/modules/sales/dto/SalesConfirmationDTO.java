package com.eng.project.productbackendapplication.modules.sales.dto;

import com.eng.project.productbackendapplication.modules.sales.enums.SalesStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesConfirmationDTO {

    private String salesId;
    private SalesStatus status;
}
