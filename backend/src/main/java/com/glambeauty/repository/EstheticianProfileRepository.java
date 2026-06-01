package com.glambeauty.repository;

import com.glambeauty.domain.EstheticianProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstheticianProfileRepository extends JpaRepository<EstheticianProfile, Long> {
    Optional<EstheticianProfile> findByUserId(Long userId);
}
