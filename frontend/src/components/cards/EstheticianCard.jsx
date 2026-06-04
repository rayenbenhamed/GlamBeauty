import { Card, CardContent } from "@/components/ui/card.jsx";

const EstheticianCard = ({ esthetician }) => {
  const name = esthetician.displayName || esthetician.name || "Glam Artist";
  const imageUrl = esthetician.imageUrl || esthetician.image || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f";
  const specialty = esthetician.skills || esthetician.specialty || "Beauty Expert";

  return (
    <Card className="overflow-hidden">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardContent>
        <h3 className="font-display text-xl text-ink">{name}</h3>
        <p className="mt-2 text-sm text-ink/60">{specialty}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold">
          {esthetician.bio || esthetician.experience || "Expert Stylist"}
        </p>
      </CardContent>
    </Card>
  );
};

export default EstheticianCard;
