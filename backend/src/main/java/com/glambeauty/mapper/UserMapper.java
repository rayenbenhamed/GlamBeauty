package com.glambeauty.mapper;

import com.glambeauty.domain.User;
import com.glambeauty.dto.UserResponse;

public class UserMapper {
    private UserMapper() {
    }

    public static UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        String roleName = user.getRole() != null && user.getRole().getName() != null
            ? user.getRole().getName().name()
            : null;
        return new UserResponse(user.getId(), user.getEmail(), roleName, user.isEnabled());
    }
}
