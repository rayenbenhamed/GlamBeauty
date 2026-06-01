import { Card, CardContent } from "@/components/ui/card.jsx";

const EstheticianCard = ({ esthetician }) => {
  return (
    <Card className="overflow-hidden">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${esthetician.image})` }}
      />
      <CardContent>
        <h3 className="font-display text-xl text-ink">{esthetician.name}</h3>
        <p className="mt-2 text-sm text-ink/60">{esthetician.specialty}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold">
          {esthetician.experience}
        </p>
      </CardContent>
    </Card>
  );
};

export default EstheticianCard;
