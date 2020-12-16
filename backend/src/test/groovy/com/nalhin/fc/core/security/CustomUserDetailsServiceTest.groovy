package com.nalhin.fc.core.security

import com.nalhin.fc.test.factories.UserTestFactory
import com.nalhin.fc.user.UserRepository
import org.springframework.security.core.userdetails.UsernameNotFoundException
import spock.lang.Specification
import spock.lang.Subject


class CustomUserDetailsServiceTest extends Specification {

  private UserRepository mockUserRepository

  @Subject
  private CustomUserDetailsService service

  def setup() {
    mockUserRepository = Mock(UserRepository)
    service = new CustomUserDetailsService(mockUserRepository)
  }

  def "loadUserByUsername() should throw UsernameNotFound exception when user is not found"() {
    given:
    mockUserRepository.findOneByUsername("username") >> Optional.empty()
    when:
    service.loadUserByUsername("username")
    then:
    thrown UsernameNotFoundException
  }

  def "loadUserByUsername() should return AppUser"() {
    given:
    def expectedUser = UserTestFactory.user()
    mockUserRepository.findOneByUsername(expectedUser.username) >> Optional.of(expectedUser)
    when:
    def appUser = service.loadUserByUsername(expectedUser.username)
    then:
    appUser.username == expectedUser.username
    appUser.user == expectedUser
    appUser.password == expectedUser.password
  }
}
