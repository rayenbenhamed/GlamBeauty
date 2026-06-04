import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import Button from "@/components/ui/button.jsx";

const ClientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const resReservations = await apiClient.get("/reservations/my");
      setReservations(resReservations.data);

      const resNotifs = await apiClient.get("/notifications");
      setNotifications(resNotifs.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCancelReservation = async (id) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await apiClient.put(`/reservations/${id}/cancel`);
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel reservation.");
    }
  };

  // Find next upcoming reservation (CONFIRMED or PENDING, start time in future)
  const upcoming = reservations
    .filter(r => r.status !== "CANCELED" && r.status !== "DECLINED" && new Date(r.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))[0];

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Client"
        title="Your beauty itinerary"
        subtitle="Upcoming appointments and history at a glance."
      />

      {error && (
        <div className="mb-6 p-3 text-sm bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-ink/60">Loading your profile itinerary...</div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Next Visit & History */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Next visit</p>
                {upcoming ? (
                  <div className="mt-4">
                    <h3 className="font-display text-2xl text-gold">{upcoming.serviceName}</h3>
                    <p className="mt-2 text-sm text-ink/75">
                      Scheduled for: <span className="font-semibold text-ink">{formatDate(upcoming.startTime)}</span>
                    </p>
                    <p className="text-sm text-ink/75">
                      Esthetician: <span className="font-semibold text-ink">{upcoming.estheticianName}</span>
                    </p>
                    <p className="text-sm text-ink/75">
                      Price: <span className="font-semibold text-gold">{upcoming.totalPrice} DT</span>
                    </p>
                    <div className="mt-4 flex gap-3">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        upcoming.status === "CONFIRMED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {upcoming.status}
                      </span>
                      {upcoming.status === "PENDING" && (
                        <button
                          onClick={() => handleCancelReservation(upcoming.id)}
                          className="text-xs text-red-600 font-semibold hover:underline"
                        >
                          Cancel Reservation
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-ink/60">No upcoming appointments. Treat yourself and book a ritual!</p>
                )}
              </CardContent>
            </Card>

            {/* Reservations Table */}
            <div className="glass-panel p-6">
              <h3 className="font-display text-xl mb-4 text-ink">My Reservation History</h3>
              {reservations.length === 0 ? (
                <p className="text-sm text-ink/60">No reservations found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gold/20">
                        <th className="py-2">Service</th>
                        <th className="py-2">Date & Time</th>
                        <th className="py-2">Esthetician</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} className="border-b border-gold/10 hover:bg-gold/5">
                          <td className="py-3 font-semibold">{r.serviceName}</td>
                          <td className="py-3 text-ink/70">{formatDate(r.startTime)}</td>
                          <td className="py-3 text-ink/70">{r.estheticianName}</td>
                          <td className="py-3 font-semibold text-gold">{r.totalPrice} DT</td>
                          <td className="py-3">
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              r.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                              r.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                              r.status === "CANCELED" ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            {r.status === "PENDING" && (
                              <button
                                onClick={() => handleCancelReservation(r.id)}
                                className="text-xs text-red-600 font-semibold hover:underline"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Notifications */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Notifications</p>
                {notifications.length === 0 ? (
                  <p className="mt-4 text-sm text-ink/60">No new notifications.</p>
                ) : (
                  <ul className="mt-4 space-y-3 text-sm text-ink/70">
                    {notifications.map((notif, index) => (
                      <li key={index} className="p-3 bg-pearl/50 rounded-lg border border-gold/10 hover:border-gold/30 transition">
                        {notif}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
};

export default ClientDashboard;
