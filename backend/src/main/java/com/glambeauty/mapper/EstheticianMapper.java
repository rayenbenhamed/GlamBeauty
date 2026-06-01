package com.glambeauty.mapper;

import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.dto.EstheticianResponse;

public class EstheticianMapper {
    private EstheticianMapper() {
    }

    public static EstheticianResponse toResponse(EstheticianProfile profile) {
        if (profile == null) {
            return null;
        }
        return new EstheticianResponse(
            profile.getId(),
            profile.getDisplayName(),
            profile.getBio(),
            profile.getSkills(),
            profile.getImageUrl()
        );
    }
}
