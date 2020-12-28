package com.nalhin.fc.core.config

import com.nalhin.fc.core.security.SecurityContextFacadeInMemory
import com.nalhin.fc.test.clock.TestClock
import spock.lang.Specification
import spock.lang.Subject

import static com.nalhin.fc.test.factories.SecurityTestFactory.authentication
import static com.nalhin.fc.test.factories.UserTestFactory.user

class JpaAuditingConfigTest extends Specification {
  def clock = TestClock.clock()
  def securityContextFacade = new SecurityContextFacadeInMemory()

  @Subject
  def jpaAuditing = new JpaAuditingConfig(securityContextFacade, clock)

  def setup() {
    securityContextFacade.clearAuthentication()
  }

  def 'getCurrentAuditor() should return user authenticated in security context'() {
    given:
    def expectedUser = user()
    securityContextFacade.setAuthentication(authentication(expectedUser))
    when:
    def actualUser = jpaAuditing.getCurrentAuditor()
    then:
    actualUser.get() == expectedUser
  }

  def 'getCurrentAuditor() return an empty optional when user is not authenticated'() {
    when:
    def actualUser = jpaAuditing.getCurrentAuditor()
    then:
    actualUser.isEmpty()
  }

  def 'now() should return current date'() {
    when:
    def actualTime = jpaAuditing.dateTimeProvider().getNow()
    then:
    actualTime.get() == clock.instant()
  }
}
