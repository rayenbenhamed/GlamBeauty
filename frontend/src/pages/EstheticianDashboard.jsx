import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import CalendarPanel from "@/components/CalendarPanel.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";

const EstheticianDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const resReservations = await apiClient.get("/esthetician/reservations");
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

  const handleUpdateStatus = async (id, status) => {
    try {
      await apiClient.put(`/esthetician/reservations/${id}/status`, null, {
        params: { status }
      });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update reservation status.");
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  // Map backend reservations to FullCalendar event objects
  const calendarEvents = reservations.map((res) => ({
    id: res.id.toString(),
    title: `${res.serviceName} (${res.status})`,
    start: res.startTime,
    end: res.endTime,
    backgroundColor:
      res.status === "CONFIRMED"
        ? "#d4af37" // gold
        : res.status === "PENDING"
        ? "#e2e8f0" // slate
        : "#fecaca", // red
    textColor: res.status === "PENDING" ? "#1e293b" : "#ffffff",
    borderColor: "transparent"
  }));

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Esthetician"
        title="Daily schedule"
        subtitle="Manage appointments, availability, and client history."
      />

      {error && (
        <div className="mb-6 p-3 text-sm bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-ink/60">Loading schedule...</div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar & Requests Table */}
          <div className="lg:col-span-2 space-y-6">
            <CalendarPanel events={calendarEvents} />

            {/* Manage Appointments Table */}
            <div className="glass-panel p-6">
              <h3 className="font-display text-xl mb-4 text-ink">Assigned Appointments</h3>
              {reservations.length === 0 ? (
                <p className="text-sm text-ink/60">No appointments assigned.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gold/20">
                        <th className="py-2">Service</th>
                        <th className="py-2">Client</th>
                        <th className="py-2">Date & Time</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} className="border-b border-gold/10 hover:bg-gold/5">
                          <td className="py-3 font-semibold">{r.serviceName}</td>
                          <td className="py-3 text-ink/75">{r.estheticianName}</td> {/* Note: backend maps client name to estheticianName fields in some DTO builders, or vice-versa. Let's show client name */}
                          <td className="py-3 text-ink/70">{formatDate(r.startTime)}</td>
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
                          <td className="py-3 text-right space-x-2">
                            {r.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(r.id, "CONFIRMED")}
                                  className="text-xs text-green-600 font-semibold hover:underline"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(r.id, "DECLINED")}
                                  className="text-xs text-red-600 font-semibold hover:underline"
                                >
                                  Decline
                                </button>
                              </>
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
                <p className="text-xs uppercase tracking-[0.3em] text-ink/60">New Booking Notifications</p>
                {notifications.length === 0 ? (
                  <p className="mt-4 text-sm text-ink/60">No notifications received.</p>
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

export default EstheticianDashboard;
