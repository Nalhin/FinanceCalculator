package com.nalhin.fc.test.factories

import com.github.javafaker.Faker
import com.nalhin.fc.basket.Basket
import com.nalhin.fc.investment.Investment
import com.nalhin.fc.investment.InvestmentCategory
import com.nalhin.fc.investment.dto.request.SaveInvestmentRequestDto
import com.nalhin.fc.investment.dto.request.UpdateInvestmentRequestDto
import com.nalhin.fc.test.faker.TestFaker
import com.nalhin.fc.user.User

class InvestmentTestFactory {
  private static final Faker faker = new TestFaker()

  static Investment investment(
      Map map = Collections.EMPTY_MAP
  ) {
    return new Investment(
        id: (map.id ?: faker.id()) as long,
        owner: (map.owner ?: UserTestFactory.user()) as User,
        basket: (map.basket ?: BasketTestFactory.basket()) as Basket,
        startAmount: (map.startAmount ?: faker.random().nextInt(0, 10_000_000)) as int,
        yearsOfGrowth: (map.yearsOfGrowth ?: faker.random().nextInt(1, 30)) as int,
        paymentFrequency: (map.paymentFrequency ?: faker.random().nextInt(1, 52)) as int,
        annualInterestRate: (map.annualInterestRate ?: faker.random().nextInt(1, 30)) as double,
        payment: (map.payment ?: faker.random().nextInt(0, 1_000_000)) as int,
        compoundFrequency: (map.compoundFrequency ?: faker.random().nextInt(1, 52)) as int,
        category: (map.category ?: faker.randomEnum(InvestmentCategory)) as InvestmentCategory,
    )
  }

  static SaveInvestmentRequestDto saveInvestmentRequestDto(
      Map map = Collections.EMPTY_MAP
  ) {
    return new SaveInvestmentRequestDto(
        startAmount: (map.startAmount ?: faker.random().nextInt(0, 10_000_000)) as int,
        yearsOfGrowth: (map.yearsOfGrowth ?: faker.random().nextInt(1, 30)) as int,
        paymentFrequency: (map.paymentFrequency ?: faker.random().nextInt(1, 52)) as int,
        annualInterestRate: (map.annualInterestRate ?: faker.random().nextInt(1, 30)) as double,
        payment: (map.payment ?: faker.random().nextInt(0, 1_000_000)) as int,
        compoundFrequency: (map.compoundFrequency ?: faker.random().nextInt(1, 52)) as int,
        category: (map.category ?: faker.randomEnum(InvestmentCategory)) as InvestmentCategory,
    )
  }

  static UpdateInvestmentRequestDto updateInvestmentRequestDto(
      Map map = Collections.EMPTY_MAP
  ) {
    return new UpdateInvestmentRequestDto(
        startAmount: (map.startAmount ?: faker.random().nextInt(0, 10_000_000)) as int,
        yearsOfGrowth: (map.yearsOfGrowth ?: faker.random().nextInt(1, 30)) as int,
        paymentFrequency: (map.paymentFrequency ?: faker.random().nextInt(1, 52)) as int,
        annualInterestRate: (map.annualInterestRate ?: faker.random().nextInt(1, 30)) as double,
        payment: (map.payment ?: faker.random().nextInt(0, 1_000_000)) as int,
        compoundFrequency: (map.compoundFrequency ?: faker.random().nextInt(1, 52)) as int,
        category: (map.category ?: faker.randomEnum(InvestmentCategory)) as InvestmentCategory,
    )
  }
}
