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

            if (!userRepository.existsByEmail(adminEmail)) {
                User admin = new User();
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setRole(adminRole);
                admin.setEnabled(true);
                admin.setCreatedAt(Instant.now());
                userRepository.save(admin);
            }

            if (categoryRepository.count() == 0) {
                ServiceCategory makeupCategory = new ServiceCategory();
                makeupCategory.setName("Makeup");
                makeupCategory.setDescription("Luxury makeup artistry");

                ServiceCategory hairColoringCategory = new ServiceCategory();
                hairColoringCategory.setName("Hair Coloring");
                hairColoringCategory.setDescription("Premium color services");

                ServiceCategory hairTreatmentsCategory = new ServiceCategory();
                hairTreatmentsCategory.setName("Hair Treatments");
                hairTreatmentsCategory.setDescription("Restorative hair rituals");

                ServiceCategory faceCareCategory = new ServiceCategory();
                faceCareCategory.setName("Face Care");
                faceCareCategory.setDescription("Signature facial experiences");

                ServiceCategory handsFeetCategory = new ServiceCategory();
                handsFeetCategory.setName("Hands and Feet");
                handsFeetCategory.setDescription("Manicure and pedicure");

                ServiceCategory hairRemovalCategory = new ServiceCategory();
                hairRemovalCategory.setName("Hair Removal");
                hairRemovalCategory.setDescription("Smooth waxing services");

                ServiceCategory nailsCategory = new ServiceCategory();
                nailsCategory.setName("Nails");
                nailsCategory.setDescription("Artful nail design");

                ServiceCategory lashesCategory = new ServiceCategory();
                lashesCategory.setName("Eyelashes");
                lashesCategory.setDescription("Lash enhancements");

                ServiceCategory piercingCategory = new ServiceCategory();
                piercingCategory.setName("Piercing");
                piercingCategory.setDescription("Safe piercing services");

                List<ServiceCategory> categories = List.of(
                    makeupCategory,
                    hairColoringCategory,
                    hairTreatmentsCategory,
                    faceCareCategory,
                    handsFeetCategory,
                    hairRemovalCategory,
                    nailsCategory,
                    lashesCategory,
                    piercingCategory
                );
                categoryRepository.saveAll(categories);
            }

            if (serviceRepository.count() == 0) {
                ServiceCategory makeup = categoryRepository.findAll().stream()
                    .filter(cat -> "Makeup".equals(cat.getName()))
                    .findFirst()
                    .orElse(null);
                ServiceCategory hairColoring = categoryRepository.findAll().stream()
                    .filter(cat -> "Hair Coloring".equals(cat.getName()))
                    .findFirst()
                    .orElse(null);

                BeautyService professionalMakeup = new BeautyService();
                professionalMakeup.setName("Professional Makeup");
                professionalMakeup.setDescription("Flawless event-ready makeup");
                professionalMakeup.setPrice(new BigDecimal("120"));
                professionalMakeup.setDurationMinutes(60);
                professionalMakeup.setCategory(makeup);

                BeautyService bridalMakeup = new BeautyService();
                bridalMakeup.setName("Bridal Makeup");
                bridalMakeup.setDescription("Luxury bridal glam package");
                bridalMakeup.setPrice(new BigDecimal("240"));
                bridalMakeup.setDurationMinutes(90);
                bridalMakeup.setCategory(makeup);

                BeautyService coloring = new BeautyService();
                coloring.setName("Coloring");
                coloring.setDescription("Premium single process color");
                coloring.setPrice(new BigDecimal("150"));
                coloring.setDurationMinutes(120);
                coloring.setCategory(hairColoring);

                BeautyService balayage = new BeautyService();
                balayage.setName("Balayage");
                balayage.setDescription("Sun-kissed balayage artistry");
                balayage.setPrice(new BigDecimal("220"));
                balayage.setDurationMinutes(150);
                balayage.setCategory(hairColoring);

                serviceRepository.saveAll(List.of(
                    professionalMakeup,
                    bridalMakeup,
                    coloring,
                    balayage
                ));
            }

            if (estheticianRepository.count() == 0) {
                User estheticianUser = new User();
                estheticianUser.setEmail("esthetician@glambeauty.com");
                estheticianUser.setPassword(passwordEncoder.encode("Glam123!"));
                estheticianUser.setRole(estheticianRole);
                estheticianUser.setEnabled(true);
                estheticianUser.setCreatedAt(Instant.now());
                userRepository.save(estheticianUser);

                EstheticianProfile profile = new EstheticianProfile();
                profile.setUser(estheticianUser);
                profile.setDisplayName(adminFirstName + " " + adminLastName);
                profile.setBio("Senior esthetician specializing in luxury treatments");
                profile.setSkills("Makeup, Skin Care, Lash Extensions");
                estheticianRepository.save(profile);
            }
        };
    }
}
