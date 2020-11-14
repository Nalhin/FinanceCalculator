package com.nalhin.fc.security

import com.nalhin.fc.test.factories.UserTestFactory
import com.nalhin.fc.user.UserService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import spock.lang.Specification
import spock.lang.Subject


class CustomUserDetailsServiceTest extends Specification {

  private UserService mockUserService

  @Subject
  private CustomUserDetailsService service

  def setup() {
    mockUserService = Mock(UserService)
    service = new CustomUserDetailsService(mockUserService)
  }

  def "loadUserByUsername() should throw UsernameNotFound exception when user is not found"() {
    given:
    mockUserService.findOneByUsername("username") >> Optional.empty()
    when:
    service.loadUserByUsername("username")
    then:
    thrown UsernameNotFoundException
  }

  def "loadUserByUsername() should return AppUser"() {
    given:
    def expectedUser = UserTestFactory.user()
    mockUserService.findOneByUsername(expectedUser.username) >> Optional.of(expectedUser)
    when:
    def appUser = service.loadUserByUsername(expectedUser.username)
    then:
    appUser.username == expectedUser.username
    appUser.user == expectedUser
    appUser.password == expectedUser.password
  }
}
