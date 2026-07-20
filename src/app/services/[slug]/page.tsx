"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plus, X, Cpu, Zap, Star } from "lucide-react";
import styles from "./page.module.css";

const servicesData: Record<string, {
  titleSans: string;
  titleSerif: string;
  desc: string;
  stats: { value: string; label: string }[];
  features: { title: string; desc: string; icon: any }[];
  faqs: { q: string; a: string }[];
}> = {
  "website-development": {
    titleSans: "WEBSITE",
    titleSerif: "DEVELOPMENT",
    desc: "Custom, high-converting websites built for speed, SEO, and premium brand experience. We build robust systems that convert visitors into loyal clients.",
    stats: [
      { value: "99+", label: "Lighthouse Performance" },
      { value: "40%", label: "Conversion Lift" }
    ],
    features: [
      { title: "Bespoke Design", desc: "No generic templates. Tailored UI/UX designed to capture your unique brand identity.", icon: <Star size={24} /> },
      { title: "Next.js Architecture", desc: "Built with the leading React framework for optimal Server-Side Rendering (SSR) and search-engine visibility.", icon: <Cpu size={24} /> },
      { title: "GEO & SEO First", desc: "Semantic HTML markup optimized for AI answer engine optimizations (SGE/GEO).", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "How long does a website project take?", a: "Typically, a premium website build ranges from 4 to 8 weeks depending on integration complexity." },
      { q: "Do you build on WordPress or Shopify?", a: "We build custom React/Next.js platforms for ultimate performance, but can integrate Shopify for commerce headless backends." }
    ]
  },
  "mobile-app-development": {
    titleSans: "MOBILE APP",
    titleSerif: "DEVELOPMENT",
    desc: "Bespoke iOS and Android mobile applications designed to put your business directly in your customer's pocket.",
    stats: [
      { value: "4.9★", label: "App Store Rating" },
      { value: "2x", label: "Customer Retention" }
    ],
    features: [
      { title: "Native & Cross-Platform", desc: "We utilize React Native and native Swift/Kotlin architectures for maximum speed and smooth navigation.", icon: <Star size={24} /> },
      { title: "Offline Capabilities", desc: "Structured local storage syncing mechanisms so your app remains functional without network.", icon: <Cpu size={24} /> },
      { title: "Push Notification Funnels", desc: "Automated trigger messaging setups to bring users back inside the app loop.", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "Will the app be launched on both iOS and Android stores?", a: "Yes, we handle the entire App Store and Google Play console submission process for you." },
      { q: "How do you handle feature updates?", a: "We design with modular structures allowing quick pushes and minor hotfixes over-the-air." }
    ]
  },
  "ai-automation": {
    titleSans: "AI & WORKFLOW",
    titleSerif: "AUTOMATION",
    desc: "Automated leads qualification, custom AI chat agents, and system integrations that save hours of manual operational work.",
    stats: [
      { value: "30h+", label: "Weekly Hours Saved" },
      { value: "60%", label: "Support Ticket Reduction" }
    ],
    features: [
      { title: "Custom AI Agents", desc: "Trained on your business documentation to solve tickets and capture sales leads 24/7.", icon: <Star size={24} /> },
      { title: "Workflow Bridges", desc: "Integrate Make/Zapier setups connecting forms, CRMs, Slack, and email notifications instantly.", icon: <Cpu size={24} /> },
      { title: "Autonomous Qualifiers", desc: "Qualify leads via phone, SMS or webchat instantly before forwarding to your sales team.", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "Is our business data safe when using AI?", a: "Yes, we implement enterprise API connections with strict data-privacy policies to ensure data is never used to train public models." },
      { q: "Can it integrate with our legacy software?", a: "We build custom integration layers and webhooks for legacy environments lacking standard API options." }
    ]
  },
  "crm-business-systems": {
    titleSans: "CRM & SYSTEMS",
    titleSerif: "INTEGRATION",
    desc: "Custom CRM platforms, ERP pipelines, and data dashboards giving you one unified source of truth for all operational data.",
    stats: [
      { value: "100%", label: "Pipeline Visibility" },
      { value: "3x", label: "Sales Efficiency" }
    ],
    features: [
      { title: "Custom Pipelines", desc: "Drag-and-drop lead columns matching your unique sales conversion sequence perfectly.", icon: <Star size={24} /> },
      { title: "Real-time Metrics", desc: "Interactive dashboards displaying lifetime value (LTV), acquisition costs, and team performances.", icon: <Cpu size={24} /> },
      { title: "Automated Invoicing", desc: "Auto-trigger contract generation, billing reminders, and financial reconciliations.", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "Can we migrate our current data?", a: "Yes, we handle complete data cleaning, mapping, and secure migrations from legacy databases, Salesforce, or spreadsheets." },
      { q: "Do you offer training sessions for our team?", a: "We provide detailed custom screen recordings and live training walkthroughs for your entire operations team." }
    ]
  },
  "lms": {
    titleSans: "LEARNING MANAGEMENT",
    titleSerif: "SYSTEMS",
    desc: "Scalable and engaging e-learning platforms designed for universities, corporate training, and online course creators.",
    stats: [
      { value: "10k+", label: "Concurrent Users" },
      { value: "95%", label: "Course Completion" }
    ],
    features: [
      { title: "Interactive Classrooms", desc: "Built-in video streaming, live chat, and interactive quizzes for immersive learning.", icon: <Star size={24} /> },
      { title: "Progress Tracking", desc: "Advanced dashboards and analytics for administrators and students to monitor progress.", icon: <Cpu size={24} /> },
      { title: "Automated Certification", desc: "Auto-generate certificates and credentials upon successful course completion.", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "Can we integrate existing course material?", a: "Yes, we support SCORM, xAPI, and custom video or document imports from your existing content library." },
      { q: "Does the LMS support subscription models?", a: "Absolutely. We integrate payment gateways for one-time purchases, subscriptions, and tiered access levels." }
    ]
  },
  "e-commerce": {
    titleSans: "E-COMMERCE",
    titleSerif: "PLATFORMS",
    desc: "High-performance online stores built to scale, driving conversions with seamless checkout experiences and robust inventory management.",
    stats: [
      { value: "3x", label: "Sales Conversion" },
      { value: "< 1s", label: "Page Load Time" }
    ],
    features: [
      { title: "Headless Architecture", desc: "Decoupled frontends for lightning-fast browsing and unconstrained UX design.", icon: <Star size={24} /> },
      { title: "Omnichannel Sync", desc: "Real-time inventory sync across web, mobile apps, and physical POS systems.", icon: <Cpu size={24} /> },
      { title: "Frictionless Checkout", desc: "One-click purchasing, apple pay integration, and dynamic cart optimizations.", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "Which platforms do you integrate with?", a: "We build custom storefronts that can connect to Shopify, BigCommerce, WooCommerce, or custom backends via API." },
      { q: "Can you handle high-traffic flash sales?", a: "Yes, our serverless architectures auto-scale to handle massive concurrent traffic spikes without downtime." }
    ]
  },
  "growth-marketing": {
    titleSans: "GROWTH & SEO",
    titleSerif: "STRATEGY",
    desc: "Comprehensive SEO, GEO, and conversion rate optimizations to drive highly qualified leads instead of vanity metrics.",
    stats: [
      { value: "$2M+", label: "Pipeline Generated" },
      { value: "3.5x", label: "Organic Search Growth" }
    ],
    features: [
      { title: "GEO Optimization", desc: "We structure metadata specifically to align with AI search features (SGE, Perplexity, Gemini).", icon: <Star size={24} /> },
      { title: "Topic Clusters", desc: "Strategic content clusters targeting intent-driven search phrases to outrank authority websites.", icon: <Cpu size={24} /> },
      { title: "CRO Audit Logs", desc: "A/B landing page iterations designed to strip friction and multiply call bookings.", icon: <Zap size={24} /> }
    ],
    faqs: [
      { q: "How soon do we see SEO results?", a: "Organic growth is long-term, usually showing tangible index improvements and ranking lifts within 3 to 6 months." },
      { q: "Do you handle paid ads as well?", a: "We run highly targeted Google Search and LinkedIn ads to drive immediate volume while the SEO cluster authority compiles." }
    ]
  }
};

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServicePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const data = servicesData[resolvedParams.slug];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.main}>
      {/* Service Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className={styles.heroLeft}>
          <motion.div 
            className={styles.overline}
            initial="hidden" animate="visible" variants={fadeIn}
          >
            © SERVICES / {resolvedParams.slug.toUpperCase().replace(/-/g, " ")}
          </motion.div>
          <motion.div 
            className={styles.headlineWrapper}
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.h1 className={styles.headline} variants={fadeIn}>
              <span className={styles.titleSans}>{data.titleSans}</span><br/>
              <span className={styles.titleSerif}>{data.titleSerif}</span>
            </motion.h1>
          </motion.div>
          <motion.p 
            className={styles.heroDesc}
            initial="hidden" animate="visible" variants={fadeIn}
          >
            {data.desc}
          </motion.p>
          <motion.div 
            className={styles.heroButtons}
            initial="hidden" animate="visible" variants={fadeIn}
          >
            <Link href="/contact" className={styles.btnPrimary}>
              <span>Book Strategy Consultation</span>
              <span className={styles.btnIconWrapperPrimary}><ArrowRight size={20} /></span>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.heroRight}
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
        >
          <div className={styles.statsColumn}>
            {data.stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>
              <span className={styles.labelIcon}></span>
              <em>Core Features</em>
            </div>
            <h2>Standard of engineering we bring to the project.</h2>
          </div>

          <div className={styles.featuresGrid}>
            {data.features.map((feature, i) => (
              <motion.div 
                key={i} 
                className={styles.featureCard}
                initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ Accordion */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} style={{ textAlign: 'center', alignItems: 'center' }}>
            <div className={styles.label} style={{ justifyContent: 'center' }}>
              <span className={styles.labelIcon}></span>
              <em>Common Questions</em>
            </div>
            <h2>Service Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqList}>
            {data.faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <div 
                  className={styles.faqHeader} 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <h3>{faq.q}</h3>
                  <div className={styles.faqIcon}>
                    {activeFaq === i ? <X size={20} /> : <Plus size={20} />}
                  </div>
                </div>
                {activeFaq === i && (
                  <motion.div 
                    className={styles.faqAnswer}
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
