package com.nalhin.fc.investment;

import com.nalhin.fc.basket.Basket;
import com.nalhin.fc.user.User;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "investments")
public class Investment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "basket_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Basket basket;

  @Column(name = "start_amount", nullable = false)
  private long startAmount;

  @Column(name = "years_of_growth", nullable = false)
  private int yearsOfGrowth;

  @Column(name = "payment_frequency", nullable = false)
  private int paymentFrequency;

  @Column(name = "annual_interest_rate", nullable = false)
  private int annualInterestRate;

  @Column(name = "payment", nullable = false)
  private int payment;

  @Column(name = "compound_frequency", nullable = false)
  private int compoundFrequency;

  @Column(name = "category", nullable = false)
  @Enumerated(value = EnumType.STRING)
  private InvestmentCategory category;

  @Column(name = "created_date", nullable = false)
  @CreatedDate
  private Date createdDate;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "owner_id", nullable = false)
  @CreatedBy
  private User owner;
}
