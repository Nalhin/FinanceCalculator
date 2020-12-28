package com.nalhin.fc.auth

import com.nalhin.fc.auth.dto.request.LoginUserRequestDto
import com.nalhin.fc.auth.dto.request.SignUpUserRequestDto
import com.nalhin.fc.core.jwt.JwtService
import com.nalhin.fc.test.annotations.IntegrationTest
import com.nalhin.fc.test.factories.AuthTestFactory
import com.nalhin.fc.test.factories.UserTestFactory
import com.nalhin.fc.user.UserRepository
import groovy.json.JsonSlurper
import io.restassured.RestAssured
import io.restassured.http.Header
import io.restassured.specification.RequestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import spock.lang.Specification


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@IntegrationTest
class AuthIntegrationTest extends Specification {

  @LocalServerPort
  private int serverPort
  @Autowired
  private UserRepository userRepository
  @Autowired
  private JwtService jwtService

  private RequestSpecification restClient

  private JsonSlurper slurper = new JsonSlurper()

  def setup() {
    restClient = RestAssured.given()
        .basePath("/api")
        .port(serverPort)
        .accept(MediaType.APPLICATION_JSON.toString())
        .contentType(MediaType.APPLICATION_JSON.toString())
  }

  def cleanup() {
    userRepository.deleteAll()
  }

  def 'POST /auth/sign-up should return BAD_REQUEST (400) status code and user when request body is invalid'() {
    given:
    def requestBody = new SignUpUserRequestDto()
    when:
    def resp = restClient.body(requestBody).when().post("/auth/sign-up")
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }


  def 'POST /auth/sign-up should return CONFLICT (409) status code when credentials are already taken'() {
    given:
    def taken = userRepository.save(UserTestFactory.user())
    def requestBody = AuthTestFactory.signUpUserDto(username: taken.username, email: taken.email)
    when:
    def resp = restClient.given().body(requestBody).when().post("/auth/sign-up")
    then:
    resp.statusCode() == HttpStatus.CONFLICT.value()
  }


  def 'POST /auth/sign-up should return OK (200) status code and auth token with user credentials'() {
    given:
    def requestBody = AuthTestFactory.signUpUserDto()
    when:
    def resp = restClient.body(requestBody).when().post("/auth/sign-up")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    def meResp = restClient.given()
        .header(new Header("Authorization", "Bearer " + (String) respBody.token))
        .when().get("/me")
    def meRespBody = slurper.parseText(meResp.body().asString())
    meRespBody.username == respBody.user.username
  }

  def 'POST /auth/login should return BAD_REQUEST (400) status code and user when request body is invalid'() {
    given:
    def requestBody = new LoginUserRequestDto()
    when:
    def resp = restClient.body(requestBody).when().post("/auth/login")
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }


  def 'POST /auth/login should return FORBIDDEN (403) status code when credentials are invalid'() {
    given:
    def signUpBody = AuthTestFactory.signUpUserDto()
    restClient.body(signUpBody).when().post("/auth/sign-up")
    def requestBody = new LoginUserRequestDto(username: signUpBody.username, password: "invalid")
    when:
    def resp = restClient.given().body(requestBody).when().post("/auth/login")
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }


  def 'POST /auth/login should return OK (200) status code and auth token with user credentials'() {
    given:
    def signUpBody = AuthTestFactory.signUpUserDto()
    restClient.body(signUpBody).when().post("/auth/sign-up")
    and:
    def requestBody = new LoginUserRequestDto(username: signUpBody.username, password: signUpBody.password)
    when:
    def resp = restClient.given().body(requestBody).when().post("/auth/login")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    def meRespBody = slurper.parseText(restClient.given()
        .header(new Header("Authorization", "Bearer " + (String) respBody.token))
        .get("/me").body().asString())
    meRespBody.username == respBody.user.username
  }
}

