import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiAnchor, FiDollarSign, FiPackage, FiCalendar, FiCreditCard, FiTrendingUp } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const ContractCompliance = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage();

  const complianceData = [
    {
      category: t("compliance.incoterms"),
      icon: FiAnchor,
      items: [
        { title: t("compliance.fob"), desc: t("compliance.fob.desc") },
        { title: t("compliance.cif"), desc: t("compliance.cif.desc") },
      ],
    },
    {
      category: t("compliance.volume"),
      icon: FiPackage,
      items: [
        { title: t("compliance.panamax"), desc: t("compliance.panamax.desc") },
        { title: t("compliance.breakbulk"), desc: t("compliance.breakbulk.desc") },
      ],
    },
    {
      category: t("compliance.delivery"),
      icon: FiCalendar,
      items: [
        { title: t("compliance.laycan"), desc: t("compliance.laycan.desc") },
        { title: t("compliance.inventory"), desc: t("compliance.inventory.desc") },
      ],
    },
  ];

  const paymentOptions = [
    {
      icon: FiCreditCard,
      title: t("compliance.lc"),
      description: t("compliance.lc.desc"),
    },
    {
      icon: FiDollarSign,
      title: t("compliance.sblc"),
      description: t("compliance.sblc.desc"),
    },
    {
      icon: FiTrendingUp,
      title: t("compliance.pricing"),
      description: t("compliance.pricing.desc"),
    },
  ];

  return (
    <section id="compliance" className="section-padding relative overflow-hidden bg-card/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

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
            {t("compliance.section")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">{t("compliance.title1")}</span>
            <span className="text-gradient-gold">{t("compliance.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("compliance.subtitle")}
          </p>
        </motion.div>

        {/* Compliance grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {complianceData.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {section.category}
                </h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-muted/30">
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("compliance.financial")}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("compliance.financial.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {paymentOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-muted/30 border border-border/30"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {option.title}
                </h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Foundation table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            {t("compliance.foundation")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-4 px-6 font-display text-foreground">{t("compliance.category")}</th>
                  <th className="text-left py-4 px-6 font-display text-foreground">{t("compliance.requirement")}</th>
                  <th className="text-left py-4 px-6 font-display text-foreground">{t("compliance.flexibility")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    category: t("compliance.extraction"),
                    compliance: t("compliance.extraction.req"),
                    flexibility: t("compliance.extraction.flex"),
                  },
                  {
                    category: t("compliance.safety"),
                    compliance: t("compliance.safety.req"),
                    flexibility: t("compliance.safety.flex"),
                  },
                  {
                    category: t("compliance.processing"),
                    compliance: t("compliance.processing.req"),
                    flexibility: t("compliance.processing.flex"),
                  },
                ].map((row, index) => (
                  <motion.tr
                    key={row.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-primary">{row.category}</td>
                    <td className="py-4 px-6 text-muted-foreground">{row.compliance}</td>
                    <td className="py-4 px-6 text-muted-foreground">{row.flexibility}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContractCompliance;
