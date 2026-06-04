package com.glambeauty.config;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.glambeauty.domain.BeautyService;
import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.domain.Role;
import com.glambeauty.domain.ServiceCategory;
import com.glambeauty.domain.User;
import com.glambeauty.domain.enums.RoleName;
import com.glambeauty.repository.BeautyServiceRepository;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.repository.RoleRepository;
import com.glambeauty.repository.ServiceCategoryRepository;
import com.glambeauty.repository.UserRepository;

@Configuration
public class SeedDataConfig {
    @Bean
    public CommandLineRunner seedData(
        RoleRepository roleRepository,
        UserRepository userRepository,
        ServiceCategoryRepository categoryRepository,
        BeautyServiceRepository serviceRepository,
        EstheticianProfileRepository estheticianRepository,
        com.glambeauty.repository.PackRepository packRepository,
        com.glambeauty.repository.ReviewRepository reviewRepository,
        com.glambeauty.repository.ReservationRepository reservationRepository,
        com.glambeauty.repository.ClientProfileRepository clientProfileRepository,
        com.glambeauty.repository.NotificationRepository notificationRepository,
        com.glambeauty.repository.ScheduleRepository scheduleRepository,
        PasswordEncoder passwordEncoder,
        @Value("${app.default-admin.email}") String adminEmail,
        @Value("${app.default-admin.password}") String adminPassword,
        @Value("${app.default-admin.first-name}") String adminFirstName,
        @Value("${app.default-admin.last-name}") String adminLastName
    ) {
        return args -> {
            Role adminRole = roleRepository.findByName(RoleName.ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.ADMIN)));
            Role estheticianRole = roleRepository.findByName(RoleName.ESTHETICIAN)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.ESTHETICIAN)));
            Role clientRole = roleRepository.findByName(RoleName.CLIENT)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.CLIENT)));

            String adminEmailLower = adminEmail != null ? adminEmail.toLowerCase(java.util.Locale.ROOT) : "";
            if (!userRepository.existsByEmail(adminEmailLower)) {
                User admin = new User();
                admin.setEmail(adminEmailLower);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setRole(adminRole);
                admin.setEnabled(true);
                admin.setCreatedAt(Instant.now());
                userRepository.save(admin);
            }

            if (categoryRepository.count() == 0) {
                // Makeup
                ServiceCategory makeup = new ServiceCategory();
                makeup.setName("Makeup");
                makeup.setDescription("Professional makeup styling and bridal packages");
                categoryRepository.save(makeup);

                createService(serviceRepository, "Professional Makeup", "Flawless, event-ready professional makeup styling", new BigDecimal("80"), 60, makeup);
                createService(serviceRepository, "Bridal Makeup", "Luxury long-lasting bridal makeup package", new BigDecimal("250"), 90, makeup);

                // Hair Coloring
                ServiceCategory hairColoring = new ServiceCategory();
                hairColoring.setName("Hair Coloring");
                hairColoring.setDescription("Expert hair coloring, dyes, and highlights");
                categoryRepository.save(hairColoring);

                createService(serviceRepository, "Coloring", "Full head single process professional coloring", new BigDecimal("120"), 120, hairColoring);
                createService(serviceRepository, "Balayage", "Hand-painted sun-kissed natural highlighting balayage", new BigDecimal("180"), 150, hairColoring);
                createService(serviceRepository, "Ombre", "Elegant seamless color gradient melt", new BigDecimal("160"), 150, hairColoring);
                createService(serviceRepository, "Highlights", "Dimensional foil highlights and accents", new BigDecimal("140"), 120, hairColoring);

                // Hair Treatments
                ServiceCategory hairTreatments = new ServiceCategory();
                hairTreatments.setName("Hair Treatments");
                hairTreatments.setDescription("Nourishing and restorative deep hair treatments");
                categoryRepository.save(hairTreatments);

                createService(serviceRepository, "Protein", "Deep nourishing protein hair reconstructor", new BigDecimal("200"), 180, hairTreatments);
                createService(serviceRepository, "Caviar", "Luxury anti-aging and hydration caviar mask", new BigDecimal("250"), 180, hairTreatments);
                createService(serviceRepository, "Tanino", "Natural organic tannin smoothing treatment", new BigDecimal("220"), 180, hairTreatments);
                createService(serviceRepository, "Hair Straightening", "Pro-keratin intense thermal straightening and silk press", new BigDecimal("150"), 120, hairTreatments);

                // Face Care
                ServiceCategory faceCare = new ServiceCategory();
                faceCare.setName("Face Care");
                faceCare.setDescription("Restorative and cleansing facial care treatments");
                categoryRepository.save(faceCare);

                createService(serviceRepository, "Basic Facial Care", "Gentle skin cleaning, exfoliation, and hydration", new BigDecimal("60"), 45, faceCare);
                createService(serviceRepository, "Advanced Facial Care", "Targeted anti-aging, chemical peel, and firming treatment", new BigDecimal("120"), 75, faceCare);

                // Hands and Feet
                ServiceCategory handsAndFeet = new ServiceCategory();
                handsAndFeet.setName("Hands and Feet");
                handsAndFeet.setDescription("Luxury manicures and relaxing pedicure treatments");
                categoryRepository.save(handsAndFeet);

                createService(serviceRepository, "Manicure", "Classic nail shaping, cuticle care, and hand massage", new BigDecimal("40"), 45, handsAndFeet);
                createService(serviceRepository, "Pedicure", "Soothing foot scrub, nail care, and polish", new BigDecimal("50"), 45, handsAndFeet);

                // Hair Removal
                ServiceCategory hairRemoval = new ServiceCategory();
                hairRemoval.setName("Hair Removal");
                hairRemoval.setDescription("Gentle body and face waxing hair removal services");
                categoryRepository.save(hairRemoval);

                createService(serviceRepository, "Face Waxing", "Precise brow, lip, and facial hair waxing", new BigDecimal("30"), 30, hairRemoval);
                createService(serviceRepository, "Body Waxing", "Smooth full arm, leg, or underarm waxing", new BigDecimal("90"), 60, hairRemoval);

                // Nails
                ServiceCategory nails = new ServiceCategory();
                nails.setName("Nails");
                nails.setDescription("Advanced gel enhancements, nail polish and creative nail art");
                categoryRepository.save(nails);

                createService(serviceRepository, "Gel Nails", "Stunning builder gel extensions and overlays", new BigDecimal("80"), 90, nails);
                createService(serviceRepository, "Permanent Nail Polish", "Long-lasting chip-resistant UV gel polish", new BigDecimal("45"), 45, nails);
                createService(serviceRepository, "Nail Art", "Creative custom hand-painted graphic nail designs", new BigDecimal("60"), 60, nails);

                // Eyelashes
                ServiceCategory eyelashes = new ServiceCategory();
                eyelashes.setName("Eyelashes");
                eyelashes.setDescription("Elegant semi-permanent eyelash extensions and lifts");
                categoryRepository.save(eyelashes);

                createService(serviceRepository, "Lash Extensions", "Premium lightweight classic or volume lash extensions", new BigDecimal("110"), 90, eyelashes);

                // Piercing
                ServiceCategory piercing = new ServiceCategory();
                piercing.setName("Piercing");
                piercing.setDescription("Safe, hygienic ear and body piercing services");
                categoryRepository.save(piercing);

                createService(serviceRepository, "Ear Piercing", "Hygienic earlobe or cartilage piercing", new BigDecimal("50"), 20, piercing);
                createService(serviceRepository, "Body Piercing", "Hygienic nose, navel, or body piercing", new BigDecimal("80"), 30, piercing);
            }
        };
    }

    private static void createService(
        BeautyServiceRepository repo,
        String name,
        String desc,
        BigDecimal price,
        Integer duration,
        ServiceCategory category
    ) {
        BeautyService service = new BeautyService();
        service.setName(name);
        service.setDescription(desc);
        service.setPrice(price);
        service.setDurationMinutes(duration);
        service.setCategory(category);
        repo.save(service);
    }
}
