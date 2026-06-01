package com.glambeauty.repository;

import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.domain.Reservation;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByClientUserId(Long userId);
    List<Reservation> findByEstheticianUserId(Long userId);
    boolean existsByEstheticianAndStartTimeLessThanAndEndTimeGreaterThan(
        EstheticianProfile esthetician,
        LocalDateTime endTime,
        LocalDateTime startTime
    );
}
