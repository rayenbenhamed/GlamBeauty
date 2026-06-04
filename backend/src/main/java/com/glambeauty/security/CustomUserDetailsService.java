package com.glambeauty.security;

import com.glambeauty.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String emailLower = username != null ? username.toLowerCase(java.util.Locale.ROOT) : "";
        return userRepository.findByEmail(emailLower)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
