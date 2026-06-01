package com.glambeauty.service;

import com.glambeauty.domain.BlogArticle;
import com.glambeauty.domain.User;
import com.glambeauty.dto.BlogArticleRequest;
import com.glambeauty.dto.BlogArticleResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.BlogMapper;
import com.glambeauty.repository.BlogArticleRepository;
import com.glambeauty.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class BlogService {
    private final BlogArticleRepository blogRepository;
    private final UserRepository userRepository;

    public BlogService(BlogArticleRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    public List<BlogArticleResponse> getAll() {
        return blogRepository.findAll().stream()
            .map(BlogMapper::toResponse)
            .collect(Collectors.toList());
    }

    public BlogArticleResponse getById(Long id) {
        BlogArticle article = blogRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Article not found"));
        return BlogMapper.toResponse(article);
    }

    public BlogArticleResponse create(BlogArticleRequest request, Long authorId) {
        User author = userRepository.findById(authorId)
            .orElseThrow(() -> new NotFoundException("Author not found"));
        BlogArticle article = new BlogArticle();
        article.setAuthor(author);
        article.setTitle(request.title());
        article.setExcerpt(request.excerpt());
        article.setContent(request.content());
        article.setCoverImageUrl(request.coverImageUrl());
        article.setPublishedAt(request.publishedAt());
        article.setCreatedAt(Instant.now());
        return BlogMapper.toResponse(blogRepository.save(article));
    }

    public BlogArticleResponse update(Long id, BlogArticleRequest request) {
        BlogArticle article = blogRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Article not found"));
        article.setTitle(request.title());
        article.setExcerpt(request.excerpt());
        article.setContent(request.content());
        article.setCoverImageUrl(request.coverImageUrl());
        article.setPublishedAt(request.publishedAt());
        return BlogMapper.toResponse(blogRepository.save(article));
    }
}
