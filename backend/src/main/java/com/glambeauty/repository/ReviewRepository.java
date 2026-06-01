package com.glambeauty.repository;

import com.glambeauty.domain.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByServiceId(Long serviceId);
    List<Review> findByEstheticianId(Long estheticianId);
}
