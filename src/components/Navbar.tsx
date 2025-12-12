import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.company"), href: "#company" },
    { name: t("nav.products"), href: "#products" },
    { name: t("nav.operations"), href: "#operations" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.compliance"), href: "#compliance" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Solo para el mobile menu: ESC + bloquear scroll mientras está abierto
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: backdropBlur,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-background border-b border-border/20"
        style={{ opacity: bgOpacity }}
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-48">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div className="relative h-44" whileHover={{ scale: 1.05 }}>
              <img src="/logo.png" alt="Inca Phyto" className="w-auto h-full object-contain" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors animated-underline"
              >
                {link.name}
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsOpen((v) => !v)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/30 bg-background/40 backdrop-blur-md text-foreground shadow-sm transition hover:bg-background/60 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <FiX className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <FiMenu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[60] lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* ✅ Backdrop: casi sólido para NO dejar que el hero confunda la lectura */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85"
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 0 },
              }}
              transition={{ duration: 0.18 }}
            />

            {/* ✅ Drawer: 100% sólido (nada de /90) */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-[100dvh] w-[88vw] max-w-sm overflow-hidden rounded-l-3xl border-l border-white/10 bg-zinc-950 shadow-2xl"
              variants={{
                open: {
                  x: 0,
                  transition: { type: "spring", stiffness: 260, damping: 28 },
                },
                closed: {
                  x: "100%",
                  transition: { duration: 0.22, ease: "easeInOut" },
                },
              }}
            >
              {/* Sutil “sheen” interno (no transparente al hero, porque el panel es sólido) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
                <div className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
                <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="relative flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Inca Phyto" className="h-10 w-auto object-contain" />
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-white/95">Inca Phyto</p>
                      <p className="text-xs text-white/55">Navigation</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-white transition hover:bg-white/12 active:scale-95"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                {/* Language */}
                <div className="px-6 pt-5">
                  <div className="rounded-2xl border border-white/12 bg-white/8 p-3">
                    <LanguageSwitcher />
                  </div>
                </div>

                {/* Links */}
                <div className="mt-6 flex-1 overflow-y-auto px-4 pb-8">
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.name}
                        onClick={() => handleNavClick(link.href)}
                        className="group flex w-full items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-left text-lg font-semibold text-white/95 transition hover:border-white/18 hover:bg-white/12"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 18 }}
                        transition={{
                          delay: 0.06 + index * 0.05,
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/12 text-xs font-bold text-white/75">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{link.name}</span>
                        </span>
                        <span className="text-white/45 transition group-hover:text-white/75">→</span>
                      </motion.button>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 px-6 py-5">
                  <p className="text-xs text-white/55">© {new Date().getFullYear()} Inca Phyto</p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
