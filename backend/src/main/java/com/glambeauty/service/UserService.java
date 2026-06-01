package com.glambeauty.service;

import com.glambeauty.domain.Role;
import com.glambeauty.domain.User;
import com.glambeauty.domain.enums.RoleName;
import com.glambeauty.dto.UserResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.UserMapper;
import com.glambeauty.repository.RoleRepository;
import com.glambeauty.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
            .map(UserMapper::toResponse)
            .collect(Collectors.toList());
    }

    public UserResponse updateRole(Long userId, RoleName roleName) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new NotFoundException("User not found"));
        Role role = roleRepository.findByName(roleName)
            .orElseThrow(() -> new NotFoundException("Role not found"));
        user.setRole(role);
        return UserMapper.toResponse(userRepository.save(user));
    }
}
