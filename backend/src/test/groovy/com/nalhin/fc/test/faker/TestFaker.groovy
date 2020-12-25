package com.nalhin.fc.test.faker

import com.github.javafaker.Faker

class TestFaker extends Faker {


  Long id() {
    return number().numberBetween(1, Long.MAX_VALUE)
  }

  double positiveDouble() {
    return Math.abs(random().nextDouble())
  }

  int positiveInt() {
    return random().nextInt(0, Integer.MAX_VALUE - 1)
  }

  def <E extends Enum<E>> E randomEnum(Class<E> clazz) {
    int selected = random().nextInt(clazz.getEnumConstants().length)
    return clazz.getEnumConstants()[selected]
  }
}
