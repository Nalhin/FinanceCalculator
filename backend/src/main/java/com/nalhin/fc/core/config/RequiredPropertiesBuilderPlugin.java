package com.nalhin.fc.core.config;

import com.fasterxml.classmate.ResolvedType;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.annotation.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import springfox.bean.validators.plugins.Validators;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.schema.ModelPropertyBuilderPlugin;
import springfox.documentation.spi.schema.contexts.ModelPropertyContext;

import java.util.List;

@Component
@Order(Validators.BEAN_VALIDATOR_PLUGIN_ORDER)
public class RequiredPropertiesBuilderPlugin implements ModelPropertyBuilderPlugin {

  private final List<Class<?>> markAsRequired = List.of(Page.class, Pageable.class, Sort.class);

  public boolean supports(@NotNull final DocumentationType delimiter) {
    return true;
  }

  @Override
  public void apply(ModelPropertyContext context) {
    ResolvedType type = context.getOwner().getType();
    if (markAsRequired.stream().anyMatch(type::isInstanceOf)) {
      context.getSpecificationBuilder().required(true);
    }
  }
}
