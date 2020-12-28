package com.nalhin.fc.user;

import com.nalhin.fc.user.dto.response.UserResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserResponseDto toResponse(User user);
}
