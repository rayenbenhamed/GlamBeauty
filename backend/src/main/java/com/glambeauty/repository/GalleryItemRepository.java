package com.glambeauty.repository;

import com.glambeauty.domain.GalleryItem;
import com.glambeauty.domain.enums.GalleryCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryItemRepository extends JpaRepository<GalleryItem, Long> {
    List<GalleryItem> findByCategory(GalleryCategory category);
}
