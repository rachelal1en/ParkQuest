package com.parkrangers.parkquest_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// configuration class to enable and customize cross-origin resource sharing (aka communication between front and back)
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow requests to all endpoints
                .allowedOrigins("http://localhost:5173") // Allow requests from the frontend's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Support all methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Send cookies/session info
    }
}
