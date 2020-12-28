package com.nalhin.fc.auth

import com.nalhin.fc.auth.dto.request.LoginUserRequestDto
import com.nalhin.fc.auth.dto.request.SignUpUserRequestDto
import com.nalhin.fc.test.annotations.IntegrationTest
import com.nalhin.fc.test.factories.UserTestFactory
import com.nalhin.fc.test.specification.IntegrationSpecification
import com.nalhin.fc.user.UserRepository
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus

import static com.nalhin.fc.test.factories.AuthTestFactory.signUpUserDto

@IntegrationTest
class AuthIntegrationTest extends IntegrationSpecification {

  @Autowired
  private UserRepository userRepository

  private JsonSlurper slurper = new JsonSlurper()

  def cleanup() {
    userRepository.deleteAll()
  }

  def 'POST /auth/sign-up should return BAD_REQUEST (400) status code and user when request body is invalid'() {
    given:
    def requestBody = new SignUpUserRequestDto()
    when:
    def resp = baseClient().body(requestBody).when().post("/auth/sign-up")
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }


  def 'POST /auth/sign-up should return CONFLICT (409) status code when credentials are already taken'() {
    given:
    def taken = userRepository.save(UserTestFactory.user())
    def requestBody = signUpUserDto(username: taken.username, email: taken.email)
    when:
    def resp = baseClient().given().body(requestBody).when().post("/auth/sign-up")
    then:
    resp.statusCode() == HttpStatus.CONFLICT.value()
  }


  def 'POST /auth/sign-up should return OK (200) status code and auth token with user credentials'() {
    given:
    def requestBody = signUpUserDto()
    when:
    def resp = baseClient().body(requestBody).when().post("/auth/sign-up")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    def meResp = authenticatedClient(respBody.token as String).when().get("/me")
    def meRespBody = slurper.parseText(meResp.body().asString())
    meRespBody.username == respBody.user.username
  }

  def 'POST /auth/login should return BAD_REQUEST (400) status code and user when request body is invalid'() {
    given:
    def requestBody = new LoginUserRequestDto()
    when:
    def resp = baseClient().body(requestBody).when().post("/auth/login")
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }


  def 'POST /auth/login should return FORBIDDEN (403) status code when credentials are invalid'() {
    given:
    def signUpBody = signUpUserDto()
    baseClient().body(signUpBody).when().post("/auth/sign-up")
    def requestBody = new LoginUserRequestDto(username: signUpBody.username, password: "invalid")
    when:
    def resp = baseClient().given().body(requestBody).when().post("/auth/login")
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }


  def 'POST /auth/login should return OK (200) status code and auth token with user credentials'() {
    given:
    def signUpBody = signUpUserDto()
    baseClient().body(signUpBody).when().post("/auth/sign-up")
    and:
    def requestBody = new LoginUserRequestDto(username: signUpBody.username, password: signUpBody.password)
    when:
    def resp = baseClient().given().body(requestBody).when().post("/auth/login")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    def meRespBody = slurper.parseText(authenticatedClient(respBody.token as String)
        .get("/me").body().asString())
    meRespBody.username == respBody.user.username
  }
}

