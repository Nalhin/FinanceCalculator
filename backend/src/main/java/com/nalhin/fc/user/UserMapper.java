package com.nalhin.fc.user;

import com.nalhin.fc.user.dto.UserResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserResponseDto userToUserResponseDto(User user);
}
