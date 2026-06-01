package com.glambeauty.dto;

import com.glambeauty.domain.enums.AvailabilityType;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record AvailabilityRequest(
    @NotNull LocalDate date,
    @NotNull LocalTime startTime,
    @NotNull LocalTime endTime,
    @NotNull AvailabilityType type,
    String reason
) {
}
