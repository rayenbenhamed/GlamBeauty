import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader.jsx";
import PromotionCard from "@/components/cards/PromotionCard.jsx";
import apiClient from "@/api/client";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await apiClient.get("/promotions");
        setPromotions(res.data);
      } catch (err) {
        console.error("Failed to load promotions", err);
      }
    };
    fetchPromos();
  }, []);

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Promotions"
        title="Exclusive seasonal offers"
        subtitle="Enjoy curated savings on your signature looks."
      />
      {promotions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {promotions.map((promo) => (
            <PromotionCard key={promo.id} promo={promo} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink/50 py-10">No promotions available at this time.</p>
      )}
    </main>
  );
};

export default Promotions;
