package com.nalhin.fc.basket

import com.nalhin.fc.core.jwt.JwtService
import com.nalhin.fc.test.factories.BasketTestFactory
import com.nalhin.fc.test.factories.UserTestFactory
import com.nalhin.fc.user.User
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
import org.springframework.test.context.ActiveProfiles
import spock.lang.Specification


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class BasketIntegrationTest extends Specification {

  @LocalServerPort
  private int serverPort

  @Autowired
  private BasketRepository basketRepository

  @Autowired
  private UserRepository userRepository

  @Autowired
  private JwtService jwtService

  private RequestSpecification restClient

  private User owner

  def slurper = new JsonSlurper()

  def setup() {
    owner = userRepository.save(UserTestFactory.user())
    restClient = RestAssured.given()
        .basePath("/api")
        .port(serverPort)
        .accept(MediaType.APPLICATION_JSON.toString())
        .contentType(MediaType.APPLICATION_JSON.toString())
        .header(new Header("Authorization", "Bearer " + jwtService.sign(owner.getUsername())))
  }

  def cleanup() {
    basketRepository.deleteAll()
    userRepository.deleteAll()
  }

  def 'GET /me/baskets should return OK (200) status code and basket list'() {
    given:
    def savedBasket = basketRepository.save(BasketTestFactory.basket(owner: owner))
    when:
    def resp = restClient.when().get('/me/baskets')
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.content.get(0).name == savedBasket.name
  }

  def 'GET /me/baskets should return OK (200) status code and empty list'() {
    when:
    def resp = restClient.when().get('/me/baskets')
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.content == []
  }

  def 'POST /me/baskets should return CREATED (201) status code, BasketResponseDto and resource location'() {
    given:
    def body = BasketTestFactory.saveBasketRequestDto()
    when:
    def resp = restClient.when().body(body).post('/me/baskets')
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.CREATED.value()
    and:
    resp.header("location").contains("/baskets/" + (int) respBody.id)
    and:
    respBody.name == body.name
  }

  def 'POST /me/baskets should return BAD_REQUEST (400) status code when body is invalid'() {
    given:
    def body = BasketTestFactory.saveBasketRequestDto(name: "a")
    when:
    def resp = restClient.when().body(body).post('/me/baskets')
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }

  def 'PUT /me/baskets/{basketId} should return NOT_FOUND (404) status code when basket doesnt exist'() {
    given:
    def body = BasketTestFactory.updateBasketRequestDto()
    when:
    def resp = restClient.when().body(body).put('/baskets/' + 1)
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }


  def 'PUT /me/baskets/{basketId} should return UNAUTHORIZED (401) status code when user does not own the basket'() {
    given:
    def saved = basketRepository.save(BasketTestFactory.basket(owner: userRepository.save(UserTestFactory.user())))
    def body = BasketTestFactory.updateBasketRequestDto()
    when:
    def resp = restClient.when().body(body).put('/baskets/' + saved.id)
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'PUT /me/baskets/{basketId} should return OK (200) status code and update basket'() {
    given:
    def saved = basketRepository.save(BasketTestFactory.basket(owner: owner))
    def body = BasketTestFactory.updateBasketRequestDto()
    when:
    def resp = restClient.when().body(body).put('/me/baskets/' + saved.id)
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.name == body.name
  }

  def 'DELETE /me/baskets/{basketId} should return OK (200) status code and delete basket'() {
    given:
    def saved = basketRepository.save(BasketTestFactory.basket(owner: owner))
    when:
    def resp = restClient.when().delete('/me/baskets/' + saved.id)
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    def respBody = slurper.parseText(restClient.when().get('/me/baskets').body().asString())
    and:
    respBody.content == []
  }

  def 'DELETE /me/baskets/{basketId} should return NOT_FOUND (404) status code when basket is missing'() {
    when:
    def resp = restClient.when().delete('/me/baskets/' + 1)
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'DELETE /me/baskets/{basketId} should return FORBIDDEN (403) status code when user does not own the basket'() {
    given:
    def saved = basketRepository.save(BasketTestFactory.basket(owner: userRepository.save(UserTestFactory.user())))
    when:
    def resp = restClient.when().delete('/me/baskets/' + saved.id)
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }
}
