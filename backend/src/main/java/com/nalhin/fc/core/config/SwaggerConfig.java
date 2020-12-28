package com.nalhin.fc.core.config;

import com.nalhin.fc.core.security.AppUser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;

@Configuration
@EnableOpenApi
public class SwaggerConfig {
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.OAS_30)
        .ignoredParameterTypes(AppUser.class)
        .select()
        .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
        .paths(PathSelectors.any())
        .build()
        .useDefaultResponseMessages(false)
        .apiInfo(metadata())
        .securitySchemes(Collections.singletonList(apiKey()));
  }

  private ApiInfo metadata() {
    return new ApiInfoBuilder()
        .title("Finance Calculator")
        .description("Financial Calculator REST API")
        .version("1.0.0")
        .license("MIT License")
        .build();
  }

  private ApiKey apiKey() {
    return new ApiKey("Bearer", "Authorization", "Header");
  }
}
