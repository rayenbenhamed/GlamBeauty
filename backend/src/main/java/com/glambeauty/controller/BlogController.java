package com.glambeauty.controller;

import com.glambeauty.domain.User;
import com.glambeauty.dto.BlogArticleRequest;
import com.glambeauty.dto.BlogArticleResponse;
import com.glambeauty.service.BlogService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public List<BlogArticleResponse> getAll() {
        return blogService.getAll();
    }

    @GetMapping("/{id}")
    public BlogArticleResponse getById(@PathVariable Long id) {
        return blogService.getById(id);
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public BlogArticleResponse create(@Valid @RequestBody BlogArticleRequest request, Authentication authentication) {
        return blogService.create(request, getUserId(authentication));
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BlogArticleResponse update(@PathVariable Long id, @Valid @RequestBody BlogArticleRequest request) {
        return blogService.update(id, request);
    }

    private Long getUserId(Authentication authentication) {
        return ((User) authentication.getPrincipal()).getId();
    }
}
