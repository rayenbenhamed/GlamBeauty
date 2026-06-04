import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/ui/button.jsx";
import apiClient from "@/api/client";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await apiClient.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error("Failed to load service details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="section-shell py-20 text-center">Loading...</div>;
  if (!service) return <div className="section-shell py-20 text-center">Service not found.</div>;

  return (
    <main className="section-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {service.categoryName}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink">{service.name}</h1>
          <p className="mt-5 text-sm text-ink/70">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-beige px-4 py-2">{service.durationMinutes} min</span>
            <span className="rounded-full bg-beige px-4 py-2">{service.price} DT</span>
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
