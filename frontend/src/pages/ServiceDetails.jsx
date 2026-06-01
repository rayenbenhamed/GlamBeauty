import { useParams } from "react-router-dom";
import Button from "@/components/ui/button.jsx";
import { services } from "@/data/mockData";

const ServiceDetails = () => {
  const { id } = useParams();
  const service = services.find((item) => item.id === id) || services[0];

  return (
    <main className="section-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {service.category}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink">{service.name}</h1>
          <p className="mt-5 text-sm text-ink/70">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-beige px-4 py-2">{service.duration}</span>
            <span className="rounded-full bg-beige px-4 py-2">${service.price}</span>
          </div>
          <Button className="mt-8">Reserve Now</Button>
        </div>
        <div className="glass-panel overflow-hidden">
          <div
            className="h-[360px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9)"
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default ServiceDetails;
