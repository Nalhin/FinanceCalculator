package com.nalhin.fc.test.factories

import com.nalhin.fc.auth.dto.request.LoginUserRequestDto
import com.nalhin.fc.auth.dto.request.SignUpUserRequestDto
import com.nalhin.fc.test.faker.TestFaker
import com.nalhin.fc.user.User
import org.springframework.data.util.Pair


class AuthTestFactory {

  private static final TestFaker faker = new TestFaker()

  static LoginUserRequestDto loginUserDto(Map map = Collections.EMPTY_MAP) {
    return new LoginUserRequestDto(
        username: map.username ?: faker.name().username(),
        password: map.password ?: faker.internet().password())
  }

  static Pair<User, String> authPair(Map map = Collections.EMPTY_MAP) {
    User user = (User) map.user ?: UserTestFactory.user()
    return Pair.of(user, faker.lorem().word())
  }

  static SignUpUserRequestDto signUpUserDto(
      Map map = Collections.EMPTY_MAP
  ) {
    return new SignUpUserRequestDto(
        username: map.username ?: faker.name().username(),
        password: map.password ?: faker.internet().password(),
        email: map.emai ?: faker.internet().emailAddress())
  }
}
