import { NavLink, Link } from "react-router-dom";
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl tracking-wide text-ink">
          <img src="/logo.png" alt="GlamBeauty Logo" className="h-12 w-12 object-contain rounded-full shadow-sm border border-gold/10" />
          <span>Glam <span className="gold-text">Beauty</span></span>
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
              {t(link.key)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Language Selector Toggle */}
          <div className="flex items-center gap-1 border-r border-ink/10 pr-3 mr-1 text-xs">
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
              <Link to={getDashboardPath()} className="text-sm text-ink/70 hover:text-ink">
                {t("dashboard")}
              </Link>
              <Link to="/profile" className="text-sm text-ink/70 hover:text-ink">
                {t("profile")}
              </Link>
              <Button size="sm" onClick={handleLogout}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-ink/70 hover:text-ink">
                {t("login")}
              </Link>
              <Link to="/register" className="text-sm text-ink/70 hover:text-ink">
                {t("register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
