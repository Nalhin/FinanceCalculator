package com.nalhin.fc.basket

import com.nalhin.fc.basket.exception.BasketNotFoundException
import com.nalhin.fc.basket.exception.BasketNotOwnedException
import spock.lang.Specification
import spock.lang.Subject

import static com.nalhin.fc.test.factories.BasketTestFactory.basket
import static com.nalhin.fc.test.factories.BasketTestFactory.updateBasketRequestDto

class BasketServiceTest extends Specification {

  def repository = Mock(BasketRepository)

  @Subject
  def service = new BasketService(repository, new BasketMapperImpl())

  def "updateBasket() should throw BasketNotFoundException when basket is not found"() {
    given:
    repository.findById(1) >> Optional.empty()
    when:
    service.updateBasket(1, updateBasketRequestDto(), 2)
    then:
    thrown BasketNotFoundException
  }

  def "updateBasket() should throw BasketNotOwnedException when user does not own the basket"() {
    given:
    repository.findById(1) >> Optional.of(basket(user: { id: 2 }))
    when:
    service.updateBasket(1, updateBasketRequestDto(), 2)
    then:
    thrown BasketNotOwnedException
  }

  def "deleteBasket() should throw BasketNotFoundException when basket is not found"() {
    given:
    repository.findById(1) >> Optional.empty()
    when:
    service.deleteBasket(1,  2)
    then:
    thrown BasketNotFoundException
  }

  def "deleteBasket() should throw BasketNotOwnedException when user does not own the basket\""() {
    given:
    repository.findById(1) >> Optional.of(basket(user: { id: 2 }))
    when:
    service.deleteBasket(1, 2)
    then:
    thrown BasketNotOwnedException
  }
}
