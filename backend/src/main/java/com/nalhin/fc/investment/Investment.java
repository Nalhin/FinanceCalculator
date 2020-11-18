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
  @Column(name = "id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "basket_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Basket basket;

  @Column(name = "start_amount")
  private Long startAmount;

  @Column(name = "years_of_growth")
  private Integer yearsOfGrowth;

  @Column(name = "payment_frequency")
  private Integer paymentFrequency;

  @Column(name = "annual_interest_rate")
  private Integer annualInterestRate;

  @Column(name = "payment")
  private Integer payment;

  @Column(name = "risk")
  private String risk;

  @Column(name = "category")
  private String category;

  @Column(name = "created")
  @CreatedDate
  private Date created;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "owner_id", nullable = false)
  @CreatedBy
  private User owner;
}
