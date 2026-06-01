import { NavLink, Link } from "react-router-dom";
import Button from "@/components/ui/button.jsx";

const links = [
  { to: "/services", label: "Services" },
  { to: "/packs", label: "Packs" },
  { to: "/promotions", label: "Promotions" },
  { to: "/estheticians", label: "Estheticians" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="font-display text-xl tracking-wide text-ink">
          Glam <span className="gold-text">Beauty</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-ink/70 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition ${
                  isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-ink/70 hover:text-ink">
            Login
          </Link>
          <Button size="sm" className="hidden sm:inline-flex">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
