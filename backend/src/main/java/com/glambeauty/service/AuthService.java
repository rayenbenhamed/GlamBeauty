package com.glambeauty.service;

import com.glambeauty.domain.ClientProfile;
import com.glambeauty.domain.Role;
import com.glambeauty.domain.User;
import com.glambeauty.domain.enums.RoleName;
import com.glambeauty.dto.AuthResponse;
import com.glambeauty.dto.ForgotPasswordRequest;
import com.glambeauty.dto.LoginRequest;
import com.glambeauty.dto.RegisterRequest;
import com.glambeauty.exception.BadRequestException;
import com.glambeauty.repository.ClientProfileRepository;
import com.glambeauty.repository.RoleRepository;
import com.glambeauty.repository.UserRepository;
import com.glambeauty.security.JwtService;
import java.time.Instant;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final NotificationService notificationService;

    public AuthService(
        AuthenticationManager authenticationManager,
        UserRepository userRepository,
        RoleRepository roleRepository,
        ClientProfileRepository clientProfileRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService,
        NotificationService notificationService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.clientProfileRepository = clientProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.notificationService = notificationService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }

        Role role = roleRepository.findByName(RoleName.CLIENT)
            .orElseThrow(() -> new BadRequestException("Role not configured"));

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user.setEnabled(true);
        user.setCreatedAt(Instant.now());
        userRepository.save(user);

        ClientProfile profile = new ClientProfile();
        profile.setUser(user);
        profile.setFirstName(request.firstName());
        profile.setLastName(request.lastName());
        profile.setPhone(request.phone());
        clientProfileRepository.save(profile);

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, role.getName().name(), user.getId());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        User user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        String token = jwtService.generateToken(user);
        String role = user.getRole() != null && user.getRole().getName() != null ? user.getRole().getName().name() : null;
        return new AuthResponse(token, role, user.getId());
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmail(request.email()).ifPresent(user -> {
            notificationService.sendEmail(
                user.getEmail(),
                "Password reset",
                "We received a request to reset your password. Please contact support to complete the reset."
            );
        });
    }
}
