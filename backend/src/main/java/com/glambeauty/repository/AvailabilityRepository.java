package com.glambeauty.repository;

import com.glambeauty.domain.Availability;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByEstheticianIdAndDate(Long estheticianId, LocalDate date);
}
