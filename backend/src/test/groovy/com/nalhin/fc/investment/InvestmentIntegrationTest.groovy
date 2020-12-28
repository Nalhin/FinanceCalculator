package com.nalhin.fc.investment

import com.nalhin.fc.basket.BasketRepository
import com.nalhin.fc.investment.dto.request.UpdateInvestmentRequestDto
import com.nalhin.fc.test.annotations.IntegrationTest
import com.nalhin.fc.test.clock.TestClock
import com.nalhin.fc.test.specification.IntegrationSpecification
import com.nalhin.fc.user.User
import com.nalhin.fc.user.UserRepository
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus

import static com.nalhin.fc.test.factories.BasketTestFactory.basket
import static com.nalhin.fc.test.factories.InvestmentTestFactory.investment
import static com.nalhin.fc.test.factories.InvestmentTestFactory.saveInvestmentRequestDto
import static com.nalhin.fc.test.factories.InvestmentTestFactory.updateInvestmentRequestDto
import static com.nalhin.fc.test.factories.UserTestFactory.user


@IntegrationTest
class InvestmentIntegrationTest extends IntegrationSpecification {

  @Autowired
  private BasketRepository basketRepository
  @Autowired
  private InvestmentRepository investmentRepository
  @Autowired
  private UserRepository userRepository

  private User owner

  private JsonSlurper slurper = new JsonSlurper()

  def setup() {
    owner = userRepository.save(user())
  }

  def cleanup() {
    investmentRepository.deleteAll()
    basketRepository.deleteAll()
    userRepository.deleteAll()
  }

  def 'GET /me/baskets/{basketId}/investments should return OK (200) status code and investments belonging to that basket'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def savedInvestment = investmentRepository.save(investment(basket: basket, owner: owner))
    when:
    def resp = authenticatedClient(owner).when().get("/me/baskets/${basket.id}/investments")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.get(0).yearsOfGrowth == savedInvestment.yearsOfGrowth
  }

  def 'GET /me/baskets/{basketId}/investments/{investmentId} should return OK (200) status code and investment details'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def savedInvestment = investmentRepository.save(investment(basket: basket, owner: owner))
    when:
    def resp = authenticatedClient(owner).when().get("/me/baskets/${basket.id}/investments/${savedInvestment.id}")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.yearsOfGrowth == savedInvestment.yearsOfGrowth
    respBody.createdDate == TestClock.TEST_CLOCK_TIME
  }

  def 'GET /me/baskets/{basketId}/investments/{investmentId} should return NOT_FOUND (404) status code when basket is missing'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def savedInvestment = investmentRepository.save(investment(basket: basket, owner: owner))
    when:
    def resp = authenticatedClient(owner).when().get("/me/baskets/${basket.id + 1}/investments/${savedInvestment.id}")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'GET /me/baskets/{basketId}/investments/{investmentId} should return NOT_FOUND (404) status code when investment is missing'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    when:
    def resp = authenticatedClient(owner).when().get("/me/baskets/${basket.id}/investments/1")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'POST /me/baskets/{basketId}/investments should return CREATED (201) status code and investment details'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def requestBody = saveInvestmentRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(requestBody).post("/me/baskets/${basket.id}/investments/")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.CREATED.value()
    and:
    resp.header("location").contains("/me/baskets/${basket.id}/investments/${respBody.id}")
    and:
    respBody.annualInterestRate == requestBody.annualInterestRate
    respBody.payment == requestBody.payment
    respBody.startAmount == requestBody.startAmount
    respBody.yearsOfGrowth == requestBody.yearsOfGrowth
  }


  def 'POST /me/baskets/{basketId}/investments should return BAD_REQUEST (400) status code when requestBody is invalid'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def requestBody = new UpdateInvestmentRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(requestBody).post("/me/baskets/${basket.id}/investments/")
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }

  def 'POST /me/baskets/{basketId}/investments should return NOT_FOUND (404) status code when basket is not found'() {
    given:
    def requestBody = saveInvestmentRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(requestBody).post("/me/baskets/1/investments/")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()

  }

  def 'PUT /me/baskets/{basketId}/investments/{investmentId} should return OK (200) status code and updated investment'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def investment = investmentRepository.save(investment(basket: basket, owner: owner))
    def requestBody = updateInvestmentRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(requestBody).put("/me/baskets/${basket.id}/investments/${investment.id}")
    def respBody = slurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    respBody.startAmount == requestBody.startAmount
    respBody.yearsOfGrowth == requestBody.yearsOfGrowth
  }

  def 'PUT /me/baskets/{basketId}/investments/{investmentId} should return NOT_FOUND (404) status code when basket is not found'() {
    given:
    def requestBody = updateInvestmentRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(requestBody).put("/me/baskets/1/investments/1")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'PUT /me/baskets/{basketId}/investments/{investmentId} should return BAD_REQUEST (400) status code when requestBody is invalid'() {
    given:
    def basket = basketRepository.save(basket(owner: owner))
    def requestBody = new UpdateInvestmentRequestDto()
    when:
    def resp = authenticatedClient(owner).when().body(requestBody).put("/me/baskets/${basket.id}/investments/1")
    then:
    resp.statusCode() == HttpStatus.BAD_REQUEST.value()
  }

  def 'DELETE /me/baskets/{basketId}/investments/{investmentId} should return NOT_FOUND (404) status code when investment is not found'() {
    given:
    def savedBasket = basketRepository.save(basket(owner: owner))
    when:
    def resp = authenticatedClient(owner).when().delete("/me/baskets/${savedBasket.id}/investments/1")
    then:
    resp.statusCode() == HttpStatus.NOT_FOUND.value()
  }

  def 'DELETE /me/baskets/{basketId}/investments/{investmentId} should return OK (200) status code and delete investment'() {
    given:
    def savedBasket = basketRepository.save(basket(owner: owner))
    def savedInvestment = investmentRepository.save(investment(basket: savedBasket, owner: owner))
    when:
    def resp = authenticatedClient(owner).when().delete("/me/baskets/${savedBasket.id}/investments/${savedInvestment.id}")
    then:
    resp.statusCode() == HttpStatus.OK.value()
    and:
    def detailsResponse = authenticatedClient(owner).when().get("/me/baskets/${savedBasket.id + 1}/investments/${savedInvestment.id}")
    detailsResponse.statusCode() == HttpStatus.NOT_FOUND.value()
  }
}
