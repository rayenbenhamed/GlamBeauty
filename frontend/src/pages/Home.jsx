import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader.jsx";
import ServiceCard from "@/components/cards/ServiceCard.jsx";
import PackCard from "@/components/cards/PackCard.jsx";
import PromotionCard from "@/components/cards/PromotionCard.jsx";
import EstheticianCard from "@/components/cards/EstheticianCard.jsx";
import ReviewCard from "@/components/cards/ReviewCard.jsx";
import StatsStrip from "@/components/StatsStrip.jsx";
import Button from "@/components/ui/button.jsx";
import { services, packs, promotions, estheticians, reviews } from "@/data/mockData";

const Home = () => {
  return (
    <main className="fade-up">
      <section className="section-shell pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              Luxury beauty rituals
            </p>
            <h1 className="mt-5 font-display text-4xl text-ink md:text-5xl">
              A sanctuary of glow, artistry, and serene indulgence.
            </h1>
            <p className="mt-5 text-sm text-ink/70">
              Glam Beauty Center blends high-touch esthetic care with a modern
              booking journey. Discover our signature services, tailored packs,
              and expert estheticians.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/booking">Reserve Your Appointment</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
            <div className="glass-panel overflow-hidden">
              <div
                className="h-[420px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1500917293891-ef795e70e1f6)"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-16">
        <StatsStrip />
      </section>

      <section className="section-shell mt-16">
        <SectionHeader
          eyebrow="Signature services"
          title="A curated collection of treatments"
          subtitle="From radiant makeup to restorative hair rituals, each service is designed for elegance and comfort."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-16">
        <SectionHeader
          eyebrow="Luxury packs"
          title="Complete beauty journeys"
          subtitle="Thoughtfully paired treatments with refined savings."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {packs.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-16">
        <SectionHeader
          eyebrow="Promotions"
          title="Seasonal elegance"
          subtitle="Exclusive offers crafted for your special moments."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {promotions.map((promo) => (
            <PromotionCard key={promo.id} promo={promo} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-16">
        <SectionHeader
          eyebrow="Estheticians"
          title="Crafted by artists"
          subtitle="Meet the team shaping every experience with precision and care."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {estheticians.map((esthetician) => (
            <EstheticianCard key={esthetician.id} esthetician={esthetician} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-16 pb-20">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by our clients"
          subtitle="Stories of transformation and confidence."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
