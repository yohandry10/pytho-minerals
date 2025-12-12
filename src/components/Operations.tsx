import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { FiMapPin, FiAnchor, FiTruck, FiShield } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import operationsImage from "@/assets/mining-operations.jpg";
import shippingImage from "@/assets/shipping-port.jpg";

const Operations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const locations = [
    {
      name: t("operations.trujillo"),
      region: t("operations.trujillo.region"),
      description: t("operations.trujillo.desc"),
      icon: FiAnchor,
    },
    {
      name: t("operations.oyon"),
      region: t("operations.oyon.region"),
      description: t("operations.oyon.desc"),
      icon: FiMapPin,
    },
  ];

  return (
    <section
      id="operations"
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${operationsImage})` }}
        />
        <div className="absolute inset-0 bg-background/90" />
      </motion.div>

      <div className="relative z-10 section-padding">
        <div className="container mx-auto">
          {/* Section header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              {t("operations.section")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">{t("operations.title1")}</span>
              <span className="text-gradient-gold">{t("operations.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t("operations.subtitle")}
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left - Concessions */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="glass rounded-3xl p-8 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <FiShield className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {t("operations.concessions")}
                    </h3>
                    <p className="text-muted-foreground">{t("operations.rights")}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <location.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {location.name}
                        </h4>
                        <p className="text-sm text-primary mb-1">{location.region}</p>
                        <p className="text-sm text-muted-foreground">
                          {location.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-8 h-48 rounded-2xl bg-muted/20 border border-border/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path
                        d="M100,50 L150,30 L200,60 L250,40 L300,70 L350,50"
                        stroke="hsl(43 74% 49%)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                      />
                      <circle cx="120" cy="80" r="6" fill="hsl(43 74% 49%)" />
                      <circle cx="280" cy="100" r="6" fill="hsl(43 74% 49%)" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground text-sm z-10">{t("operations.map")}</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Logistics */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-7"
            >
              {/* Image card */}
              <div className="relative rounded-3xl overflow-hidden mb-8 group">
                <img
                  src={shippingImage}
                  alt="Export logistics"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {t("operations.network")}
                  </h3>
                  <p className="text-foreground/80">
                    {t("operations.network.desc")}
                  </p>
                </div>
              </div>

              {/* Logistics steps */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    step: "01",
                    title: t("operations.step1"),
                    desc: t("operations.step1.desc"),
                    icon: "⛏️",
                  },
                  {
                    step: "02",
                    title: t("operations.step2"),
                    desc: t("operations.step2.desc"),
                    icon: "🔧",
                  },
                  {
                    step: "03",
                    title: t("operations.step3"),
                    desc: t("operations.step3.desc"),
                    icon: "🚢",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="glass rounded-2xl p-6 text-center group hover-lift"
                  >
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <div className="text-xs text-primary font-semibold mb-2">
                      STEP {item.step}
                    </div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Ports info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-8 flex items-center gap-6 p-6 rounded-2xl bg-muted/20 border border-border/30"
              >
                <FiTruck className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {t("operations.ports")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("operations.ports.desc")}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Operations;
