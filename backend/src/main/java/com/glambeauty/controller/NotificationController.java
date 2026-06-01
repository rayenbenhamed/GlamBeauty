package com.glambeauty.controller;

import com.glambeauty.domain.User;
import com.glambeauty.service.NotificationService;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<String> getNotifications(Authentication authentication) {
        Long userId = ((User) authentication.getPrincipal()).getId();
        return notificationService.getNotifications(userId);
    }
}
