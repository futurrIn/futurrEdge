import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Star, Users, BarChart3, Wifi, UserCircle } from 'lucide-react';
import styles from './PortidHeroMockup.module.css';

export default function PortidHeroMockup() {
  const floatVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className={styles.mockupContainer}>
      {/* Phone Emulator Background Blur */}
      <div className={styles.phoneGlow}></div>
      
      {/* Central Phone */}
      <motion.div 
        className={styles.phoneFrame}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.notch}></div>
        <div className={styles.phoneScreen}>
          
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrap}>
              <UserCircle size={48} className={styles.avatarIcon} />
            </div>
            <h3 className={styles.profileName}>Alex Designer</h3>
            <p className={styles.profileTitle}>Product Designer & Developer</p>
          </div>
          
          <button className={styles.saveBtn}>
            <Star size={16} /> Save Contact
          </button>
          
          <div className={styles.actionGrid}>
            <div className={styles.actionBtn}><GlobeIcon /></div>
            <div className={styles.actionBtn}><BarChart3 size={16} /></div>
            <div className={styles.actionBtn}><Users size={16} /></div>
          </div>
          
          <div className={styles.mockContent}>
            <div className={styles.mockRow}></div>
            <div className={styles.mockRow}></div>
            <div className={styles.mockRow}></div>
          </div>
          
        </div>
      </motion.div>

      {/* Floating Cards */}
      <motion.div className={`${styles.floatingCard} ${styles.qrCard}`} custom={1} variants={floatVariants} animate="animate" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <QrCode size={40} className={styles.qrIcon} />
        <span className={styles.cardLabel}>SCAN ME</span>
      </motion.div>

      <motion.div className={`${styles.floatingCard} ${styles.rateCard}`} custom={2} variants={floatVariants} animate="animate" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
        <div className={styles.stars}>
          <Star fill="var(--accent-purple)" color="var(--accent-purple)" size={20} />
          <Star fill="var(--accent-purple)" color="var(--accent-purple)" size={20} />
        </div>
        <span className={styles.cardLabel}>RATE US ON<br/>GOOGLE</span>
        <QrCode size={32} className={styles.qrIconSmall} />
        <button className={styles.tapBtn}><Wifi size={12} style={{ transform: 'rotate(90deg)' }}/> TAP HERE</button>
      </motion.div>

      <motion.div className={`${styles.floatingCard} ${styles.leadCard}`} custom={3} variants={floatVariants} animate="animate" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        <div className={styles.leadIconWrap}><Users size={18} /></div>
        <div className={styles.cardTextCol}>
          <h4>Lead Captured</h4>
          <p>Just now</p>
        </div>
      </motion.div>

      <motion.div className={`${styles.floatingCard} ${styles.viewsCard}`} custom={1.5} variants={floatVariants} animate="animate" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
        <div className={styles.viewsIconWrap}><BarChart3 size={18} /></div>
        <div className={styles.cardTextCol}>
          <h4>+240 Views</h4>
          <p>This week</p>
        </div>
      </motion.div>

      <motion.div className={`${styles.floatingCard} ${styles.nfcCard}`} custom={2.5} variants={floatVariants} animate="animate" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
        <div className={styles.nfcTop}>
          <Wifi size={24} style={{ transform: 'rotate(90deg)', color: 'var(--accent-purple)' }}/>
          <span className={styles.nfcBadge}>PORTID BLACK</span>
        </div>
        <div className={styles.nfcBottom}>
          <span className={styles.nfcDot}></span>
          <h4>VIP ACCESS</h4>
        </div>
      </motion.div>

    </div>
  );
}

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);
