import SectionHeader from "@/components/SectionHeader.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import CalendarPanel from "@/components/CalendarPanel.jsx";

const AdminDashboard = () => {
  const stats = [
    { label: "Total clients", value: "1,254" },
    { label: "Total reservations", value: "3,482" },
    { label: "Total revenue", value: "$182,400" },
    { label: "Occupancy rate", value: "86%" }
  ];

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Admin"
        title="Executive dashboard"
        subtitle="Monitor performance, revenue, and activity in real time."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/60">
                {stat.label}
              </p>
              <p className="mt-3 font-display text-2xl text-ink">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <CalendarPanel />
        <div className="glass-panel p-6">
          <h3 className="font-display text-2xl text-ink">Most requested services</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink/70">
            <li>Balayage - 28%</li>
            <li>Bridal Makeup - 22%</li>
            <li>Advanced Facial - 18%</li>
            <li>Gel Nails - 15%</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
