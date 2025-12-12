import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCheckCircle, FiAward, FiSearch, FiSliders, FiActivity } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const ValueServices = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage();

  const services = [
    {
      icon: FiAward,
      title: t("services.quality"),
      subtitle: t("services.quality.sub"),
      description: t("services.quality.desc"),
    },
    {
      icon: FiSearch,
      title: t("services.inspection"),
      subtitle: t("services.inspection.sub"),
      description: t("services.inspection.desc"),
    },
    {
      icon: FiSliders,
      title: t("services.custom"),
      subtitle: t("services.custom.sub"),
      description: t("services.custom.desc"),
    },
    {
      icon: FiActivity,
      title: t("services.trace"),
      subtitle: t("services.trace.sub"),
      description: t("services.trace.desc"),
    },
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            {t("services.section")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">{t("services.title1")}</span>
            <span className="text-gradient-gold">{t("services.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-8 md:p-10 group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <span className="text-primary font-medium mb-4 block">
                    {service.subtitle}
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why choose us banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
          <div className="absolute inset-0 glass" />
          
          <div className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "ISO", label: t("services.certified") },
                { value: "SGS", label: t("services.verified") },
                { value: "24/7", label: t("services.support") },
                { value: "100%", label: t("services.satisfaction") },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {["SGS Certified", "Bureau Veritas", "ISO 9001", "OSINERGMIN Compliant"].map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30"
            >
              <FiCheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">{cert}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueServices;
