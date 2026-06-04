import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import ServiceCard from "@/components/cards/ServiceCard.jsx";
import PackCard from "@/components/cards/PackCard.jsx";
import PromotionCard from "@/components/cards/PromotionCard.jsx";
import EstheticianCard from "@/components/cards/EstheticianCard.jsx";
import StatsStrip from "@/components/StatsStrip.jsx";
import Button from "@/components/ui/button.jsx";
import { useLanguage } from "@/lib/LanguageContext.jsx";

const Home = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [packs, setPacks] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [estheticians, setEstheticians] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const servicesRes = await apiClient.get("/services");
        setServices(servicesRes.data.slice(0, 4));

        const packsRes = await apiClient.get("/packs");
        setPacks(packsRes.data.slice(0, 3));

        const promosRes = await apiClient.get("/promotions");
        setPromotions(promosRes.data.slice(0, 2));

        const estheticiansRes = await apiClient.get("/estheticians");
        setEstheticians(estheticiansRes.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load home details", err);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <main className="fade-up">
      <section className="section-shell pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              {t("luxury_rituals")}
            </p>
            <h1 className="mt-5 font-display text-4xl text-ink md:text-5xl">
              {t("hero_title")}
            </h1>
            <p className="mt-5 text-sm text-ink/70">
              {t("hero_subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/booking">{t("reserve_appointment")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services">{t("explore_services")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
            <div className="glass-panel overflow-hidden">
              <div
                className="h-[420px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1500917293891-ef795e70e1f6)"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-16">
        <StatsStrip />
      </section>

      {services.length > 0 && (
        <section className="section-shell mt-16">
          <SectionHeader
            eyebrow={t("signature_services")}
            title={t("curated_collection")}
            subtitle={t("services_subtitle")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {packs.length > 0 && (
        <section className="section-shell mt-16">
          <SectionHeader
            eyebrow={t("luxury_packs")}
            title={t("complete_journeys")}
            subtitle={t("packs_subtitle")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </section>
      )}

      {promotions.length > 0 && (
        <section className="section-shell mt-16">
          <SectionHeader
            eyebrow={t("promotions")}
            title={t("seasonal_elegance")}
            subtitle={t("exclusive_offers")}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {promotions.map((promo) => (
              <PromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        </section>
      )}

      {estheticians.length > 0 && (
        <section className="section-shell mt-16">
          <SectionHeader
            eyebrow={t("estheticians")}
            title={t("crafted_by_artists")}
            subtitle={t("meet_team")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {estheticians.map((esthetician) => (
              <EstheticianCard key={esthetician.id} esthetician={esthetician} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
