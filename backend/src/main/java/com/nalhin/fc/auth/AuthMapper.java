package com.nalhin.fc.auth;

import com.nalhin.fc.auth.dto.response.AuthResponseDto;
import com.nalhin.fc.auth.dto.request.SignUpUserRequestDto;
import com.nalhin.fc.user.User;
import com.nalhin.fc.user.UserMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.util.Pair;

@Mapper(
    componentModel = "spring",
    uses = UserMapper.class,
    injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AuthMapper {

  @Mapping(source = "first", target = "user")
  @Mapping(source = "second", target = "token")
  AuthResponseDto toResponse(Pair<User, String> authPair);

  @Mapping(target = "id", ignore = true)
  User toEntity(SignUpUserRequestDto signUpUserRequestDto);
}
