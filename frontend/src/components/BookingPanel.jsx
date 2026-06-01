import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";
import Textarea from "@/components/ui/textarea.jsx";
import { services, estheticians } from "@/data/mockData";

const BookingPanel = () => {
  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-2xl text-ink">Reserve Your Ritual</h3>
      <p className="mt-2 text-sm text-ink/60">
        Select your service, esthetician, and preferred time.
      </p>
      <form className="mt-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-ink/60">
            Service
          </label>
          <select className="mt-2 w-full rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 text-sm">
            {services.map((service) => (
              <option key={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-ink/60">
            Esthetician
          </label>
          <select className="mt-2 w-full rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 text-sm">
            {estheticians.map((esthetician) => (
              <option key={esthetician.id}>{esthetician.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input type="date" />
          <Input type="time" />
        </div>
        <Textarea placeholder="Tell us about your desired look or treatment." rows={4} />
        <Button className="w-full" size="lg">
          Confirm Reservation
        </Button>
      </form>
    </div>
  );
};

export default BookingPanel;
