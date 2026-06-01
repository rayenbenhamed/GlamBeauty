package com.glambeauty.service;

import com.glambeauty.domain.ServiceCategory;
import com.glambeauty.dto.CategoryRequest;
import com.glambeauty.dto.CategoryResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.CategoryMapper;
import com.glambeauty.repository.ServiceCategoryRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    private final ServiceCategoryRepository categoryRepository;

    public CategoryService(ServiceCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream()
            .map(CategoryMapper::toResponse)
            .collect(Collectors.toList());
    }

    public CategoryResponse getById(Long id) {
        ServiceCategory category = categoryRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Category not found"));
        return CategoryMapper.toResponse(category);
    }

    public CategoryResponse create(CategoryRequest request) {
        ServiceCategory category = CategoryMapper.toEntity(request);
        return CategoryMapper.toResponse(categoryRepository.save(category));
    }

    public CategoryResponse update(Long id, CategoryRequest request) {
        ServiceCategory category = categoryRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Category not found"));
        category.setName(request.name());
        category.setDescription(request.description());
        category.setImageUrl(request.imageUrl());
        return CategoryMapper.toResponse(categoryRepository.save(category));
    }

    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new NotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);
    }
}
