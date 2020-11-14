package com.nalhin.fc.test.clock

import java.time.Clock
import java.time.Instant
import java.time.ZoneId

class TestClock {

  public static final String TEST_CLOCK_TIME = "2018-08-19T16:45:42.00Z"

  static Clock clock() {
    return Clock.fixed(Instant.parse(TEST_CLOCK_TIME), ZoneId.of("CET"))
  }
}

