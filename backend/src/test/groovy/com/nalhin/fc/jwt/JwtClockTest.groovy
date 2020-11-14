package com.nalhin.fc.jwt

import com.nalhin.fc.test.clock.TestClock
import spock.lang.Specification

class JwtClockTest extends Specification {

  def 'now() should return current date'() {
    given:
    def testClock = TestClock.clock()
    def clock = new JwtClock(testClock)
    when:
    def actualResult = clock.now()
    then:
    actualResult.toInstant() == testClock.instant()
  }
}
