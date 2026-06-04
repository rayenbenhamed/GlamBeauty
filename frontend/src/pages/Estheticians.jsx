import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import EstheticianCard from "@/components/cards/EstheticianCard.jsx";

const Estheticians = () => {
  const [estheticians, setEstheticians] = useState([]);

  useEffect(() => {
    const fetchEstheticians = async () => {
      try {
        const response = await apiClient.get("/estheticians");
        setEstheticians(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEstheticians();
  }, []);

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Estheticians"
        title="Meet our beauty artists"
        subtitle="Skilled, caring, and ready to elevate your look."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {estheticians.map((esthetician) => (
          <EstheticianCard key={esthetician.id} esthetician={esthetician} />
        ))}
      </div>
    </main>
  );
};

export default Estheticians;
