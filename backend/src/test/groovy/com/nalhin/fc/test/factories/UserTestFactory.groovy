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
        email: map.getOrDefault("email", faker.internet().emailAddress()),
        username: map.getOrDefault("username", faker.name().username()),
        password: map.getOrDefault("password", faker.internet().password()),
        id: faker.id()
    )
  }
}
