package com.glambeauty.mapper;

import com.glambeauty.domain.ServiceCategory;
import com.glambeauty.dto.CategoryRequest;
import com.glambeauty.dto.CategoryResponse;

public class CategoryMapper {
    private CategoryMapper() {
    }

    public static ServiceCategory toEntity(CategoryRequest request) {
        if (request == null) {
            return null;
        }
        ServiceCategory category = new ServiceCategory();
        category.setName(request.name());
        category.setDescription(request.description());
        category.setImageUrl(request.imageUrl());
        return category;
    }

    public static CategoryResponse toResponse(ServiceCategory category) {
        if (category == null) {
            return null;
        }
        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getDescription(),
            category.getImageUrl()
        );
    }
}
