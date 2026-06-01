package com.glambeauty.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record ReservationRequest(
    @NotNull Long serviceId,
    @NotNull Long estheticianId,
    @NotNull LocalDateTime startTime,
    String notes
) {
}
