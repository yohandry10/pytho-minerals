import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGlobe, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const CompanyProfile = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage();

  const features = [
    {
      icon: FiGlobe,
      title: t("company.feature1"),
      description: t("company.feature1.desc"),
    },
    {
      icon: FiTarget,
      title: t("company.feature2"),
      description: t("company.feature2.desc"),
    },
    {
      icon: FiTrendingUp,
      title: t("company.feature3"),
      description: t("company.feature3.desc"),
    },
    {
      icon: FiUsers,
      title: t("company.feature4"),
      description: t("company.feature4.desc"),
    },
  ];

  return (
    <section id="company" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

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
            {t("company.section")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">{t("company.title1")}</span>
            <span className="text-gradient-gold">{t("company.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("company.subtitle")}
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {t("company.summary")}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t("company.summary.text")}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30">
                    <div className="text-3xl font-display font-bold text-primary">2</div>
                    <div className="text-sm text-muted-foreground">{t("company.divisions")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <div className="text-3xl font-display font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">{t("company.concessions")}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary text-xl">🌿</span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {t("company.agro")}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t("company.agro.desc")}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent text-xl">⛏️</span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {t("company.mining")}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t("company.mining.desc")}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass rounded-xl p-6 flex items-start gap-5 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
