package com.glambeauty.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.glambeauty.domain.Notification;
import com.glambeauty.domain.Reservation;
import com.glambeauty.domain.User;
import com.glambeauty.domain.enums.NotificationType;
import com.glambeauty.dto.ReservationResponse;
import com.glambeauty.mapper.ReservationMapper;
import com.glambeauty.repository.NotificationRepository;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailFrom;

    public NotificationService(NotificationRepository notificationRepository, JavaMailSender mailSender) {
        this.notificationRepository = notificationRepository;
        this.mailSender = mailSender;
    }

    public List<String> getNotifications(Long userId) {
        return notificationRepository.findByUserId(userId).stream()
            .map(Notification::getMessage)
            .collect(Collectors.toList());
    }

    public void sendEmail(String to, String subject, String body) {
        if (mailSender == null || to == null || to.isBlank()) {
            return;
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        if (mailFrom != null && !mailFrom.isBlank()) {
            message.setFrom(mailFrom);
        }
        message.setSubject(subject);
        message.setText(body);
        try {
            mailSender.send(message);
        } catch (RuntimeException ex) {
            // Ignore email transport failures to avoid blocking booking flow.
        }
    }

    public void notifyReservationCreated(Reservation reservation) {
        ReservationResponse dto = ReservationMapper.toResponse(reservation);
        String message = "Reservation created for " + dto.serviceName() + " at " + dto.startTime();
        createNotification(reservation.getClient().getUser(), "Reservation created", message, NotificationType.RESERVATION_CONFIRMED);
        sendEmail(reservation.getClient().getUser().getEmail(), "Reservation confirmation", message);
    }

    public void notifyReservationStatus(Reservation reservation) {
        ReservationResponse dto = ReservationMapper.toResponse(reservation);
        String message = "Reservation status updated to " + dto.status() + " for " + dto.serviceName();
        createNotification(reservation.getClient().getUser(), "Reservation update", message, NotificationType.SYSTEM);
        sendEmail(reservation.getClient().getUser().getEmail(), "Reservation update", message);
    }

    private void createNotification(User user, String title, String message, NotificationType type) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setSentAt(Instant.now());
        notification.setRead(false);
        notificationRepository.save(notification);
    }
}
