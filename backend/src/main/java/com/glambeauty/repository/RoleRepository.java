package com.glambeauty.repository;

import com.glambeauty.domain.Role;
import com.glambeauty.domain.enums.RoleName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
