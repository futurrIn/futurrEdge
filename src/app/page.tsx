"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from "framer-motion";
import styles from "./page.module.css";
import { ArrowRight, Code, Smartphone, Bot, BarChart3, Paintbrush, TrendingUp, Plus, X, Play, CheckCircle2, Users, Layers, Cpu, Award, BookOpen, ShoppingCart } from "lucide-react";
import HeroDashboard from "../components/HeroDashboard";
import SplashCursor from "../components/SplashCursor";

/* ────────────────────────────────────────────────────────────
   CINEMATIC ANIMATION SYSTEM
──────────────────────────────────────────────────────────── */

// Easing curve — cinematic deceleration
const EASE = [0.76, 0, 0.24, 1] as const;
const SPRING_SOFT = { type: "spring" as const, stiffness: 55, damping: 18, mass: 1 };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 180, damping: 22 };

// Curtain halves (top / bottom)
const curtainTop = {
  initial: { y: "0%" },
  exit: {
    y: "-100%",
    transition: { duration: 0.9, ease: EASE }
  }
};
const curtainBottom = {
  initial: { y: "0%" },
  exit: {
    y: "100%",
    transition: { duration: 0.9, ease: EASE }
  }
};

// Globe
const globeAnim = {
  initial: { opacity: 0, scale: 0.55, filter: "blur(24px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, delay: 0.3, ease: EASE }
  }
};

// Badge overline
const badgeAnim = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.7, ease: EASE }
  }
};

// Word-by-word headline reveal (clip from bottom)
const wordReveal = (i: number) => ({
  initial: { y: "110%", opacity: 0 },
  animate: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, delay: 0.9 + i * 0.055, ease: EASE }
  }
});

// Subtext
const subtextAnim = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 1.55, ease: EASE }
  }
};

// Buttons — each pops in with spring
const btnAnim = (i: number) => ({
  initial: { opacity: 0, scale: 0.82, y: 16 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...SPRING_SNAPPY, delay: 1.7 + i * 0.12 }
  }
});

// Stat items
const statAnim = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 1.9 + i * 0.1, ease: EASE }
  }
});

// Dashboard: flies in from right with slight rotation
const dashboardAnim = {
  initial: { opacity: 0, x: 80, rotateY: 8, scale: 0.94 },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { ...SPRING_SOFT, delay: 0.5 }
  }
};

