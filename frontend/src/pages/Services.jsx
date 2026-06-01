import SectionHeader from "@/components/SectionHeader.jsx";
import ServiceCard from "@/components/cards/ServiceCard.jsx";
import { categories, services } from "@/data/mockData";

const Services = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Services"
        title="Your luxury service menu"
        subtitle="Browse by category and find your signature ritual."
      />
      <div className="flex flex-wrap gap-3 text-xs text-ink/60">
        {categories.map((category) => (
          <span key={category} className="rounded-full bg-beige px-4 py-2">
            {category}
          </span>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
};

export default Services;
