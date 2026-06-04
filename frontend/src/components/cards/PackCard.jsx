import { Card, CardContent } from "@/components/ui/card.jsx";
import Badge from "@/components/ui/badge.jsx";

const PackCard = ({ pack }) => {
  const imageUrl = pack.image || (pack.imageUrls && pack.imageUrls[0]) || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";
  return (
    <Card className="overflow-hidden">
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardContent>
        <Badge>Signature Pack</Badge>
        <h3 className="mt-4 font-display text-xl text-ink">{pack.name}</h3>
        <p className="mt-2 text-sm text-ink/60">{pack.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/60">
          {pack.services && pack.services.map((service) => (
            <span key={service} className="rounded-full bg-beige px-3 py-1">
              {service}
            </span>
          ))}
        </div>
        <p className="mt-5 text-lg font-semibold text-ink">{pack.price} DT</p>
      </CardContent>
    </Card>
  );
};

export default PackCard;
