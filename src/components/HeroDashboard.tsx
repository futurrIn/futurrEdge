"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Activity, Users, MessageSquare, Settings, 
  Search, ArrowUpRight, Zap, Bell
} from "lucide-react";
import styles from "./HeroDashboard.module.css";

// 1. Cute Bouncy Spring Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 14 }
  }
} as const;

const cardHover = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -3, 
    scale: 1.03,
    boxShadow: "0 6px 12px rgba(168, 85, 247, 0.15)",
    borderColor: "rgba(168, 85, 247, 0.35)",
    transition: { type: "spring", stiffness: 400, damping: 15 }
  }
} as const;

const progressHover = {
  initial: { y: 0 },
  hover: { 
    y: -2,
    borderColor: "rgba(6, 182, 212, 0.35)",
    transition: { type: "spring", stiffness: 400, damping: 15 }
  }
} as const;

// Wave Animation Coordinates for Looping
const pathNormal = "M 10 120 C 50 80, 80 40, 120 70 C 160 100, 200 20, 240 50 C 280 80, 320 30, 390 40";
const pathWavy1 = "M 10 110 C 50 90, 80 60, 120 60 C 160 80, 200 40, 240 40 C 280 90, 320 40, 390 50";
const pathWavy2 = "M 10 125 C 50 70, 80 30, 120 80 C 160 110, 200 15, 240 60 C 280 70, 320 20, 390 35";

