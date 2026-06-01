package com.glambeauty.service;

import com.glambeauty.domain.Reservation;
import com.glambeauty.dto.AdminStatsResponse;
import com.glambeauty.dto.MonthlyStat;
import com.glambeauty.dto.ServiceStat;
import com.glambeauty.repository.ClientProfileRepository;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.repository.ReservationRepository;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AdminStatsService {
    private final ClientProfileRepository clientRepository;
    private final ReservationRepository reservationRepository;
    private final EstheticianProfileRepository estheticianRepository;

    public AdminStatsService(
        ClientProfileRepository clientRepository,
        ReservationRepository reservationRepository,
        EstheticianProfileRepository estheticianRepository
    ) {
        this.clientRepository = clientRepository;
        this.reservationRepository = reservationRepository;
        this.estheticianRepository = estheticianRepository;
    }

    public AdminStatsResponse getStats() {
        List<Reservation> reservations = reservationRepository.findAll();
        BigDecimal totalRevenue = reservations.stream()
            .map(Reservation::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> serviceCounts = reservations.stream()
            .filter(res -> res.getService() != null)
            .collect(Collectors.groupingBy(res -> res.getService().getName(), Collectors.counting()));

        List<ServiceStat> mostRequested = serviceCounts.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue(Comparator.reverseOrder()))
            .limit(5)
            .map(entry -> new ServiceStat(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

        Map<YearMonth, Long> monthlyCounts = reservations.stream()
            .collect(Collectors.groupingBy(res -> YearMonth.from(res.getStartTime()), Collectors.counting()));
        List<MonthlyStat> byMonth = monthlyCounts.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .map(entry -> new MonthlyStat(entry.getKey().toString(), entry.getValue()))
            .collect(Collectors.toList());

        long estheticianCount = estheticianRepository.count();
        long totalMinutes = reservations.stream()
            .mapToLong(res -> java.time.Duration.between(res.getStartTime(), res.getEndTime()).toMinutes())
            .sum();
        long availableMinutes = Math.max(1, estheticianCount) * 8L * 60L * 30L;
        double occupancy = Math.min(1.0, (double) totalMinutes / (double) availableMinutes);

        return new AdminStatsResponse(
            clientRepository.count(),
            reservations.size(),
            totalRevenue,
            mostRequested,
            byMonth,
            occupancy
        );
    }
}
