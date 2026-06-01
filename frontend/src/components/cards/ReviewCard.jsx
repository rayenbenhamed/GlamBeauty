import { Card, CardContent } from "@/components/ui/card.jsx";

const ReviewCard = ({ review }) => {
  return (
    <Card className="bg-white/80">
      <CardContent>
        <p className="text-3xl">"</p>
        <p className="mt-2 text-sm text-ink/70">{review.quote}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">
          {review.name}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