const fillNormal = "M 10 120 C 50 80, 80 40, 120 70 C 160 100, 200 20, 240 50 C 280 80, 320 30, 390 40 L 390 120 L 10 120 Z";
const fillWavy1 = "M 10 110 C 50 90, 80 60, 120 60 C 160 80, 200 40, 240 40 C 280 90, 320 40, 390 50 L 390 120 L 10 120 Z";
const fillWavy2 = "M 10 125 C 50 70, 80 30, 120 80 C 160 110, 200 15, 240 60 C 280 70, 320 20, 390 35 L 390 120 L 10 120 Z";

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [pulse, setPulse] = useState(true);
  const [settings, setSettings] = useState({
    notifications: true,
    apiStatus: true,
    darkMode: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderHomeTab = () => (
    <div className={styles.grid}>
      {/* Row 1, Col 1: Large Wave Chart */}
      <motion.div 
        className={styles.chartCard}
        variants={itemVariants}
        whileHover={cardHover.hover}
        whileTap={{ scale: 0.95, rotate: -0.5 }}
      >
        <div className={styles.cardHeader}>
          <div>
            <div className={`${styles.skeletonPill} ${styles.w80} ${styles.h8}`} />
            <div className={`${styles.skeletonPill} ${styles.w45} ${styles.h6}`} style={{ marginTop: "2px" }} />
          </div>
          <div className={styles.timeSelector}>
            <div className={`${styles.skeletonPill} ${styles.w20} ${styles.h6}`} />
          </div>
        </div>

        {/* Simulated Live Stat */}
        <div className={styles.liveStat}>
          <div className={styles.statInfo}>
            <div className={`${styles.skeletonPill} ${styles.w60} ${styles.h16} ${styles.cyanBgPill}`} />
            <div className={`${styles.skeletonPill} ${styles.w30} ${styles.h6}`} style={{ marginTop: "2px" }} />
          </div>
          <motion.div 
            className={styles.trendBadge}
            animate={{ 
              scale: pulse ? 1.08 : 1,
              y: [0, -1, 0] 
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUpRight size={8} />
          </motion.div>
        </div>

        {/* SVG Line Chart with Waving Motion */}
        <div className={styles.chartWrapper}>
          <svg className={styles.chartSvg} viewBox="0 0 400 130">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.75)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Looping Area Fill */}
            <motion.path
              d={fillNormal}
              fill="url(#chartGradient)"
              animate={{
                d: [fillNormal, fillWavy1, fillWavy2, fillNormal]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Looping Chart Stroke */}
            <motion.path
              d={pathNormal}
              fill="none"
              stroke="#c084fc"
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#glow)"
              animate={{
                d: [pathNormal, pathWavy1, pathWavy2, pathNormal]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Flow Indicators / Dots */}
            <motion.circle
              cx="240"
              cy="50"
              r="5"
              fill="#ffffff"
              stroke="#c084fc"
              strokeWidth="3"
              animate={{ 
                r: [5, 8, 5],
                cy: [50, 40, 60, 50]
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.circle
              cx="120"
              cy="70"
              r="4"
              fill="#06b6d4"
              stroke="#ffffff"
              strokeWidth="2"
              animate={{
                cy: [70, 60, 80, 70]
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Row 1, Col 2: Side Cards (Stack) */}
      <div className={styles.sideStack}>
        <motion.div 
          className={`${styles.smallCard} ${styles.purpleBg}`}
          variants={itemVariants}
          whileHover={cardHover.hover}
          whileTap={{ scale: 0.94 }}
        >
          <div className={styles.smallCardHeader}>
            <div className={styles.iconWrap}>
              <Activity size={10} />
            </div>
            <div className={`${styles.skeletonPill} ${styles.w40} ${styles.h6}`} />
          </div>
          <div className={styles.smallCardBody}>
            <motion.div 
              className={`${styles.skeletonPill} ${styles.w50} ${styles.h12} ${styles.purpleBgPill}`} 
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className={`${styles.skeletonPill} ${styles.w30} ${styles.h6}`} style={{ marginTop: "2px", display: "block" }} />
          </div>
        </motion.div>

        <motion.div 
          className={`${styles.smallCard} ${styles.pinkBg}`}
          variants={itemVariants}
          whileHover={cardHover.hover}
          whileTap={{ scale: 0.94 }}
        >
          <div className={styles.smallCardHeader}>
            <div className={styles.iconWrap}>
              <Zap size={10} />
            </div>
            <div className={`${styles.skeletonPill} ${styles.w40} ${styles.h6}`} />
          </div>
          <div className={styles.smallCardBody}>
            <motion.div 
              className={`${styles.skeletonPill} ${styles.w45} ${styles.h12} ${styles.pinkBgPill}`} 
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <div className={`${styles.skeletonPill} ${styles.w30} ${styles.h6}`} style={{ marginTop: "2px", display: "block" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {[
        { label: "Deployment Successful", time: "2m ago", color: "#10b981" },
        { label: "AI Lead Capture Active", time: "12m ago", color: "#06b6d4" },
        { label: "Database Optimization Done", time: "1h ago", color: "#a855f7" }
      ].map((act, i) => (
        <motion.div
          key={i}
          className={styles.activityRow}
          whileHover={{ scale: 1.03, background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 350, damping: 15 }}
        >
          <span className={styles.activityDot} style={{ background: act.color, boxShadow: `0 0 6px ${act.color}` }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <span className={styles.activityText}>{act.label}</span>
            <span style={{ fontSize: "6px", color: "rgba(255,255,255,0.3)" }}>{act.time}</span>
          </div>
          <div className={`${styles.skeletonPill} ${styles.w30} ${styles.h6}`} />
        </motion.div>
      ))}
    </div>
  );

  const renderUsersTab = () => (
    <div style={{ display: "flex", gap: "6px" }}>
      {[
        { name: "Alex R.", role: "Lead Dev", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", color: "#10b981" },
        { name: "Sarah J.", role: "Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", color: "#ef4444" },
        { name: "Emma W.", role: "AI Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", color: "#10b981" }
      ].map((usr, i) => (
        <motion.div
          key={i}
          className={styles.userCard}
          whileHover={{ 
            scale: 1.06, 
            y: -3,
            borderColor: "rgba(168, 85, 247, 0.35)",
            boxShadow: "0 6px 12px rgba(168, 85, 247, 0.15)"
          }}
          whileTap={{ scale: 0.94 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 350, damping: 14 }}
        >
          <div style={{ position: "relative" }}>
            <img src={usr.img} alt={usr.name} className={styles.userAvatar} />
            <span className={styles.userStatusDot} style={{ background: usr.color }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: "7px", color: "#fff" }}>{usr.name}</div>
          <div style={{ fontSize: "5.5px", color: "rgba(255, 255, 255, 0.4)" }}>{usr.role}</div>
          <motion.button 
            className={styles.pingButton}
            whileHover={{ scale: 1.1, background: "rgba(6, 182, 212, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            Ping
          </motion.button>
        </motion.div>
      ))}
    </div>
  );

  const renderMessagesTab = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", height: "100%" }}>
      {[
        { text: "Optimizations fully deployed?", isMe: false },
        { text: "Done! Load speeds increased by 40%.", isMe: true }
      ].map((msg, i) => (
        <motion.div
          key={i}
          style={{ 
            display: "flex", 
            justifyContent: msg.isMe ? "flex-end" : "flex-start",
            width: "100%"
          }}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.12, type: "spring", stiffness: 350, damping: 14 }}
        >
          <motion.div
            className={`${styles.chatBubble} ${msg.isMe ? styles.chatBubbleMe : styles.chatBubbleOther}`}
            whileHover={{ scale: 1.03 }}
          >
            <div style={{ fontSize: "6.5px", lineHeight: "1.3" }}>{msg.text}</div>
          </motion.div>
        </motion.div>
      ))}
      <motion.div 
        className={styles.typingIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className={styles.typingDot} style={{ animationDelay: "0s" }} />
        <span className={styles.typingDot} style={{ animationDelay: "0.2s" }} />
        <span className={styles.typingDot} style={{ animationDelay: "0.4s" }} />
        <span style={{ fontSize: "5px", color: "rgba(255, 255, 255, 0.4)", marginLeft: "4px" }}>Sarah is typing...</span>
      </motion.div>
    </div>
  );

  const renderSettingsTab = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {[
        { key: "notifications", label: "Push Alerts", active: settings.notifications, color: "#a855f7" },
        { key: "apiStatus", label: "Production API Live", active: settings.apiStatus, color: "#06b6d4" },
        { key: "darkMode", label: "Glow Mode Enabled", active: settings.darkMode, color: "#db2777" }
      ].map((item, i) => (
        <motion.div
          key={item.key}
          className={styles.settingsRow}
          whileHover={{ scale: 1.02, background: "rgba(255, 255, 255, 0.03)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <span style={{ fontSize: "7px", color: "#fff", fontWeight: 500 }}>{item.label}</span>
          <motion.button
            className={styles.toggleTrack}
            style={{ 
              background: item.active ? item.color : "rgba(255, 255, 255, 0.08)",
              boxShadow: item.active ? `0 0 8px ${item.color}33` : "none"
            }}
            onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={styles.toggleThumb}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              animate={{ x: item.active ? 10 : 0 }}
            />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div 
      className={styles.dashboardContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Sidebar */}
      <div className={styles.sidebar}>
        <motion.div 
          className={styles.logoIcon} 
          variants={itemVariants} 
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          <Zap size={10} className={styles.accentZap} />
        </motion.div>
        <nav className={styles.nav}>
          {["home", "activity", "users", "messages", "settings"].map((tab) => {
            const Icon = {
              home: Home,
              activity: Activity,
              users: Users,
              messages: MessageSquare,
              settings: Settings
            }[tab] || Home;

            return (
              <motion.button 
                key={tab}
                className={`${styles.navItem} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
                variants={itemVariants}
                animate={activeTab === tab ? { y: [0, -2, 0] } : {}}
                transition={activeTab === tab ? { repeat: Infinity, duration: 1.8, ease: "easeInOut" } : {}}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={11} />
                {tab === "activity" && <span className={styles.pulseDot}></span>}
              </motion.button>
            );
          })}
        </nav>
        <motion.div className={styles.logoutZone} variants={itemVariants}>
          <motion.div 
            className={styles.avatarMini}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* 2. Main Content Area */}
      <div className={styles.mainContent}>
        {/* Top Navbar */}
        <header className={styles.header}>
          <div>
            <div className={`${styles.skeletonPill} ${styles.w45} ${styles.h6}`} />
            <h3 className={styles.dashboardTitle}>
              <div className={`${styles.skeletonPill} ${styles.w80} ${styles.h12} ${styles.purpleBgPill}`} />
              <span className={styles.liveBadge}>
                <span className={styles.liveDot}></span>
              </span>
            </h3>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.searchBar}>
              <Search size={8} className={styles.searchIcon} />
              <div className={styles.searchSkeleton} />
            </div>
            <motion.div 
              className={styles.iconButton} 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bell size={10} />
              <span className={styles.bellBadge}></span>
            </motion.div>
          </div>
        </header>

        {/* Dashboard Grid Container (Framer Motion dynamic tab switcher) */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.94, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -5 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              style={{ width: "100%", height: "100%" }}
            >
              {activeTab === "home" && renderHomeTab()}
              {activeTab === "activity" && renderActivityTab()}
              {activeTab === "users" && renderUsersTab()}
              {activeTab === "messages" && renderMessagesTab()}
              {activeTab === "settings" && renderSettingsTab()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Row 2: Workout-like Progress Row */}
        <footer className={styles.footerRow}>
          {[
            { w: ["84%", "92%", "84%"], c: styles.purpleBar }, 
            { w: ["92%", "80%", "92%"], c: styles.cyanBar }, 
            { w: ["45%", "60%", "45%"], c: styles.pinkBar }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className={styles.progressCard}
              variants={itemVariants}
              whileHover={progressHover.hover}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.progressHeader}>
                <div className={`${styles.skeletonPill} ${styles.w45} ${styles.h6}`} />
                <div className={`${styles.skeletonPill} ${styles.w20} ${styles.h6}`} />
              </div>
              <div className={styles.barContainer}>
                <motion.div 
                  className={`${styles.progressBar} ${item.c}`}
                  initial={{ width: "0%" }}
                  animate={{ width: item.w }}
                  transition={{ 
                    width: { duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
                    default: { duration: 1.5, ease: "easeOut", delay: 0.3 + idx * 0.15 }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </footer>
      </div>
    </motion.div>
  );
}
