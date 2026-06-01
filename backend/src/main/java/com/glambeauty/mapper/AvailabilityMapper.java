package com.glambeauty.mapper;

import com.glambeauty.domain.Availability;
import com.glambeauty.dto.AvailabilityResponse;

public class AvailabilityMapper {
    private AvailabilityMapper() {
    }

    public static AvailabilityResponse toResponse(Availability availability) {
        if (availability == null) {
            return null;
        }
        return new AvailabilityResponse(
            availability.getId(),
            availability.getDate(),
            availability.getStartTime(),
            availability.getEndTime(),
            availability.getType(),
            availability.getReason()
        );
    }
}
