package com.nalhin.fc.basket

import com.nalhin.fc.test.annotations.IntegrationTest
import com.nalhin.fc.test.clock.TestClock
import com.nalhin.fc.test.specification.IntegrationSpecification
import com.nalhin.fc.user.User
import com.nalhin.fc.user.UserRepository
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus

import static com.nalhin.fc.test.factories.BasketTestFactory.basket
import static com.nalhin.fc.test.factories.BasketTestFactory.saveBasketRequestDto
import static com.nalhin.fc.test.factories.BasketTestFactory.updateBasketRequestDto
import static com.nalhin.fc.test.factories.UserTestFactory.user

@IntegrationTest
class BasketIntegrationTest extends IntegrationSpecification {

  @Autowired
  private BasketRepository basketRepository
  @Autowired
  private UserRepository userRepository

  private User owner
  private JsonSlurper slurper = new JsonSlurper()

  def setup() {
    owner = userRepository.save(user())
  }

  def cleanup() {
    basketRepository.deleteAll()
    userRepository.deleteAll()
  }

  def 'GET /me/baskets should return OK (200) status code and basket list'() {
    given:
    def savedBasket = basketRepository.save(basket(owner: owner))
    when:
    def resp = authenticatedClient(owner).when().get('/me/baskets')
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.content.get(0).name == savedBasket.name
  }

  def 'GET /me/baskets should return OK (200) status code and empty list'() {
    when:
    def resp = authenticatedClient(owner).when().get('/me/baskets')
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.content == []
  }

  def 'POST /me/baskets should return CREATED (201) status code, BasketResponseDto and resource location'() {
    given:
    def body = saveBasketRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(body).post('/me/baskets')
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.CREATED.value()
    and:
    resp.header("location").contains("/baskets/${respBody.id}")
    and:
    respBody.name == body.name
    respBody.createdDate == TestClock.TEST_CLOCK_TIME
  }

  def 'POST /me/baskets should return BAD_REQUEST (400) status code when body is invalid'() {
    given:
    def body = saveBasketRequestDto(name: "a")
    when:
    def resp = authenticatedClient(owner).when().body(body).post('/me/baskets')
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }

  def 'PUT /me/baskets/{basketId} should return NOT_FOUND (404) status code when basket doesnt exist'() {
    given:
    def body = updateBasketRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(body).put("/baskets/${1}")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }


  def 'PUT /me/baskets/{basketId} should return FORBIDDEN (403) status code when user does not own the basket'() {
    given:
    def saved = basketRepository.save(basket(owner: userRepository.save(user())))
    def body = updateBasketRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(body).put("/me/baskets/${saved.id}")
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }

  def 'PUT /me/baskets/{basketId} should return OK (200) status code and update basket'() {
    given:
    def saved = basketRepository.save(basket(owner: owner))
    def body = updateBasketRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(body).put("/me/baskets/${saved.id}")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.name == body.name
  }

  def 'DELETE /me/baskets/{basketId} should return OK (200) status code and delete basket'() {
    given:
    def saved = basketRepository.save(basket(owner: owner))
    when:
    def resp = authenticatedClient(owner).when().delete("/me/baskets/${saved.id}")
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    def respBody = slurper.parseText(authenticatedClient(owner).when().get('/me/baskets').body().asString())
    and:
    respBody.content == []
  }

  def 'DELETE /me/baskets/{basketId} should return NOT_FOUND (404) status code when basket is missing'() {
    when:
    def resp = authenticatedClient(owner).when().delete("/me/baskets/${1}")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'DELETE /me/baskets/{basketId} should return FORBIDDEN (403) status code when user does not own the basket'() {
    given:
    def saved = basketRepository.save(basket(owner: userRepository.save(user())))
    when:
    def resp = authenticatedClient(owner).when().delete("/me/baskets/${saved.id}")
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }
}
