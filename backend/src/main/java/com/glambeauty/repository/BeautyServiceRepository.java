package com.glambeauty.repository;

import com.glambeauty.domain.BeautyService;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeautyServiceRepository extends JpaRepository<BeautyService, Long> {
    List<BeautyService> findByCategoryId(Long categoryId);
}
