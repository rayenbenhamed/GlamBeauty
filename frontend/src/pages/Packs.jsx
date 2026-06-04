import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import PackCard from "@/components/cards/PackCard.jsx";

const Packs = () => {
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await apiClient.get("/packs");
        setPacks(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPacks();
  }, []);

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Packs"
        title="Luxury beauty collections"
        subtitle="Elevate your experience with curated combinations."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </main>
  );
};

export default Packs;
