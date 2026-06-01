package com.glambeauty.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record ScheduleResponse(
    Long id,
    DayOfWeek dayOfWeek,
    LocalTime startTime,
    LocalTime endTime,
    boolean enabled
) {
}
