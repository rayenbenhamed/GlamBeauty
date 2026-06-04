import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import Badge from "@/components/ui/badge.jsx";
import Button from "@/components/ui/button.jsx";

const ServiceCard = ({ service }) => {
  const category = service.categoryName || (service.category && service.category.name) || service.category || "General";
  const duration = service.durationMinutes ? `${service.durationMinutes} min` : service.duration;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Badge>{category}</Badge>
        <h3 className="mt-4 font-display text-xl text-ink">{service.name}</h3>
        <p className="mt-2 text-sm text-ink/60">{service.description}</p>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink/60">{duration}</span>
          <span className="font-semibold text-ink">{service.price} DT</span>
        </div>
        <Button variant="outline" className="mt-5 w-full" onClick={() => window.location.href = "/booking"}>
          Reserve
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
