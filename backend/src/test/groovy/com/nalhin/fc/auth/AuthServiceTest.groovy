package com.nalhin.fc.auth

import com.nalhin.fc.auth.exception.UsernameOrEmailTakenException
import com.nalhin.fc.core.jwt.JwtService
import com.nalhin.fc.user.UserRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.crypto.password.PasswordEncoder
import spock.lang.Specification
import spock.lang.Subject

import static com.nalhin.fc.test.factories.UserTestFactory.user

class AuthServiceTest extends Specification {

  def repository = Mock(UserRepository)
  def jwtService = Mock(JwtService)
  def authManager = Mock(AuthenticationManager)
  def encoder = Mock(PasswordEncoder)

  @Subject
  def service = new AuthService(jwtService, authManager, encoder, repository)

  def "signUp() should throw UsernameOrEmailTakenException when username or email is taken"() {
    given:
    def user = user()
    repository.existsByEmailOrUsername(user.email, user.username) >> true
    when:
    service.signUp(user)
    then:
    thrown UsernameOrEmailTakenException
  }
}
