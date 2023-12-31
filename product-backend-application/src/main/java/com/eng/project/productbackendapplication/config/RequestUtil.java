package com.eng.project.productbackendapplication.config;

import com.eng.project.productbackendapplication.config.exception.ValidationException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class RequestUtil {

    public static HttpServletRequest getCurrentRequest() {
        try {
            return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        }  catch (Exception exception) {
            exception.printStackTrace();
            throw new ValidationException("The current request could not be processed.");
        }
    }
}
