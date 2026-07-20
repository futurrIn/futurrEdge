"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const initialProjects = [
  { id: 1, title: "Village Chef Delivery", category: "Websites", img: "/showcase_village_chef.png", tags: ["React", "E-Commerce", "UX/UI"], ratioClass: "imgVillageChef" },
  { id: 2, title: "FitFusion Coaching", category: "Mobile Apps", img: "/showcase_fitfusion.png", tags: ["Mobile App", "Fitness", "Frontend"], ratioClass: "imgFitfusion" },
  { id: 3, title: "Futurr EdTech", category: "Websites", img: "/showcase_futurr.png", tags: ["Next.js", "EdTech", "LMS"], ratioClass: "imgFuturr" },
  { id: 4, title: "MedTrust Portal", category: "Websites", img: "/showcase_medtrust.png", tags: ["Healthcare", "SaaS", "Booking"], ratioClass: "imgMedtrust" },
  { id: 6, title: "Finance Pro", category: "Mobile Apps", img: "/showcase_finance.jpg", tags: ["iOS App", "FinTech", "SaaS"], ratioClass: "imgMobileApp" }
];

const categories = ["All", "Websites", "Mobile Apps"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? initialProjects 
    : initialProjects.filter(p => p.category === filter);

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className={styles.showcaseHeader}>
          <div className={styles.showcaseIcon}></div>
          <h1 className={styles.showcaseHeadline}>
            <span className={styles.showcaseTitleSans}>PROJECT</span>
            <span className={styles.showcaseTitleSerif}>SHOWCASE</span>
          </h1>
          <p className={styles.showcaseDesc}>
            Explore the premium products and AI-powered custom system architectures we have built for businesses globally.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            {categories.map((cat, i) => (
              <button 
                key={i} 
                className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Staggered Grid */}
          <div className={styles.projectsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    layout
                    key={project.id}
                    className={`${styles.projectCard} ${isEven ? styles.cardEven : styles.cardOdd}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`${styles.projectImage} ${styles[project.ratioClass]}`} style={{ backgroundImage: `url(${project.img})` }}></div>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <div className={styles.projectTags}>
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className={styles.projectTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
