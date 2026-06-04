package com.glambeauty.controller;

import com.glambeauty.domain.enums.RoleName;
import com.glambeauty.dto.UserResponse;
import com.glambeauty.service.UserService;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.glambeauty.domain.User;
import com.glambeauty.dto.UserProfileDto;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAll() {
        return userService.getAllUsers();
    }

    @PutMapping("/api/admin/users/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateRole(@PathVariable Long id, @RequestParam RoleName role) {
        return userService.updateRole(id, role);
    }

    @GetMapping("/api/users/me")
    public UserProfileDto getMyProfile(@AuthenticationPrincipal User user) {
        return userService.getProfile(user);
    }

    @PutMapping("/api/users/me")
    public UserProfileDto updateMyProfile(@AuthenticationPrincipal User user, @RequestBody UserProfileDto dto) {
        return userService.updateProfile(user, dto);
    }
}
