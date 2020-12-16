package com.nalhin.fc.core.jwt

import com.nalhin.fc.test.clock.TestClock
import spock.lang.Specification

import java.time.Clock

class JwtServiceTest extends Specification {

  private Clock clock = TestClock.clock()
  private JwtClock jwtClock = new JwtClock(clock)

  def 'isTokenValid() should return false when token has expired'() {
    given:
    def mockClock = Mock(JwtClock)
    mockClock.now() >> new Date(TestClock.clock().millis()) >> new Date(clock.millis() + 2000L)
    and:
    def service = new JwtService("key", 1000L, mockClock)
    def token = service.sign("username")
    when:
    def result = service.isTokenValid(token)
    then:
    !result
  }

  def 'isTokenValid() should return false when token is invalid'() {
    given:
    def service = new JwtService("key", 1000L, jwtClock)
    def token = "fakeToken"
    when:
    def result = service.isTokenValid(token)
    then:
    !result
  }

  def 'isTokenValid() should return true when token is valid'() {
    given:
    def service = new JwtService("key", 1000L, jwtClock)
    def token = service.sign("username")
    when:
    def result = service.isTokenValid(token)
    then:
    result
  }

  def 'resolveUsernameFromToken() should resolve username from token'() {
    given:
    def service = new JwtService("key", 10000L, jwtClock)
    def token = service.sign("username")
    when:
    def result = service.resolveUsernameFromToken(token)
    then:
    result.get() == "username"
  }


  def 'resolveUsernameFromToken() should return an empty optional when token has expired'() {
    given:
    def mockClock = Mock(JwtClock)
    mockClock.now() >> new Date(clock.millis()) >> new Date(clock.millis() + 2000L)
    and:
    def service = new JwtService("key", 1000L, mockClock)
    def token = service.sign("username")
    when:
    def actualResult = service.resolveUsernameFromToken(token)
    then:
    actualResult.isEmpty()
  }


  def 'sign() should generate token with username encoded'() {
    given:
    def service = new JwtService("key", 100000L, jwtClock)
    when:
    def token = service.sign("username")
    then:
    service.resolveUsernameFromToken(token).get() == "username"
    service.isTokenValid(token)
  }

  def 'sign() should encode expiration date'() {
    given:
    def mockClock = Mock(JwtClock)
    mockClock.now() >> new Date(clock.millis()) >> new Date(clock.millis() + 2000L)
    and:
    def service = new JwtService("key", 1000L, mockClock)
    when:
    def token = service.sign("username")
    then:
    service.resolveUsernameFromToken(token).isEmpty()
  }
}
