package com.glambeauty.domain;

import com.glambeauty.domain.enums.GalleryCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "gallery_item")
public class GalleryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GalleryCategory category;

    @Column(name = "before_url", columnDefinition = "text", nullable = false)
    private String beforeUrl;

    @Column(name = "after_url", columnDefinition = "text", nullable = false)
    private String afterUrl;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    public GalleryItem() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public GalleryCategory getCategory() {
        return category;
    }

    public void setCategory(GalleryCategory category) {
        this.category = category;
    }

    public String getBeforeUrl() {
        return beforeUrl;
    }

    public void setBeforeUrl(String beforeUrl) {
        this.beforeUrl = beforeUrl;
    }

    public String getAfterUrl() {
        return afterUrl;
    }

    public void setAfterUrl(String afterUrl) {
        this.afterUrl = afterUrl;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
