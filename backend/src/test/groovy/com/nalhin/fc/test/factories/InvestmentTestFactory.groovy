package com.nalhin.fc.test.factories

import com.github.javafaker.Faker
import com.nalhin.fc.basket.Basket
import com.nalhin.fc.investment.Investment
import com.nalhin.fc.investment.InvestmentCategory
import com.nalhin.fc.investment.dto.SaveInvestmentRequestDto
import com.nalhin.fc.investment.dto.UpdateInvestmentRequestDto
import com.nalhin.fc.test.faker.TestFaker
import com.nalhin.fc.user.User

class InvestmentTestFactory {
  private static final Faker faker = new TestFaker()

  static Investment investment(
      Map map = Collections.EMPTY_MAP
  ) {
    return new Investment(
        id: (map.id ?: faker.id()) as Long,
        owner: (map.owner ?: UserTestFactory.user()) as User,
        basket: (map.basket ?: BasketTestFactory.basket()) as Basket,
        startAmount: (map.startAmount ?: faker.positiveInt()) as int,
        yearsOfGrowth: (map.yearsOfGrowth ?: faker.positiveInt()) as int,
        paymentFrequency: (map.paymentFrequency ?: 12) as int,
        annualInterestRate: (map.annualInterestRate ?: faker.positiveInt()) as int,
        payment: (map.payment ?: faker.positiveInt()) as int,
        compoundFrequency: (map.compoundFrequency ?: faker.positiveInt()) as int,
        category: (map.category ?: faker.randomEnum(InvestmentCategory)) as InvestmentCategory,
    )
  }

  static SaveInvestmentRequestDto saveInvestmentRequestDto(
      Map map = Collections.EMPTY_MAP
  ) {
    return new SaveInvestmentRequestDto(
        startAmount: (map.startAmount ?: faker.positiveInt()) as int,
        yearsOfGrowth: (map.yearsOfGrowth ?: faker.positiveInt()) as int,
        paymentFrequency: (map.paymentFrequency ?: 12) as int,
        annualInterestRate: (map.annualInterestRate ?: faker.positiveInt()) as int,
        compoundFrequency: (map.compoundFrequency ?: faker.positiveInt()) as int,
        payment: (map.payment ?: faker.positiveInt()) as int,
        category: (map.category ?: faker.randomEnum(InvestmentCategory)) as InvestmentCategory,
    )
  }

  static UpdateInvestmentRequestDto updateInvestmentRequestDto(
      Map map = Collections.EMPTY_MAP
  ) {
    return new UpdateInvestmentRequestDto(
        startAmount: (map.startAmount ?: faker.positiveInt()) as int,
        yearsOfGrowth: (map.yearsOfGrowth ?: faker.positiveInt()) as int,
        paymentFrequency: (map.paymentFrequency ?: 12) as int,
        annualInterestRate: (map.annualInterestRate ?: faker.positiveInt()) as int,
        compoundFrequency: (map.compoundFrequency ?: faker.positiveInt()) as int,
        payment: (map.payment ?: faker.positiveInt()) as int,
        category: (map.category ?: faker.randomEnum(InvestmentCategory)) as InvestmentCategory,
    )
  }
}
