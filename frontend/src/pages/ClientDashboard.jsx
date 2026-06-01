import SectionHeader from "@/components/SectionHeader.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";

const ClientDashboard = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Client"
        title="Your beauty itinerary"
        subtitle="Upcoming appointments and history at a glance."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Next visit</p>
            <h3 className="mt-3 font-display text-2xl text-ink">Bridal Makeup</h3>
            <p className="mt-2 text-sm text-ink/70">June 12, 2026 - 11:00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Notifications</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/70">
              <li>Confirmation sent for your next appointment.</li>
              <li>New promotion: Golden Hour.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ClientDashboard;
