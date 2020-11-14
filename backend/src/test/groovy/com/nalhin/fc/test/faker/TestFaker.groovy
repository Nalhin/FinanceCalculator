package com.nalhin.fc.test.faker

import com.github.javafaker.Faker

class TestFaker extends Faker {


  Long id() {
    return number().numberBetween(1, Long.MAX_VALUE)
  }

  double positiveDouble() {
    return Math.abs(random().nextDouble())

  }
}
