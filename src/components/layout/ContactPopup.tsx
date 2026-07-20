"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Award } from "lucide-react";
import styles from "./ContactPopup.module.css";
import { usePathname } from "next/navigation";

export default function ContactPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if popup was already shown or dismissed in current session
    const popupShown = sessionStorage.getItem("contact_popup_shown");
    if (popupShown !== "true") {
      // Set timed delay of 10 seconds (10000ms)
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("contact_popup_shown", "true");
      }, 10000);
      
      // Cleanup timer on unmount
      // Note: we can't return here because we need to attach the hash listener below
      // so we just clear it inside a return at the end.
      (window as any).__contactTimer = timer;
    }

    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setIsOpen(true);
        // Also remove hash so clicking again works
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if ((window as any).__contactTimer) clearTimeout((window as any).__contactTimer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !service) {
      alert("Please fill out all required fields.");
      return;
    }
    // Simulate successful form dispatch
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3500); // Automatically close after success popup displays
  };

  if (pathname.startsWith('/admin')) return null;
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.overlayMask}>
        <motion.div 
          className={styles.overlayBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />
        
        <motion.div 
          className={styles.popupCard}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Close Icon Button */}
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <>
              <div className={styles.popupHeader}>
                <div className={styles.badge}>
                  <Sparkles size={14} /> <span>Exclusive Consultation Offer</span>
                </div>
                <h3 className={styles.popupTitle}>Looking to Scale Your Brand?</h3>
                <p className={styles.popupSubtitle}>
                  Leave a message below and our engineering team will get back to you within 2 hours with a free architectural plan.
                </p>
              </div>

              <form className={styles.popupForm} onSubmit={handleSubmit}>
                <div className={styles.formGroupRow}>
                  <div className={styles.fieldBox}>
                    <label>Full Name*</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldBox}>
                    <label>Phone Number*</label>
                    <input 
                      type="tel" 
                      placeholder="+91 99999 99999" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroupRow}>
                  <div className={styles.fieldBox}>
                    <label>Email Address*</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldBox}>
                    <label>Required Service*</label>
                    <select 
                      required 
                      value={service} 
                      onChange={(e) => setService(e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="" disabled>Select capability...</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="AI & Workflow Automation">AI & Workflow Automation</option>
                      <option value="CRM & Business Systems">CRM & Business Systems</option>
                      <option value="LMS">Learning Management Systems (LMS)</option>
                      <option value="E-Commerce">E-Commerce Platforms</option>
                      <option value="SEO & Growth Marketing">SEO & Growth Marketing</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldBox} style={{ width: "100%" }}>
                  <label>Briefly tell us about your goals (Optional)</label>
                  <textarea 
                    placeholder="Describe your target timeline or feature list..." 
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span>Request Free Blueprint</span> <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successBlock}>
              <Award size={48} className={styles.awardIcon} />
              <h3 className={styles.successTitle}>Request Submitted!</h3>
              <p className={styles.successText}>
                Thank you, <strong>{name}</strong>. Our director has received your request. We will contact you at <strong>{phone}</strong> or <strong>{email}</strong> shortly.
              </p>
              <div className={styles.dismissProgress}>
                Closing automatically...
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
