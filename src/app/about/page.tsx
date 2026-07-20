"use client";

import { motion } from "framer-motion";
import { Star, Award, Shield, Send } from "lucide-react";
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

export default function AboutPage() {
  return (
    <div className={styles.main}>
      {/* About Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.overline}>
              © ABOUT US
            </div>
            <h1 className={styles.headline}>
              If you came all the <span className={styles.titleSerif}>way to this page...</span>
            </h1>
            <p className={styles.heroDesc} style={{ maxWidth: "800px" }}>
              You're not looking for a typical agency that hides behind complex jargon or passes your project to junior developers. You are looking for partners who care about your pipeline as much as you do. We created Futurr Edge to bridge the gap between creative visual designs and high-performing AI system integrations. No middle management, no outsourced pipelines. Just premium code, custom automations, and direct results.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyLeft}>
            <div className={styles.aboutImage1}></div>
          </div>

          <div className={styles.storyRight}>
            <div className={styles.label}>
              <span className={styles.labelIcon}></span>
              <em>Our Philosophy</em>
            </div>
            <h2>We believe in AI-first system developments.</h2>
            <p className={styles.storyText}>
              Our process starts with design. We design mockups that wow your audience instantly. But visual beauty is only half the battle. Behind a premium interface sits custom AI automations connecting your sales pipeline, client intake, and data flows automatically.
            </p>
            <p className={styles.storyText}>
              Whether you are looking to deploy high-speed web apps, automate legacy customer support channels, or boost your GEO authority, we handle everything from design to production.
            </p>
          </div>
        </div>
      </section>


      {/* The Founders Section */}
      <section className={styles.foundersSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>
              <span className={styles.labelIcon}></span>
              <em>The Creators</em>
            </div>
            <h2>Meet The Founders</h2>
          </div>

          <div className={styles.foundersGrid}>
            {/* Founder 1 */}
            <motion.div
              className={styles.founderCard}
              initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.founderImage} style={{ backgroundImage: `url('/founder_albin.jpg')` }} />
              <div className={styles.founderInfo}>
                <h3>Albin Gheevarghese</h3>
                <p className={styles.founderRole}>Founder</p>
                <p className={styles.founderBio}>
                  Technology entrepreneur dedicated to building impactful businesses at the intersection of AI, digital transformation, and emerging technologies—creating solutions that shape the future of business and education.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/ft.albin_?igsh=czJvdHpia3FqNDJs&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/share/19NRK9ehsm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/albin-gheevarghese-35694b333?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://wa.me/918137028900" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Founder 2 */}
            <motion.div
              className={styles.founderCard}
              initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.founderImage} style={{ backgroundImage: `url('/founder_manoj.png')` }} />
              <div className={styles.founderInfo}>
                <h3>Manoj Manikandan</h3>
                <p className={styles.founderRole}>Co-Founder</p>
                <p className={styles.founderBio}>
                  Electronics engineer and robotics/AI expert dedicated to building intelligent humanoid systems, design innovations, and bridging technology with education to shape tomorrow.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/manoj_manikandann?igsh=MTMxZHRkanFsaDVyMw==" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className={styles.socialIcon} aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/manoj-m-198a8a1b9?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://wa.me/916238852039" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars of Futurr Edge */}
      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.label}>
              <span className={styles.labelIcon}></span>
              <em>Bespoke Standard</em>
            </div>
            <h2>The 3 Pillars of Futurr Edge</h2>
          </div>

          <div className={styles.pillarsGrid}>
            {[
              { title: "Design-First UI/UX", icon: <Star size={32} />, desc: "We design unique visual layout assets customized completely for your brand identity.", isDark: false },
              { title: "AI Integration Ecosystems", icon: <Award size={32} />, desc: "Connecting open-source LLMs, automation systems, and databases under unified APIs.", isDark: true },
              { title: "Scale Predictably", desc: "Performance audits, optimized next.js routes, and SEO-targeted content clusters.", icon: <Shield size={32} />, isDark: false }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                className={`${styles.pillarCard} ${pillar.isDark ? styles.cardDark : styles.cardLight}`}
                initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.pillarIcon} style={{ color: pillar.isDark ? 'var(--accent-cyan)' : 'var(--accent-purple)' }}>{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Contact Form Section */}
      <section className={styles.aboutContactSection}>
        <div className={styles.container}>
          <div className={styles.aboutContactBox}>
            <div className={styles.sectionHeader} style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className={styles.label} style={{ justifyContent: 'center' }}>
                <span className={styles.labelIcon}></span>
                <em>Ready To Grow</em>
              </div>
              <h2>Drop Us a Line</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Send us a message and we'll get back to you within 24 hours.</p>
            </div>

            <form className={styles.aboutContactForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <textarea placeholder="Tell us about your project or questions..." rows={4} required></textarea>
              <button type="submit" className={styles.submitBtn}>
                <span>Send Message</span>
                <span className={styles.sendIconCircle}><Send size={16} /></span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
