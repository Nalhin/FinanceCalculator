package com.nalhin.fc.investment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
  Page<Investment> findByBasketIdAndOwnerId(Long basketId, Long ownerId, Pageable pageable);

  Optional<Investment> findByBasketIdAndId(Long basketId, Long investmentId);
}
