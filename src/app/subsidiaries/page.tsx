"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Layers, Zap, Smartphone } from "lucide-react";
import Link from "next/link";
import PortidHeroMockup from "@/components/ui/PortidHeroMockup";
import styles from "./page.module.css";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function SubsidiariesPage() {
  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.bgGlow} />
        <div className={styles.container}>
          <div className={styles.header}>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              The Futurr <span className="gradient-text">Ecosystem</span>
            </motion.h1>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explore the innovative products, platforms, and independent brands built and powered by Futurr Edge. Our subsidiaries represent our commitment to creating specialized, industry-leading solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className={styles.gridSection}>
        <div className={styles.container}>


          <motion.div 
            className={styles.featuredBrand}
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={staggerContainer}
          >
            <div className={styles.featuredText}>
              <div className={styles.iconWrapper}><Smartphone size={40} color="var(--accent-cyan)" /></div>
              <h3>Portid.in</h3>
              <p>Turn every interaction into a customer. Create mobile-first brand profile pages for NFC tags to let customers discover your business instantly.</p>
              <a href="https://portid.in" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                Visit Portid.in <ArrowRight size={16} />
              </a>
            </div>
            <div className={styles.featuredVisual}>
              <PortidHeroMockup />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
