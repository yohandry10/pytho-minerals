import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CompanyProfile from "@/components/CompanyProfile";
import Products from "@/components/Products";
import Operations from "@/components/Operations";
import ValueServices from "@/components/ValueServices";
import ContractCompliance from "@/components/ContractCompliance";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const IndexContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload images
    const images = [
      "/src/assets/hero-mining.jpg",
      "/src/assets/anthracite-coal.jpg",
      "/src/assets/mining-operations.jpg",
      "/src/assets/shipping-port.jpg",
    ];

    Promise.all(
      images.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
          })
      )
    );
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Hero />
            <CompanyProfile />
            <Products />
            <Operations />
            <ValueServices />
            <ContractCompliance />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
