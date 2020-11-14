package com.nalhin.fc.auth;

import com.nalhin.fc.auth.dto.AuthResponseDto;
import com.nalhin.fc.auth.dto.SignUpUserRequestDto;
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
  AuthResponseDto authPairToResponse(Pair<User, String> authPair);

  @Mapping(target = "id", ignore = true)
  User signUpUserRequestToDomain(SignUpUserRequestDto signUpUserRequestDto);
}
