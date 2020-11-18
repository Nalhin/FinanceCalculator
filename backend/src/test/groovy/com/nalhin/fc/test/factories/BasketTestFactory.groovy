package com.nalhin.fc.test.factories

import com.github.javafaker.Faker
import com.nalhin.fc.basket.Basket
import com.nalhin.fc.basket.dto.SaveBasketRequestDto
import com.nalhin.fc.test.faker.TestFaker
import com.nalhin.fc.user.User

class BasketTestFactory {

  private static final Faker faker = new TestFaker()

  static Basket basket(
      Map map = Collections.EMPTY_MAP
  ) {
    return new Basket(
        name: map.name ?: faker.name().name(),
        id: (map.id ?: faker.id()) as Long,
        owner: (map.owner ?: UserTestFactory.user()) as User
    )
  }

  static SaveBasketRequestDto saveBasketRequestDto(
      Map map = Collections.EMPTY_MAP
  ) {
    return new SaveBasketRequestDto(
        name: map.name ?: faker.name().name(),
    )
  }
}
