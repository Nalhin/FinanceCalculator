package com.nalhin.fc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.security.Principal;
import java.util.Collections;

@Configuration
@EnableOpenApi
public class SwaggerConfig {
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.OAS_30)
        .ignoredParameterTypes(Principal.class)
        .select()
        .paths(PathSelectors.any())
        .build()
        .apiInfo(metadata())
        .apiInfo(metadata())
        .securitySchemes(Collections.singletonList(apiKey()));
  }

  private ApiInfo metadata() {
    return new ApiInfoBuilder()
        .title("Financial Calculator")
        .description("Financial Calculator REST API")
        .version("1.0.0")
        .license("MIT License")
        .build();
  }

  private ApiKey apiKey() {
    return new ApiKey("Bearer", "Authorization", "Header");
  }
}
