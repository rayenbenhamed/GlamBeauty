import { Instagram } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext.jsx";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-white/40 bg-ink text-pearl">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="GlamBeauty Logo" className="h-10 w-10 object-contain rounded-full bg-white p-0.5 shadow-sm border border-gold/20" />
            <h3 className="font-display text-2xl text-pearl">Glam Beauty Center</h3>
          </div>
          <p className="mt-4 text-sm text-pearl/70">
            {t("footer_desc")}
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold uppercase tracking-widest text-gold">{t("visit")}</h4>
          <p className="mt-4 text-pearl/70">Cité Riadh, Rond point Bon Coin, Kélibia</p>
          <p className="text-pearl/70">{t("hours_tue_sun")}</p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold uppercase tracking-widest text-gold">{t("contact")}</h4>
          <p className="mt-4 flex items-center gap-1.5 text-pearl/70">
            <Instagram size={16} className="text-gold" />
            <a 
              href="https://instagram.com/glam_beauty_center" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gold transition animate-pulse-slow"
            >
              @glam_beauty_center
            </a>
          </p>
          <p className="text-pearl/70">+216 50 479 602</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
