import SectionHeader from "@/components/SectionHeader.jsx";
import PromotionCard from "@/components/cards/PromotionCard.jsx";
import { promotions } from "@/data/mockData";

const Promotions = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Promotions"
        title="Exclusive seasonal offers"
        subtitle="Enjoy curated savings on your signature looks."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {promotions.map((promo) => (
          <PromotionCard key={promo.id} promo={promo} />
        ))}
      </div>
    </main>
  );
};

export default Promotions;
