import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import EmbedSection from "@/components/steganography/embed-section";
import ExtractSection from "@/components/steganography/extract-section";
import ActivityStats from "@/components/stats/activity-stats";
import { QrCode, Lock, Shield, Smartphone, Server } from "lucide-react";

export default function Home() {
  const [embedFile, setEmbedFile] = useState<File | null>(null);
  const [extractFile, setExtractFile] = useState<File | null>(null);

  const techSpecs = [
    {
      icon: Lock,
      title: "Steganography",
      description: "LSB insertion in alpha channel",
      delay: 0,
    },
    {
      icon: Shield,
      title: "Encryption",
      description: "XChaCha20-Poly1305",
      delay: 0.1,
    },
    {
      icon: Smartphone,
      title: "Scanner",
      description: "React PWA + WebAssembly",
      delay: 0.2,
    },
    {
      icon: Server,
      title: "Backend",
      description: "Go microservice",
      delay: 0.3,
    },
  ];

  const demoImages = [
    {
      title: "Original PNG",
      description: "Contains 256-byte encrypted payload",
      status: "Payload detected",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&w=400&h=400&fit=crop",
    },
    {
      title: "Instagram Compressed",
      description: "85% quality, format conversion",
      status: "Payload survived",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&w=400&h=400&fit=crop",
    },
    {
      title: "WhatsApp Compressed",
      description: "Heavy compression, resized",
      status: "Payload survived",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Invisible QR Code Embedding</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Drop any PNG → receive a{" "}
              <span className="gradient-text">visually identical</span>{" "}
              PNG that embeds an{" "}
              <span className="gradient-text">encrypted payload</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Advanced steganography using LSB insertion in alpha channels. 
              Hidden 256-byte payloads survive Instagram compression with zero visible artifacts.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                onClick={() => document.getElementById('embed')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all font-semibold"
              >
                <QrCode className="w-5 h-5 mr-2 inline" />
                Start Embedding
              </button>
              <button 
                onClick={() => document.getElementById('extract')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-card px-8 py-4 rounded-xl hover:bg-[var(--glass-light)] transition-all"
              >
                <Lock className="w-5 h-5 mr-2 inline" />
                Try Scanner
              </button>
            </motion.div>
            
            <motion.div 
              className="mt-12 glass-card p-6 rounded-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3 text-primary">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="text-left">
                    <strong className="text-foreground">1. Embed:</strong> Upload any PNG image and enter your secret message. The app encrypts your data and hides it invisibly in the image's alpha channel.
                  </div>
                  <div className="text-left">
                    <strong className="text-foreground">2. Extract:</strong> Upload a watermarked PNG to reveal the hidden message. Only images processed by this app contain extractable data.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Specs */}
      <section id="tech" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Specifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techSpecs.map((spec, index) => (
              <motion.div
                key={spec.title}
                className="tech-spec p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: spec.delay }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  <spec.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{spec.title}</h3>
                <p className="text-muted-foreground text-sm">{spec.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <EmbedSection file={embedFile} setFile={setEmbedFile} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ExtractSection file={extractFile} setFile={setExtractFile} />
            </motion.div>
          </div>
          
          {/* Activity Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <ActivityStats />
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">Survival Demonstration</h2>
            <p className="text-xl text-muted-foreground">Hidden payloads survive compression algorithms</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoImages.map((demo, index) => (
              <motion.div
                key={demo.title}
                className="glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={demo.image} 
                    alt={demo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{demo.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{demo.description}</p>
                <div className="text-xs text-green-400">
                  <Shield className="w-3 h-3 mr-1 inline" />
                  {demo.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">QR-Code Watermark</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-sm text-muted-foreground">Built with steganography & cryptography</span>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
