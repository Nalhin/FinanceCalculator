package com.nalhin.fc.test.factories

import com.github.javafaker.Faker
import com.nalhin.fc.test.faker.TestFaker
import com.nalhin.fc.user.User

class UserTestFactory {
  private static final Faker faker = new TestFaker()

  static User user(
      Map map = Collections.EMPTY_MAP
  ) {
    return new User(
        email: map.email ?: faker.internet().emailAddress(),
        username: map.username ?: faker.name().username(),
        password: map.password ?: faker.internet().password(),
        id: (map.id ?: faker.id()) as Long
    )
  }
}
