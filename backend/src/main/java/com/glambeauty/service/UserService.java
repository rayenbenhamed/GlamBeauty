package com.glambeauty.service;

import com.glambeauty.domain.Role;
import com.glambeauty.domain.User;
import com.glambeauty.domain.enums.RoleName;
import com.glambeauty.dto.UserResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.UserMapper;
import com.glambeauty.repository.RoleRepository;
import com.glambeauty.repository.UserRepository;
import com.glambeauty.repository.ClientProfileRepository;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.dto.UserProfileDto;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final EstheticianProfileRepository estheticianProfileRepository;

    public UserService(
        UserRepository userRepository,
        RoleRepository roleRepository,
        ClientProfileRepository clientProfileRepository,
        EstheticianProfileRepository estheticianProfileRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.clientProfileRepository = clientProfileRepository;
        this.estheticianProfileRepository = estheticianProfileRepository;
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

        if (roleName == RoleName.ESTHETICIAN) {
            if (user.getEstheticianProfile() == null) {
                com.glambeauty.domain.EstheticianProfile profile = new com.glambeauty.domain.EstheticianProfile();
                profile.setUser(user);
                if (user.getClientProfile() != null) {
                    profile.setDisplayName(user.getClientProfile().getFirstName() + " " + user.getClientProfile().getLastName());
                } else {
                    profile.setDisplayName("Esthetician Profile");
                }
                estheticianProfileRepository.save(profile);
                user.setEstheticianProfile(profile);
            }
        } else {
            if (user.getClientProfile() == null) {
                com.glambeauty.domain.ClientProfile profile = new com.glambeauty.domain.ClientProfile();
                profile.setUser(user);
                if (user.getEstheticianProfile() != null) {
                    profile.setFirstName(user.getEstheticianProfile().getDisplayName());
                } else {
                    profile.setFirstName("Glam");
                    profile.setLastName("User");
                }
                clientProfileRepository.save(profile);
                user.setClientProfile(profile);
            }
        }

        return UserMapper.toResponse(userRepository.save(user));
    }

    public UserProfileDto getProfile(User user) {
        User dbUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new NotFoundException("User not found"));
        
        String roleName = dbUser.getRole() != null ? dbUser.getRole().getName().name() : null;
        
        String firstName = null;
        String lastName = null;
        String displayName = null;
        String phone = null;
        String bio = null;
        String skills = null;
        String imageUrl = null;

        if (dbUser.getClientProfile() != null) {
            firstName = dbUser.getClientProfile().getFirstName();
            lastName = dbUser.getClientProfile().getLastName();
            phone = dbUser.getClientProfile().getPhone();
            imageUrl = dbUser.getClientProfile().getImageUrl();
        }
        if (dbUser.getEstheticianProfile() != null) {
            displayName = dbUser.getEstheticianProfile().getDisplayName();
            bio = dbUser.getEstheticianProfile().getBio();
            skills = dbUser.getEstheticianProfile().getSkills();
            imageUrl = dbUser.getEstheticianProfile().getImageUrl();
        }

        return new UserProfileDto(
            dbUser.getId(),
            dbUser.getEmail(),
            roleName,
            firstName,
            lastName,
            displayName,
            phone,
            bio,
            skills,
            imageUrl
        );
    }

    public UserProfileDto updateProfile(User user, UserProfileDto dto) {
        User dbUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new NotFoundException("User not found"));

        if (dbUser.getRole() != null && dbUser.getRole().getName() == RoleName.ESTHETICIAN) {
            com.glambeauty.domain.EstheticianProfile profile = dbUser.getEstheticianProfile();
            if (profile == null) {
                profile = new com.glambeauty.domain.EstheticianProfile();
                profile.setUser(dbUser);
            }
            profile.setDisplayName(dto.displayName());
            profile.setBio(dto.bio());
            profile.setSkills(dto.skills());
            if (dto.imageUrl() != null && !dto.imageUrl().isBlank()) {
                profile.setImageUrl(dto.imageUrl());
            }
            estheticianProfileRepository.save(profile);
            dbUser.setEstheticianProfile(profile);
        } else {
            com.glambeauty.domain.ClientProfile profile = dbUser.getClientProfile();
            if (profile == null) {
                profile = new com.glambeauty.domain.ClientProfile();
                profile.setUser(dbUser);
            }
            profile.setFirstName(dto.firstName());
            profile.setLastName(dto.lastName());
            profile.setPhone(dto.phone());
            if (dto.imageUrl() != null && !dto.imageUrl().isBlank()) {
                profile.setImageUrl(dto.imageUrl());
            }
            clientProfileRepository.save(profile);
            dbUser.setClientProfile(profile);
        }

        userRepository.save(dbUser);
        return getProfile(dbUser);
    }
}
