package com.nalhin.fc.investment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
  List<Investment> findByBasketIdAndOwnerId(Long basketId, Long ownerId);

  Optional<Investment> findByBasketIdAndId(Long basketId, Long investmentId);
}
