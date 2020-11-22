package com.nalhin.fc.security

import com.nalhin.fc.jwt.JwtClock
import com.nalhin.fc.jwt.JwtService
import com.nalhin.fc.test.clock.TestClock
import com.nalhin.fc.test.factories.SecurityTestFactory
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import spock.lang.Specification
import spock.lang.Subject

import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JwtAuthFilterTest extends Specification {

  private HttpServletRequest request
  private SecurityContextFacade securityContextFacade
  private UserDetailsService userDetailsService
  private JwtService jwtService
  private AppUser appUser
  private String validToken

  @Subject
  private JwtAuthFilter jwtAuthFilter

  def setup() {
    request = Mock()
    userDetailsService = Mock()
    jwtService = new JwtService("jwt", 1000L, new JwtClock(TestClock.clock()))
    appUser = SecurityTestFactory.appUser()
    validToken = jwtService.sign(appUser.getUsername())
    securityContextFacade = new SecurityContextFacadeInMemory()
    jwtAuthFilter = new JwtAuthFilter(jwtService, new BearerHeaderTokenResolver(), userDetailsService, securityContextFacade)
  }

  def 'doFilterInternal() should set authentication when token is valid and user is found'() {
    given:
    request.getHeader("Authorization") >> "Bearer " + validToken
    userDetailsService.loadUserByUsername(appUser.getUsername()) >> appUser
    when:
    jwtAuthFilter.doFilterInternal(request, Mock(HttpServletResponse.class), Mock(FilterChain.class))
    then:
    securityContextFacade.getAppUser().get() == appUser
  }

  def 'doFilterInternal() should not set authentication when header is invalid'() {
    given:
    request.getHeader("Authorization") >> "invalid"
    when:
    jwtAuthFilter.doFilterInternal(request, Mock(HttpServletResponse.class), Mock(FilterChain.class))
    then:
    securityContextFacade.getAppUser().isEmpty()
    0 * userDetailsService.loadUserByUsername()
  }

  def 'doFilterInternal() should not set authentication when header is missing'() {
    given:
    request.getHeader("Authorization") >> null
    when:
    jwtAuthFilter.doFilterInternal(request, Mock(HttpServletResponse.class), Mock(FilterChain.class))
    then:
    securityContextFacade.getAppUser().isEmpty()
    0 * userDetailsService.loadUserByUsername()
  }

  def 'doFilterInternal() should not set authentication when user is not found'() {
    given:
    request.getHeader("Authorization") >> "Bearer " + validToken
    userDetailsService.loadUserByUsername() >> { throw new UsernameNotFoundException() }
    when:
    jwtAuthFilter.doFilterInternal(request, Mock(HttpServletResponse.class), Mock(FilterChain.class))
    then:
    securityContextFacade.getAppUser().isEmpty()
  }
}