// Legacy
const entry3d = {
  hidden: { opacity: 0, rotateX: 12, y: 40 },
  visible: {
    opacity: 1, rotateX: 0, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// Headline text split into words
const HEADLINE_WORDS = [
  "Crafting,", "Exceptional", "Digital", "Experiences."
];
// No italic words
const ITALIC_WORDS = new Set<number>();

export default function Home() {
  const [expandedService, setExpandedService] = useState<number>(0);
  const [curtainDone, setCurtainDone] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const autoSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: autoSectionRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const xLine1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacityAuto = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const yButton = useTransform(scrollYProgress, [0, 1], [60, -30]);


  // Fire curtain exit after 100ms so it plays on first render
  useEffect(() => {
    const t = setTimeout(() => setCurtainDone(true), 80);
    return () => clearTimeout(t);
  }, []);

  const servicesList = [
    { num: "001.", title: "Website Development", icon: <Code size={40} />, desc: "Custom, high-converting websites built for speed, SEO, and premium brand experience.", features: ["Performance at scale", "Improved Customer retention", "Data-Driven insights"] },
    { num: "002.", title: "AI Automation", icon: <Bot size={40} />, desc: "AI agents, chatbots, and workflow automation that save hours and never miss a lead.", features: ["24/7 Availability", "Automated Workflows", "Reduced Operational Costs"] },
    { num: "003.", title: "Mobile App Development", icon: <Smartphone size={40} />, desc: "Native and cross-platform apps that put your business in your customers' pockets.", features: ["Native Performance", "Intuitive UX/UI", "Offline Capabilities"] },
    { num: "004.", title: "Growth Marketing", icon: <TrendingUp size={40} />, desc: "SEO, paid ads, and AI search optimization that bring qualified traffic, not just clicks.", features: ["Targeted Campaigns", "ROI Tracking", "Conversion Optimization"] },
    { num: "005.", title: "Learning Management (LMS)", icon: <BookOpen size={40} />, desc: "Scalable and engaging e-learning platforms for universities and corporate training.", features: ["Interactive Dashboards", "Progress Tracking", "Seamless Video Delivery"] },
    { num: "006.", title: "E-Commerce", icon: <ShoppingCart size={40} />, desc: "High-performance online stores built to scale and drive conversions seamlessly.", features: ["Secure Checkouts", "Inventory Syncing", "Conversion Rate Optimization"] }
  ];

  return (
    <div className={styles.main}>

      {/* ── CINEMATIC CURTAIN INTRO ── */}
      <AnimatePresence>
        {!curtainDone && (
          <>
            {/* Top half */}
            <motion.div
              key="curtain-top"
              className={styles.curtainTop}
              variants={curtainTop}
              initial="initial"
              exit="exit"
            />
            {/* Bottom half */}
            <motion.div
              key="curtain-bottom"
              className={styles.curtainBottom}
              variants={curtainBottom}
              initial="initial"
              exit="exit"
            />
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className={styles.hero}>



        <div className={styles.heroContainer}>

          {/* ── LEFT COLUMN ── */}
          <div className={styles.heroLeft}>

            {/* Badge */}
            <motion.div
              className={styles.overline}
              variants={badgeAnim}
              initial="initial"
              animate="animate"
            >
              Next-Gen Web &amp; AI Engineering
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <div className={styles.headlineWrapper}>
              <h1 className={styles.headline}>
                {HEADLINE_WORDS.map((word, i) => (
                  <span key={i} className={styles.wordClip}>
                    <motion.span
                      className={ITALIC_WORDS.has(i) ? styles.stylishWordAnim : styles.normalWordAnim}
                      variants={wordReveal(i)}
                      initial="initial"
                      animate="animate"
                    >
                      {word}{" "}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            {/* Subtext */}
            <motion.p
              className={styles.heroSubtext}
              variants={subtextAnim}
              initial="initial"
              animate="animate"
            >
              We design, build, and automate digital products that grow businesses &mdash; from conversion-focused websites to AI-powered workflows.
            </motion.p>

            {/* Buttons */}
            <div className={styles.heroButtons}>
              <motion.div variants={btnAnim(0)} initial="initial" animate="animate">
                <Link href="/contact" className={styles.btnPrimary}>
                  <span>Get Your Quote</span>
                  <span className={styles.btnIconWrapperPrimary}><ArrowRight size={18} /></span>
                </Link>
              </motion.div>
              <motion.div variants={btnAnim(1)} initial="initial" animate="animate">
                <a href="https://www.portid.in/create-profile" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                  <span>Build Your Free Portfolio</span>
                  <span className={styles.btnIconWrapperSecondary}><ArrowRight size={18} /></span>
                </a>
              </motion.div>
            </div>

            {/* Stats */}
            <div className={styles.heroStats}>
              {[
                { num: "100+", label: "Projects Delivered" },
                { num: "50+",  label: "Happy Clients" },
                { num: "99%",  label: "Client Satisfaction" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className={styles.heroStatItem}
                  variants={statAnim(i)}
                  initial="initial"
                  animate="animate"
                >
                  <span className={styles.heroStatNumber}>{s.num}</span>
                  <span className={styles.heroStatLabel}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Dashboard ── */}
          <div className={styles.heroRight}>
            {/* Globe + glow */}
            <motion.div
              className={`${styles.heroBackground} animate-glow`}
              variants={globeAnim}
              initial="initial"
              animate="animate"
            >
              <div className={styles.sphereContainer}>
                <div className={styles.sphere}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={`m-${i}`}
                      className={styles.meridian}
                      style={{ transform: `translate3d(-50%, -50%, 0) rotateY(${i * 15}deg)` }}
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i + 1) * (180 / 9);
                    const rad = (angle * Math.PI) / 180;
                    const z = 270 * Math.cos(rad);
                    const r = 270 * Math.sin(rad);
                    return (
                      <div
                        key={`p-${i}`}
                        className={styles.parallel}
                        style={{
                          width: `${r * 2}px`,
                          height: `${r * 2}px`,
                          transform: `translate3d(-50%, -50%, ${z}px) rotateX(90deg)`
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={dashboardAnim}
              initial="initial"
              animate="animate"
              style={{ perspective: 800, zIndex: 10, position: 'relative' }}
            >
              <div className={styles.dashboardScaleWrapper}>
                <HeroDashboard />
              </div>
            </motion.div>
          </div>

        </div>
      </section>



      {/* Intelligent Automation Promo Section */}
      <section 
        ref={autoSectionRef}
        className={styles.automationSection}
      >
        <div className={styles.heroBackground} style={{ zIndex: 0 }}></div>
        <SplashCursor />
        {/* Content Container with Scroll Reveal */}
        <motion.div 
          className={styles.automationContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
        >
          <div className={styles.automationContent}>
            <motion.h2 
              className={styles.automationHeadline}
              variants={{
                hidden: { opacity: 0, y: 70, scale: 0.96, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
            >
              <span style={{ display: "block" }}>
                Transform Your Business with
              </span>
              <span className={styles.glowingText} style={{ display: "block" }}>
                Intelligent Automation
              </span>
            </motion.h2>

            <motion.div
              className={styles.exploreButtonWrapper}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.94, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.0,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/services" className={styles.explorePill}>
                <span>Explore the world of " AI "</span>
                <span className={styles.pillArrow}>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {Array(5).fill(null).map((_, i) => (
              <span key={`a-${i}`} className={styles.marqueeItem}>
                Design <span className={styles.starSeparator}>✦</span> Create <span className={styles.starSeparator}>✦</span> Empower <span className={styles.starSeparator}>✦</span> Build <span className={styles.starSeparator}>✦</span>
              </span>
            ))}
          </div>
          <div className={styles.marqueeContent}>
            {Array(5).fill(null).map((_, i) => (
              <span key={`b-${i}`} className={styles.marqueeItem}>
                Design <span className={styles.starSeparator}>✦</span> Create <span className={styles.starSeparator}>✦</span> Empower <span className={styles.starSeparator}>✦</span> Build <span className={styles.starSeparator}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services Accordion Section */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <motion.div 
            className={styles.servicesTitleWrap}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.2 }} 
            variants={staggerContainer}
          >
            <motion.div className={styles.servicesLabel} variants={fadeIn}>
              <span className={styles.labelIcon}></span>
              <em>Our services</em>
            </motion.div>
            <motion.h2 className={styles.servicesHeadline} variants={fadeIn}>
              <span className={styles.titleSerif}>Our Creative Services</span> <strong>That Deliver</strong><br/>
              <strong>Innovation,</strong> <span className={styles.textGray}>And Measurable</span><br/>
              <span className={styles.textGray}>Results</span>
            </motion.h2>
          </motion.div>
          <motion.div 
            className={styles.servicesStats} 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.avatarGroup}>
              <div className={styles.avatar} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80')" }}></div>
              <div className={styles.avatar} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80')" }}></div>
              <div className={styles.avatar} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80')" }}></div>
              <div className={styles.avatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', background: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>+</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>100+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Real Result Clients</div>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className={styles.servicesList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {servicesList.map((service, idx) => (
            <motion.div 
              key={idx} 
              className={styles.serviceItem}
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              {expandedService === idx ? (
                <motion.div 
                  className={styles.serviceExpanded}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className={styles.serviceExpandedIcon}>
                    {service.icon}
                  </div>
                  <div className={styles.serviceExpandedContent}>
                    <div className={styles.serviceExpandedTop}>
                      <div>
                        <span style={{ color: '#ff4757', fontWeight: 700, fontSize: '0.9rem' }}>{service.num}</span>
                        <div className={styles.serviceExpandedTitle}>{service.title}</div>
                      </div>
                      <button className={styles.closeBtn} onClick={() => setExpandedService(-1)}>
                        <X size={20} />
                      </button>
                    </div>
                    <div className={styles.serviceExpandedDetails}>
                      <div className={styles.serviceCol}>
                        <h4>Define Identity:</h4>
                        <p>{service.desc}</p>
                      </div>
                      <div className={styles.serviceCol}>
                        <h4>Includes:</h4>
                        <ul className={styles.serviceChecklist}>
                          {service.features.map((feature, i) => (
                            <li key={i}>
                              <CheckCircle2 size={16} className={styles.checkIcon} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Link href="/services" className={styles.btnPrimary} style={{ background: '#111', color: '#fff', width: 'fit-content' }}>
                      <span>View Details</span>
                      <span className={styles.btnIconWrapperPrimary} style={{ background: 'var(--accent-purple)' }}><ArrowRight size={18} /></span>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className={styles.serviceHeader} onClick={() => setExpandedService(idx)}>
                  <div className={styles.serviceNum}>{service.num}</div>
                  <div className={styles.serviceTitle}>{service.title}</div>
                  <div className={styles.serviceIcon}><Plus size={20} /></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <motion.div 
            className={styles.whyHeader}
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={fadeIn}
          >
            <div className={styles.servicesLabel} style={{ justifyContent: 'center', marginBottom: '32px' }}>
              <span className={styles.labelIcon}></span>
              <em>Why choose us</em>
            </div>
            <h2 className={styles.whyHeadline}>
              <span className={styles.titleSerif}>Transforming Modern Business Ideas Into</span> <strong>Innovative Global Solutions That Inspire</strong> <span className={styles.textGray}>Long-Term Success Through Business Collaboration.</span>
            </h2>
          </motion.div>

          <motion.div 
            className={styles.statsGrid}
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={staggerContainer}
          >
            {[
              { label: "Custom Architecture", highlight: "100%", desc: "No generic templates. Every line of code is custom-written to fit your business goals and scale smoothly.", icon: <Cpu className={styles.statIcon} /> },
              { label: "Modern Tech Stack", highlight: "Next.js", desc: "Leveraging cutting-edge frameworks like Next.js, React, and robust cloud systems for maximum velocity.", icon: <Layers className={styles.statIcon} /> },
              { label: "Direct Collaboration", highlight: "Direct", desc: "Skip the agency bureaucracy. Work directly with the senior engineers and designers building your product.", icon: <Users className={styles.statIcon} /> },
              { label: "Transparent Sprints", highlight: "Agile", desc: "Stay fully in the loop with active Slack updates, weekly demo deployments, and clear roadmap updates.", icon: <Award className={styles.statIcon} /> },
            ].map((stat, i) => (
              <motion.div key={i} className={styles.statCard} variants={fadeIn}>
                <div className={styles.statIconWrapper}>{stat.icon}</div>
                <h4>{stat.label}</h4>
                <h2>{stat.highlight}</h2>
                <p>{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className={styles.videoBanner}
            initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.playBtnWrap}>
              <button className={styles.playBtn}>
                <Play fill="currentColor" size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className={styles.showcaseSection}>
        <motion.div 
          className={styles.showcaseHeader}
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={staggerContainer}
        >
          <motion.div className={styles.showcaseIcon} variants={fadeIn}></motion.div>
          <motion.h2 className={styles.showcaseHeadline} variants={fadeIn}>
            <span className={styles.showcaseTitleSans}>PROJECT</span>
            <span className={styles.showcaseTitleSerif}>SHOWCASE</span>
          </motion.h2>
        </motion.div>

        <div className={styles.showcaseGrid}>
          {/* Left Column */}
          <div className={styles.showcaseLeft}>
            <motion.div 
              className={styles.showcaseLeftInfo}
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={fadeIn}
            >
              <p className={styles.showcaseDesc}>
                Explore some of the high-performance platforms, automated portals, and custom user experiences we have built and deployed.
              </p>
              <Link href="/portfolio" className={styles.exploreMore}>
                Explore More <ArrowRight size={16} style={{ transform: 'rotate(-45deg)' }} />
              </Link>
            </motion.div>

            {/* Project 1: Village Chef (Always Visible) */}
            <motion.div 
              className={styles.projectCard}
              initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`${styles.projectImage} ${styles.imgVillageChef}`} style={{ backgroundImage: `url('/showcase_village_chef.png')` }}></div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>Village Chef</h3>
                <div className={styles.projectTags}>
                  {["React", "E-Commerce", "UX/UI"].map((tag, idx) => (
                    <span key={idx} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {showAllProjects && (
              <>
                {/* Project 3: Futurr EdTech (Toggled) */}
                <motion.div 
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`${styles.projectImage} ${styles.imgFuturr}`} style={{ backgroundImage: `url('/showcase_futurr.png')` }}></div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>Futurr EdTech</h3>
                    <div className={styles.projectTags}>
                      {["Next.js", "EdTech", "LMS"].map((tag, idx) => (
                        <span key={idx} className={styles.projectTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className={styles.showcaseRight}>
            {/* Project 2: FitFusion (Always Visible) */}
            <motion.div 
              className={styles.projectCard}
              initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`${styles.projectImage} ${styles.imgFitfusion}`} style={{ backgroundImage: `url('/showcase_fitfusion.png')` }}></div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>FitFusion</h3>
                <div className={styles.projectTags}>
                  {["Mobile App", "Fitness", "Frontend"].map((tag, idx) => (
                    <span key={idx} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {showAllProjects && (
              <>
                {/* Project 4: MedTrust Portal (Toggled) */}
                <motion.div 
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`${styles.projectImage} ${styles.imgMedtrust}`} style={{ backgroundImage: `url('/showcase_medtrust.png')` }}></div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>MedTrust Portal</h3>
                    <div className={styles.projectTags}>
                      {["Healthcare", "SaaS", "Booking"].map((tag, idx) => (
                        <span key={idx} className={styles.projectTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Project 6: Finance Pro (iPhone Emulator - Toggled) */}
                <motion.div 
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className={styles.mobileShowcaseWrapper}>
                    <div className={styles.phoneEmulator}>
                      <div className={styles.phoneNotch}></div>
                      <div className={styles.phoneScreen} style={{ backgroundImage: `url('/showcase_finance.jpg')` }}></div>
                      <div className={styles.phoneHomeIndicator}></div>
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>Finance Pro</h3>
                    <div className={styles.projectTags}>
                      {["iOS App", "FinTech", "SaaS"].map((tag, idx) => (
                        <span key={idx} className={styles.projectTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        <div className={styles.toggleWrapper}>
          <button 
            className={styles.toggleBtn} 
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            {showAllProjects ? "Show Less" : "Show More"}
          </button>
        </div>
      </section>

      {/* Testimonials Section - Orixo Style */}
      <section className={styles.testimonialsSection}>
        <motion.div 
          className={styles.sectionHeader}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={fadeIn}
        >
          <div className={styles.servicesLabel} style={{ justifyContent: 'center', marginBottom: '16px' }}>
            <span className={styles.labelIcon}></span>
            <em>Client Reviews</em>
          </div>
          <h2 className={styles.showcaseHeadline}>
            <span className={styles.showcaseTitleSans}>WHAT THEY</span>
            <span className={styles.showcaseTitleSerif}>SAY</span>
          </h2>
        </motion.div>
        
        <motion.div 
          className={styles.testimonialsGrid}
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={staggerContainer}
        >
          {[
            {
              quote: "I am Abin from Delhi, and I had a positive experience with Futurr Innovations. Their team was professional, responsive, and supportive throughout the project. They communicated clearly, addressed concerns promptly, and delivered quality work. I appreciate their dedication and commitment to customer satisfaction.",
              author: "Abin",
              role: "Delhi",
              isDark: false
            },
            {
              quote: "The team is very supportive and knowledgeable, especially in robotics, AI, and technology-related projects. Their workshops and training sessions are practical, interactive, and useful for students.",
              author: "Lolitha Unnikrishnan",
              role: "Student / Tech Enthusiast",
              isDark: true
            },
            {
              quote: "Great experience with Futurr Innovations. Very supportive team and good service, especially Manoj Sir ❤️👍🏻.",
              author: "Jithin V Ramanadh",
              role: "Client",
              isDark: false
            },
            {
              quote: "Really impressed with their creativity and dedication. Training sessions are excellent.",
              author: "Šüĺfî",
              role: "Client",
              isDark: true
            }
          ].map((t, i) => (
            <motion.div 
              key={i} 
              className={`${styles.testimonialCard} ${t.isDark ? styles.cardDark : styles.cardLight}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div>
                <div className={styles.quoteIconWrapper} style={{ background: t.isDark ? 'var(--accent-purple)' : 'var(--accent-cyan)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1, marginTop: '8px' }}>“</span>
                </div>
                <p className={styles.quoteText}>
                  "{t.quote}"
                </p>
              </div>
              <div>
                <div className={styles.testimonialDivider}></div>
                <div className={styles.testimonialFooter}>
                  <div className={styles.authorInfo}>
                    <h4>{t.author}</h4>
                    <p>{t.role}</p>
                  </div>
                  <div className={styles.stars}>
                    {Array(5).fill(null).map((_, idx) => (
                      <span key={idx} style={{ color: t.isDark ? 'var(--accent-cyan)' : 'var(--accent-purple)' }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
