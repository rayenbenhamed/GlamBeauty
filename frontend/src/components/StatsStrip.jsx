import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import { useLanguage } from "@/lib/LanguageContext.jsx";

const StatsStrip = () => {
  const { t } = useLanguage();
  const [statsData, setStatsData] = useState({
    servicesCount: 0,
    estheticiansCount: 0,
    reviewsCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/services/stats");
        setStatsData(res.data);
      } catch (err) {
        console.error("Failed to fetch public stats", err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: t("luxury_services"), value: statsData.servicesCount },
    { label: t("expert_estheticians"), value: statsData.estheticiansCount },
    { label: t("five_star_reviews"), value: statsData.reviewsCount }
  ];

  return (
    <div className="glass-panel grid gap-6 p-8 text-center md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-3xl text-ink">{stat.value}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;
