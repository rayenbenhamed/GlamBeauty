const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/40 bg-ink text-pearl">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl">Glam Beauty Center</h3>
          <p className="mt-4 text-sm text-pearl/70">
            Luxury beauty rituals, expert estheticians, and a seamless booking
            experience designed for you.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold uppercase tracking-widest text-gold">Visit</h4>
          <p className="mt-4 text-pearl/70">Avenue de la Beaute, Tunis</p>
          <p className="text-pearl/70">Mon - Sat, 9:00 - 20:00</p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold uppercase tracking-widest text-gold">Contact</h4>
          <p className="mt-4 text-pearl/70">hello@glambeauty.com</p>
          <p className="text-pearl/70">+216 12 345 678</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
