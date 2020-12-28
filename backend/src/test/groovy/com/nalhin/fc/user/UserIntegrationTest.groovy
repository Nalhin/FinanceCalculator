package com.nalhin.fc.user

import com.nalhin.fc.test.annotations.IntegrationTest
import com.nalhin.fc.test.factories.UserTestFactory
import com.nalhin.fc.test.specification.IntegrationSpecification
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus


@IntegrationTest
class UserIntegrationTest extends IntegrationSpecification {
  @Autowired
  private UserRepository userRepository

  private JsonSlurper jsonSlurper = new JsonSlurper()

  def cleanup() {
    userRepository.deleteAll()
  }

  def 'GET /me should return OK (200) status code and user when user is authenticated'() {
    given:
    def user = userRepository.save(UserTestFactory.user())
    when:
    def resp = authenticatedClient(user)
        .when().get("/me")
    def respBody = jsonSlurper.parseText(resp.body().asString())
    then:
    resp.statusCode() == HttpStatus.OK.value()
    respBody.username == user.username
    respBody.email == user.email
  }

  def 'GET /me should return FORBIDDEN (403) status code when user is not authenticated'() {
    when:
    def resp = baseClient().when().get("/me")
    then:
    resp.statusCode() == HttpStatus.FORBIDDEN.value()
  }
}
