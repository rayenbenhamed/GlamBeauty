import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";
import Textarea from "@/components/ui/textarea.jsx";

const BookingPanel = () => {
  const [services, setServices] = useState([]);
  const [estheticians, setEstheticians] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedEsthetician, setSelectedEsthetician] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const servicesRes = await apiClient.get("/services");
      setServices(servicesRes.data);
      if (servicesRes.data.length > 0) {
        setSelectedService(servicesRes.data[0].id);
      }

      const estheticiansRes = await apiClient.get("/estheticians");
      setEstheticians(estheticiansRes.data);
      if (estheticiansRes.data.length > 0) {
        setSelectedEsthetician(estheticiansRes.data[0].id);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load options.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first to reserve a ritual.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!date || !time) {
      setError("Please choose a date and time.");
      return;
    }

    // Validate Day: Monday is closed (Date.getDay() returns 1 for Monday)
    const selectedDate = new Date(date);
    if (selectedDate.getDay() === 1) {
      setError("The center is closed on Mondays. Please choose Tuesday to Sunday.");
      return;
    }

    // Validate Time: 10:00 to 20:00
    const [hour, minute] = time.split(":").map(Number);
    if (hour < 10 || hour >= 20) {
      setError("Opening hours are from 10:00 AM to 8:00 PM. Please pick a slot within this range.");
      return;
    }

    setLoading(true);
    try {
      const startTime = `${date}T${time}:00`;
      await apiClient.post("/reservations", {
        serviceId: parseInt(selectedService),
        estheticianId: parseInt(selectedEsthetician),
        startTime,
        notes
      });
      setSuccess("Your reservation was submitted! Go to dashboard to track the status.");
      setNotes("");
      setDate("");
      setTime("");
    } catch (err) {
      setError(err.response?.data?.message || "Selected slot overlaps or is invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-2xl text-ink">Reserve Your Ritual</h3>
      <p className="mt-2 text-sm text-ink/60">
        Choose your desired treatment, artist, and schedule a slot.
      </p>
      
      {error && (
        <div className="mt-4 p-3 text-sm bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 text-sm bg-green-50 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-ink/60">
            Service
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} ({service.price} DT - {service.durationMinutes} min)
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-ink/60">
            Esthetician
          </label>
          <select
            value={selectedEsthetician}
            onChange={(e) => setSelectedEsthetician(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          >
            {estheticians.map((est) => (
              <option key={est.id} value={est.id}>
                {est.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink/60">Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink/60">Time</label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>

        <Textarea
          placeholder="Tell us about your desired look or treatment."
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Submitting..." : "Confirm Reservation"}
        </Button>
      </form>
    </div>
  );
};

export default BookingPanel;
