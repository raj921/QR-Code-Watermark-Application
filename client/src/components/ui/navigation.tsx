import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QrCode, Github, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card backdrop-blur-xl" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">QR-Code Watermark</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("embed")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Embed
            </button>
            <button 
              onClick={() => scrollToSection("extract")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Extract
            </button>
            <button 
              onClick={() => scrollToSection("tech")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Tech
            </button>
            <motion.button 
              className="bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4 mr-2 inline" />
              GitHub
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--glass-light)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-[var(--glass-border)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("embed")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Embed
              </button>
              <button 
                onClick={() => scrollToSection("extract")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Extract
              </button>
              <button 
                onClick={() => scrollToSection("tech")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Tech
              </button>
              <button className="bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all text-left">
                <Github className="w-4 h-4 mr-2 inline" />
                GitHub
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
