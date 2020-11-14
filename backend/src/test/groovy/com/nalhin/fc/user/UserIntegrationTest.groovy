package com.nalhin.fc.user

import com.nalhin.fc.jwt.JwtService
import com.nalhin.fc.test.factories.UserTestFactory
import groovy.json.JsonSlurper
import io.restassured.RestAssured
import io.restassured.http.Header
import io.restassured.specification.RequestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import spock.lang.Specification


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UserIntegrationTest extends Specification {

  @LocalServerPort
  private int serverPort

  @Autowired
  private UserRepository userRepository

  @Autowired
  private JwtService jwtService

  private RequestSpecification restClient

  private jsonSlurper = new JsonSlurper()

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

  def 'GET /me should return OK (200) status code and user when user is authenticated'() {
    given:
    def user = userRepository.save(UserTestFactory.user())
    when:
    def resp = restClient.given()
        .header(new Header("Authorization", "Bearer " + jwtService.sign(user.getUsername())))
        .when().get("/me")
    def respBody = jsonSlurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    respBody.username == user.username
    respBody.email == user.email
  }


  def 'GET /me should return FORBIDDEN (403) status code when user is not authenticated'() {
    when:
    def resp = restClient.given()
        .header(new Header("Authorization", "Bearer " + jwtService.sign("fakeUsername")))
        .when().get("/me")
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }
}
