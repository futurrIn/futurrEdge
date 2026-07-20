"use client";

import { useRef } from "react";
import Link from "next/link";
import MagicBento from "@/components/ui/MagicBento";
import { servicesData } from "@/components/ui/servicesData";
import styles from "./page.module.css";

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <main className={styles.main}>
      <div className={styles.bgGlow} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Engineering <span className="gradient-text">Digital Excellence</span>
          </h1>
          <p className={styles.subtitle}>
            From high-converting web experiences to automated AI systems, we engineer bespoke solutions designed to accelerate your business growth.
          </p>
        </div>

        <div style={{ marginTop: '40px' }}>
          <MagicBento 
            cards={servicesData}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
        </div>
      </div>
    </main>
  );
}
