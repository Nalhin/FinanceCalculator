package com.nalhin.fc.test.config

import com.nalhin.fc.test.clock.TestClock
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Profile

import java.time.Clock

@TestConfiguration
@Profile("test")
class TestClockConfig {

  @Bean
  Clock clock() {
    return TestClock.clock()
  }
}
