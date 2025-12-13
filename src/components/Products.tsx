import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const allProducts = [
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
      id: "copper",
      name: t("products.copper"),
      tagline: t("products.copper.tag"),
      description: t("products.copper.desc"),
      features: [t("products.feature5"), t("products.feature6"), t("products.feature7"), t("products.feature8")],
      image: "/cobre.jpg",
      accent: "from-accent/20 to-primary/20",
    },
    {
      id: "zinc",
      name: t("products.zinc"),
      tagline: t("products.zinc.tag"),
      description: t("products.zinc.desc"),
      features: [t("products.feature9"), t("products.feature10"), t("products.feature7"), t("products.feature12")],
      image: "/zinc.webp",
      accent: "from-primary/30 to-transparent",
    },
    {
      id: "lead",
      name: t("products.lead"),
      tagline: t("products.lead.tag"),
      description: t("products.lead.desc"),
      features: [t("products.feature11"), t("products.feature6"), t("products.feature8"), t("products.feature12")],
      image: "/plomo.webp",
      accent: "from-accent/30 to-transparent",
    },
    // Granulometrías de Antracita
    {
      id: "anthracite-size1",
      name: t("products.anthracite.size1"),
      tagline: "1½'' - 3''",
      description: t("products.anthracite.desc"),
      features: [t("products.feature1"), t("products.feature7"), t("products.feature8"), t("products.feature12")],
      image: "/atracita.png",
      accent: "from-primary/20 to-accent/20",
    },
    {
      id: "anthracite-size2",
      name: t("products.anthracite.size2"),
      tagline: "1/2 - 1½''",
      description: t("products.anthracite.desc"),
      features: [t("products.feature2"), t("products.feature7"), t("products.feature8"), t("products.feature12")],
      image: "/bituminoso.png",
      accent: "from-accent/20 to-primary/20",
    },
    {
      id: "anthracite-size3",
      name: t("products.anthracite.size3"),
      tagline: "1/8 - ½''",
      description: t("products.anthracite.desc"),
      features: [t("products.feature3"), t("products.feature7"), t("products.feature8"), t("products.feature12")],
      image: "/triturado.jpg",
      accent: "from-primary/30 to-transparent",
    },
    {
      id: "anthracite-size4",
      name: t("products.anthracite.size4"),
      tagline: "0 x 1/8''",
      description: t("products.anthracite.desc"),
      features: [t("products.feature4"), t("products.feature7"), t("products.feature8"), t("products.feature12")],
      image: "/triturado2.jpg",
      accent: "from-accent/30 to-transparent",
    },
  ];

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet: 2 items
      } else {
        setItemsPerPage(4); // Desktop: 4 items
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= allProducts.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? allProducts.length - 1 : prevIndex - 1;
    });
  };

  // Get visible products based on current index and items per page
  const getVisibleProducts = () => {
    const products = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % allProducts.length;
      products.push(allProducts[index]);
    }
    return products;
  };

  const currentProducts = getVisibleProducts();

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

        {/* Products Gallery with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-8 sm:-left-10 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center shadow-lg"
            aria-label="Previous products"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-8 sm:-right-10 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center shadow-lg"
            aria-label="Next products"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Products Carousel */}
          <div className="overflow-hidden">
            <div
              className={`grid gap-8 transition-all duration-500 ease-in-out ${
                itemsPerPage === 1
                  ? 'grid-cols-1'
                  : itemsPerPage === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-4'
              }`}
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="card-modern h-full flex flex-col overflow-hidden">
                    {/* Image */}
                    <div className="relative h-56 md:h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
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
                      <h3 className="font-display text-xl md:text-lg font-bold text-foreground mb-3">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <FiCheck className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {allProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          {/* Current Product Counter - Only visible on mobile */}
          <div className="flex md:hidden justify-center mt-4">
            <span className="text-muted-foreground text-sm">
              {currentIndex + 1} / {allProducts.length}
            </span>
          </div>
        </div>

        {/* Division info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
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
