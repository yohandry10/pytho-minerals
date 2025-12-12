import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMapPin, FiPhone, FiMail, FiSend, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { t } = useLanguage();
  const location = useLocation();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  // ✅ Links del navbar (estos van ABAJO, en el footer real)
  const navLinks = [
    { name: t("nav.company"), href: "#company" },
    { name: t("nav.products"), href: "#products" },
    { name: t("nav.operations"), href: "#operations" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.compliance"), href: "#compliance" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Top section */}
      <div className="section-padding relative border-t border-border/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              {t("footer.section")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient-gold">{t("footer.thankyou")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("footer.subtitle")}
            </p>
          </motion.div>

          {/* Contact grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Contact info (tal cual tu original) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-3xl p-6 md:p-8 h-full">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t("footer.contact")}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <FiMapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("footer.address")}</h4>
                      <p className="text-muted-foreground text-sm">
                        Calle Arica 419, entre calles Moray y Brazil
                        <br />
                        Iquitos, Maynas, Loreto, Perú
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <FiPhone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("footer.phone")}</h4>
                      <a
                        href="tel:+51931108139"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        +(51) 93 11 08 139
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <FiMail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("footer.email")}</h4>
                      <a
                        href="mailto:venta@incaphytogreen.com"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        venta@incaphytogreen.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Newsletter (tal cual tu original) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-3xl p-6 md:p-8 h-full">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {t("footer.newsletter")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("footer.newsletter.desc")}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors w-full"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <FiSend className="w-4 h-4" />
                    <span>{t("footer.subscribe")}</span>
                  </button>
                </form>

                {/* Social links */}
                <div className="mt-8">
                  <h4 className="font-semibold text-foreground mb-4">{t("footer.follow")}</h4>
                  <div className="flex gap-4">
                    {[FiLinkedin, FiTwitter, FiInstagram].map((Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                        aria-label="Social link"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Special Mention / Partner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center border-t border-white/10 pt-12"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              {t("footer.specialMention")}
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              {t("footer.partnerText")}
            </p>
            <div className="flex justify-center">
              <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-colors">
                <img
                  src="/partner.jpeg"
                  alt="US Partner"
                  className="h-32 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar (FOOTER real) */}
      <div className="bg-[#050505] border-t border-white/10 py-10 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Inca Phyto"
                className="h-64 w-auto object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              />
            </div>

            {/* ✅ Links del navbar AHORA SÍ en el footer real */}
            <nav className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {navLinks.map((l) => (
                  <button
                    key={l.href}
                    type="button"
                    onClick={() => handleNavClick(l.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </nav>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 text-center md:text-left">
              {/* ✅ 2026 fijo */}
              <p className="text-sm text-muted-foreground">
                © 2026 Inca Phyto Minerals. {t("footer.rights")}
              </p>

              {/* ✅ Dorado moderno + mailto */}
              <a
                href="mailto:yohandrychirinos1@gmail.com"
                className="text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 hover:opacity-90 transition-opacity"
              >
                Desarrollado por Yohandry Chirinos — Software Developer
              </a>

              <div className="flex gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy")}
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
