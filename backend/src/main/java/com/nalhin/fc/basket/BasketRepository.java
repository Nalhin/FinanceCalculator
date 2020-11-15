package com.nalhin.fc.basket;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
  Page<Basket> findAllByOwnerId(Pageable pageable, Long ownerId);
}
