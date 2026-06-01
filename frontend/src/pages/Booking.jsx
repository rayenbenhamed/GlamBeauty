import SectionHeader from "@/components/SectionHeader.jsx";
import CalendarPanel from "@/components/CalendarPanel.jsx";
import BookingPanel from "@/components/BookingPanel.jsx";

const Booking = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Booking"
        title="Reserve your next appointment"
        subtitle="Select your preferred service, esthetician, and time slot."
      />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <CalendarPanel />
        <BookingPanel />
      </div>
    </main>
  );
};

export default Booking;
