import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import ServiceCard from "@/components/cards/ServiceCard.jsx";

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await apiClient.get("/categories");
        setCategories(categoriesRes.data);

        const servicesRes = await apiClient.get("/services");
        setServices(servicesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const url = categoryId ? `/services?categoryId=${categoryId}` : "/services";
      const res = await apiClient.get(url);
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load filtered services", err);
    }
  };

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Services"
        title="Your luxury service menu"
        subtitle="Browse by category and find your signature ritual."
      />
      
      {/* Interactive Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 text-xs">
        <button
          onClick={() => handleCategorySelect(null)}
          className={`rounded-full px-4 py-2 transition font-medium ${
            selectedCategory === null
              ? "bg-gold text-white shadow-sm"
              : "bg-beige text-ink/75 hover:bg-gold/10"
          }`}
        >
          All Services
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`rounded-full px-4 py-2 transition font-medium ${
              selectedCategory === category.id
                ? "bg-gold text-white shadow-sm"
                : "bg-beige text-ink/75 hover:bg-gold/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-10 text-ink/50">
            No services found in this category.
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        )}
      </div>
    </main>
  );
};

export default Services;
