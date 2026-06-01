package com.glambeauty.mapper;

import com.glambeauty.domain.Schedule;
import com.glambeauty.dto.ScheduleResponse;

public class ScheduleMapper {
    private ScheduleMapper() {
    }

    public static ScheduleResponse toResponse(Schedule schedule) {
        if (schedule == null) {
            return null;
        }
        return new ScheduleResponse(
            schedule.getId(),
            schedule.getDayOfWeek(),
            schedule.getStartTime(),
            schedule.getEndTime(),
            schedule.isEnabled()
        );
    }
}
