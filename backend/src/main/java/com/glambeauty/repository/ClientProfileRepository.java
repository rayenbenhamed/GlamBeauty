package com.glambeauty.repository;

import com.glambeauty.domain.ClientProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientProfileRepository extends JpaRepository<ClientProfile, Long> {
    Optional<ClientProfile> findByUserId(Long userId);
}
