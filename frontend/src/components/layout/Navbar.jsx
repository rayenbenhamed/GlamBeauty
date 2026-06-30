import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/button.jsx";
import { useLanguage } from "@/lib/LanguageContext.jsx";

const links = [
  { to: "/services", key: "services" },
  { to: "/packs", key: "packs" },
  { to: "/promotions", key: "promotions" },
  { to: "/estheticians", key: "estheticians" },
  { to: "/gallery", key: "gallery" },
  { to: "/booking", key: "booking" }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const getDashboardPath = () => {
    if (role === "ADMIN") return "/admin";
    if (role === "ESTHETICIAN") return "/esthetician";
    return "/client";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-ink/70 hover:text-ink" 
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className="flex items-center gap-2.5 font-display text-xl tracking-wide text-ink">
            <img src="/logo.png" alt="GlamBeauty Logo" className="h-12 w-12 object-contain rounded-full shadow-sm border border-gold/10" />
            <span className="hidden sm:inline">Glam <span className="gold-text">Beauty</span></span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
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
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Toggle */}
          <div className="flex items-center gap-1 border-r border-ink/10 pr-2 sm:pr-3 mr-1 text-xs">
            <button
              onClick={() => setLanguage("en")}
              className={`px-1.5 py-0.5 rounded transition ${
                language === "en" ? "bg-gold text-ink font-bold" : "text-ink/60 hover:text-ink font-medium"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-1.5 py-0.5 rounded transition ${
                language === "fr" ? "bg-gold text-ink font-bold" : "text-ink/60 hover:text-ink font-medium"
              }`}
            >
              FR
            </button>
          </div>

          {token ? (
            <>
              <Link to={getDashboardPath()} className="hidden sm:block text-sm text-ink/70 hover:text-ink">
                {t("dashboard")}
              </Link>
              <Link to="/profile" className="hidden sm:block text-sm text-ink/70 hover:text-ink">
                {t("profile")}
              </Link>
              <Button size="sm" onClick={handleLogout} className="text-xs px-2 py-1 sm:text-sm sm:px-4 sm:py-2">
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-ink/70 hover:text-ink">
                {t("login")}
              </Link>
              <Link to="/register" className="hidden sm:block text-sm text-ink/70 hover:text-ink">
                {t("register")}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/40 py-4 px-6 shadow-lg flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium transition ${
                  isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
          
          {token ? (
            <div className="flex flex-col gap-4 pt-4 border-t border-ink/10">
              <Link to={getDashboardPath()} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-ink/70 hover:text-ink">
                {t("dashboard")}
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-ink/70 hover:text-ink">
                {t("profile")}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-4 border-t border-ink/10">
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-ink/70 hover:text-ink">
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
