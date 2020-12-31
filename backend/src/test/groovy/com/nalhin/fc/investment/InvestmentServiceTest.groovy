package com.nalhin.fc.investment

import com.nalhin.fc.basket.BasketRepository
import com.nalhin.fc.investment.exception.InvestmentBasketNotFound
import com.nalhin.fc.investment.exception.InvestmentNotFoundException
import com.nalhin.fc.investment.exception.InvestmentNotOwnedException
import spock.lang.Specification
import spock.lang.Subject

import static com.nalhin.fc.test.factories.InvestmentTestFactory.investment
import static com.nalhin.fc.test.factories.InvestmentTestFactory.updateInvestmentRequestDto


class InvestmentServiceTest extends Specification {

  def investmentRepository = Mock(InvestmentRepository)
  def basketRepository = Mock(BasketRepository)

  @Subject
  InvestmentService service = new InvestmentService(investmentRepository, new InvestmentMapperImpl(), basketRepository)

  def "getByBasketIdAndId() should throw InvestmentNotFound exception when investment is not found"() {
    given:
    investmentRepository.findByBasketIdAndId(1, 2) >> Optional.empty()
    when:
    service.getByBasketIdAndId(1, 2, 3)
    then:
    thrown InvestmentNotFoundException
  }

  def "getByBasketIdAndId() should throw InvestmentNotOwnedException when user does not own the investment"() {
    given:
    def actualInvestment = investment()
    investmentRepository.findByBasketIdAndId(1, 2) >> Optional.of(actualInvestment)
    when:
    service.getByBasketIdAndId(1, 2, actualInvestment.owner.id + 1)
    then:
    thrown InvestmentNotOwnedException
  }


  def "getByBasketIdAndId() should return investment"() {
    given:
    def expectedInvestment = investment()
    investmentRepository.findByBasketIdAndId(1, 2) >> Optional.of(expectedInvestment)
    when:
    def actualInvestment = service.getByBasketIdAndId(1, 2, expectedInvestment.owner.id)
    then:
    actualInvestment == expectedInvestment
  }

  def "saveInvestment() should throw InvestmentBasketNotFoundException when basket is not found"() {
    given:
    basketRepository.findById(1) >> Optional.empty()
    when:
    service.saveInvestment(investment(), 1)
    then:
    thrown InvestmentBasketNotFound
  }

  def "updateInvestment() should throw InvestmentNotFoundException when investment is not found"() {
    given:
    investmentRepository.findByBasketIdAndId(1, 2) >> Optional.empty()
    when:
    service.updateInvestmentByBasketIdAndId(1, 2, updateInvestmentRequestDto(), 3)
    then:
    thrown InvestmentNotFoundException
  }

  def "updateInvestment() should throw InvestmentNotOwnedException when user does not own the investment"() {
    given:
    def actualInvestment = investment()
    investmentRepository.findByBasketIdAndId(1, actualInvestment.id) >> Optional.of(actualInvestment)
    when:
    service.updateInvestmentByBasketIdAndId(1, actualInvestment.id, updateInvestmentRequestDto(), actualInvestment.owner.id + 1)
    then:
    thrown InvestmentNotOwnedException
  }


  def "deleteByBasketIdAndId() should throw InvestmentNotFoundException when investment is not found"() {
    given:
    investmentRepository.findByBasketIdAndId(1, 2) >> Optional.empty()
    when:
    service.deleteByBasketIdAndId(1, 2, 3)
    then:
    thrown InvestmentNotFoundException
  }

  def "deleteByBasketIdAndId() should throw InvestmentNotOwnedException when user does not own the investment"() {
    given:
    def actualInvestment = investment()
    investmentRepository.findByBasketIdAndId(1, actualInvestment.id) >> Optional.of(actualInvestment)
    when:
    service.deleteByBasketIdAndId(1, actualInvestment.id, actualInvestment.owner.id + 1)
    then:
    thrown InvestmentNotOwnedException
  }
}
