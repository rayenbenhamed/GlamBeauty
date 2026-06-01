package com.glambeauty.dto;

import com.glambeauty.domain.enums.AvailabilityType;
import java.time.LocalDate;
import java.time.LocalTime;

public record AvailabilityResponse(
    Long id,
    LocalDate date,
    LocalTime startTime,
    LocalTime endTime,
    AvailabilityType type,
    String reason
) {
}
