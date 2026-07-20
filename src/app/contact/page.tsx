"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !service || !message) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          serviceType: service,
          source: "contact_page",
          details: message,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Something went wrong.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.heroBackground} />
      <div className={styles.container}>
        <div className={styles.splitLayout}>
          {/* Left Column - Title Group */}
          <motion.div 
            className={styles.titleGroup}
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div className={styles.overline} variants={fadeIn}>
              © CONTACT US
            </motion.div>
            <motion.h1 className={styles.headline} variants={fadeIn}>
              <span className={styles.titleSerif}>Let's Build</span> Something<br/>
              Premium together.
            </motion.h1>
          </motion.div>

          {/* Left Column - Desc Group */}
          <motion.div 
            className={styles.descGroup}
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.p className={styles.desc} variants={fadeIn}>
              Whether you are planning a high-end web app, an automated client onboarding funnel, or a complete brand overhaul — we have the engineering expertise to scale your processes.
            </motion.p>
            <motion.div className={styles.contactDetails} variants={fadeIn}>
              <div className={styles.detailItem}>
                <span>EMAIL DIRECTLY</span>
                <p>hello@futurredge.com</p>
              </div>
              <div className={styles.detailItem}>
                <span>CONTACT NUMBER</span>
                <p>+91 7012514036 &amp; +91 6238852039</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Form */}
          <motion.div 
            className={styles.formCol}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form className={styles.contactForm} onSubmit={handleSubmit}>
                    {error && (
                      <div className={styles.formError} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444", background: "rgba(239, 68, 68, 0.05)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.15)", fontSize: "0.9rem" }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <div className={styles.formGroup}>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input 
                        type="tel" 
                        placeholder="Your Phone Number" 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <select 
                        required 
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        disabled={loading}
                      >
                        <option value="" disabled>What service do you need?</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="AI & Workflow Automation">AI & Workflow Automation</option>
                        <option value="CRM & Custom Systems">CRM & Custom Systems</option>
                        <option value="Brand Design System">Brand Design System</option>
                        <option value="SEO & Growth Strategy">SEO & Growth Strategy</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <textarea 
                        placeholder="Tell us about your project..." 
                        rows={5} 
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                      ></textarea>
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      <span className={styles.sendIconCircle}><Send size={16} /></span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.successBlock}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 32px", textAlign: "center", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "24px", backdropFilter: "blur(20px)" }}
                >
                  <CheckCircle2 size={64} style={{ color: "var(--accent-cyan)", marginBottom: "24px" }} />
                  <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "12px" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "24px" }}>
                    Thank you for reaching out. Your consultation inquiry has been logged successfully. Our team will review your requirements and contact you within 2 hours.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    style={{ background: "#fff", color: "#000", border: "none", padding: "12px 24px", borderRadius: "100px", fontWeight: "600", fontSize: "0.95rem", cursor: "pointer", transition: "transform 0.2s" }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
