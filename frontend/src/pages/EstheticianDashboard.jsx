import SectionHeader from "@/components/SectionHeader.jsx";
import CalendarPanel from "@/components/CalendarPanel.jsx";

const EstheticianDashboard = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Esthetician"
        title="Daily schedule"
        subtitle="Manage appointments, availability, and client history."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <CalendarPanel />
        <div className="glass-panel p-6">
          <h3 className="font-display text-2xl text-ink">Availability</h3>
          <p className="mt-3 text-sm text-ink/70">
            Set working hours, vacation dates, and accept upcoming appointments.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-ink/60">
            <li>Mon - Fri: 9:00 - 18:00</li>
            <li>Saturday: 10:00 - 16:00</li>
            <li>Next vacation: July 10 - 15</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default EstheticianDashboard;
