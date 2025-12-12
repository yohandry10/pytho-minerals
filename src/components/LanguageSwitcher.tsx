import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage("en")}
        className={`relative w-10 h-7 rounded-md overflow-hidden border-2 transition-all ${
          language === "en" 
            ? "border-primary shadow-lg" 
            : "border-transparent opacity-60 hover:opacity-100"
        }`}
        title="English"
      >
        {/* UK Flag */}
        <svg viewBox="0 0 60 30" className="w-full h-full">
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
        {language === "en" && (
          <motion.div
            layoutId="activeLang"
            className="absolute inset-0 border-2 border-primary rounded-md"
          />
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage("es")}
        className={`relative w-10 h-7 rounded-md overflow-hidden border-2 transition-all ${
          language === "es" 
            ? "border-primary shadow-lg" 
            : "border-transparent opacity-60 hover:opacity-100"
        }`}
        title="Español"
      >
        {/* Peru Flag */}
        <svg viewBox="0 0 60 40" className="w-full h-full">
          <rect width="20" height="40" fill="#D91023"/>
          <rect x="20" width="20" height="40" fill="#FFFFFF"/>
          <rect x="40" width="20" height="40" fill="#D91023"/>
        </svg>
        {language === "es" && (
          <motion.div
            layoutId="activeLang"
            className="absolute inset-0 border-2 border-primary rounded-md"
          />
        )}
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher;
