package com.eng.project.productbackendapplication.config.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuccessResponse {

    private int status;
    private String message;

    public static SuccessResponse create(String message) {
        return SuccessResponse
                .builder()
                .status(HttpStatus.OK.value())
                .message(message)
                .build();
    }
}
