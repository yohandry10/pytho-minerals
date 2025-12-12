import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage();

  const products = [
    {
      id: "anthracite",
      name: t("products.anthracite"),
      tagline: t("products.anthracite.tag"),
      description: t("products.anthracite.desc"),
      features: [t("products.feature1"), t("products.feature2"), t("products.feature3"), t("products.feature4")],
      image: "/atracita.png",
      accent: "from-primary/20 to-accent/20",
    },
    {
      id: "bituminous",
      name: t("products.bituminous"),
      tagline: t("products.bituminous.tag"),
      description: t("products.bituminous.desc"),
      features: [t("products.feature5"), t("products.feature6"), t("products.feature7"), t("products.feature8")],
      image: "/bituminoso.png",
      accent: "from-accent/20 to-primary/20",
    },
    {
      id: "thermal",
      name: t("products.thermal"),
      tagline: t("products.thermal.tag"),
      description: t("products.thermal.desc"),
      features: [t("products.feature9"), t("products.feature10"), t("products.feature11"), t("products.feature12")],
      image: "/termico.png",
      accent: "from-primary/30 to-transparent",
    },
  ];

  return (
    <section id="products" className="section-padding relative overflow-hidden bg-card/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a855' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
            {t("products.section")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">{t("products.title1")}</span>
            <span className="text-gradient-gold">{t("products.title2")}</span>
            <span className="text-foreground">{t("products.title3")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("products.subtitle")}
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="card-modern h-full flex flex-col overflow-hidden">
                {/* Image */}
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.accent}`} />
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold backdrop-blur-sm">
                      {product.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <FiCheck className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="w-full py-3 rounded-xl border border-border/50 text-foreground/80 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 group/btn">
                  <span className="text-sm font-medium">{t("products.learnMore")}</span>
                  <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Division info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
                {t("products.division")}
              </span>
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                {t("products.expansion")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("products.expansion.text")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "⛏️", label: t("products.extraction") },
                { icon: "🔧", label: t("products.processing") },
                { icon: "🚢", label: t("products.export") },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-muted/30">
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
