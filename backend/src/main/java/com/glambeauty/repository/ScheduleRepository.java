package com.glambeauty.repository;

import com.glambeauty.domain.Schedule;
import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByEstheticianId(Long estheticianId);
    Optional<Schedule> findByEstheticianIdAndDayOfWeek(Long estheticianId, DayOfWeek dayOfWeek);
}
