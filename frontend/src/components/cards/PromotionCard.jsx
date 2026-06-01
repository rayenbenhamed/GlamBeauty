import { Card, CardContent } from "@/components/ui/card.jsx";

const PromotionCard = ({ promo }) => {
  return (
    <Card className="border border-gold/40">
      <CardContent>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{promo.dates}</p>
        <h3 className="mt-3 font-display text-2xl text-ink">{promo.title}</h3>
        <p className="mt-3 text-sm text-ink/70">{promo.description}</p>
        <p className="mt-5 text-lg font-semibold text-ink">{promo.discount}</p>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
