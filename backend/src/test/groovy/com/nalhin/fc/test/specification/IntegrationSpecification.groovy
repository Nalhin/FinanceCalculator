package com.nalhin.fc.test.specification

import com.nalhin.fc.core.jwt.JwtService
import com.nalhin.fc.test.annotations.IntegrationTest
import com.nalhin.fc.user.User
import io.restassured.RestAssured
import io.restassured.http.Header
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.MediaType
import spock.lang.Specification


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@IntegrationTest
class IntegrationSpecification extends Specification {

  @LocalServerPort
  private int serverPort

  @Autowired
  private JwtService jwtService

  def baseClient() {
    return RestAssured.given()
        .basePath("/api")
        .port(serverPort)
        .accept(MediaType.APPLICATION_JSON.toString())
        .contentType(MediaType.APPLICATION_JSON.toString())
  }

  def authenticatedClient(User user) {
    return baseClient()
        .header(new Header("Authorization",
            "Bearer ${jwtService.sign(user.getUsername())}"))
  }

  def authenticatedClient(String token) {
    return baseClient()
        .header(new Header("Authorization", "Bearer ${token}"))
  }
}
