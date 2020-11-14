package com.nalhin.fc.security

import spock.lang.Specification
import spock.lang.Subject


class BearerHeaderTokenResolverTest extends Specification {

  @Subject
  def bearerHeaderTokenResolver = new BearerHeaderTokenResolver()

  def 'resolveTokenFromHeader() should return an empty optional when header does not contains "Bearer " phrase'() {
    given:
    def providedHeader = "header"
    when:
    def actualResult = bearerHeaderTokenResolver.resolveTokenFromHeader(providedHeader)
    then:
    actualResult.isEmpty()
  }

  def 'resolveTokenFromHeader() should return an empty optional when header does not start with "Bearer "'() {
    given:
    def providedHeader = "header Bearer "
    when:
    def actualResult = bearerHeaderTokenResolver.resolveTokenFromHeader(providedHeader)
    then:
    actualResult.isEmpty()
  }

  def 'resolveTokenFromHeader() should return token when header starts with "Bearer "'() {
    given:
    def providedHeader = "Bearer token"
    when:
    def actualResult = bearerHeaderTokenResolver.resolveTokenFromHeader(providedHeader)
    then:
    actualResult.get() == "token"
  }
}
