"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { Send } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Global CTA Banner - Connect Engage Transform */}
        <div className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>CONNECT ENGAGE TRANSFORM</h2>
          <p className={styles.ctaSubtitle}>
            Partner with us to build premium custom software, launch automated workflows, or design state-of-the-art mobile platforms.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaPrimaryBtn}>
              Get Your Quote
            </Link>
            <a href="https://www.portid.in/create-profile" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondaryBtn}>
              Build Your Free Portfolio
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Column 1: Brand Info */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" className={styles.logoIcon} alt="Edge Logo" />
              <span className={styles.brandName}>Futurr</span>
            </Link>
            <p className={styles.description}>
              Providing premium digital development and automation on perfect scales for startups and growing businesses.
            </p>
            <div className={styles.socials}>
              <a href="https://wa.me/917012514036" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="https://www.instagram.com/futurr_edge?igsh=NGJ3a3p3cjhxa3hi&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/share/1HXqhfAMmF/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Quick Links</h4>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/process">History</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blogs</Link>
          </div>

          {/* Column 3: Our Services */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Our Services</h4>
            <Link href="/services/website-development">Website Development</Link>
            <Link href="/services/ai-automation">AI Automation</Link>
            <Link href="/services/mobile-app-development">Mobile App</Link>
            <Link href="/services/lms">LMS</Link>
            <Link href="/services/e-commerce">E-Commerce</Link>
            <Link href="/services/crm-business-systems">CRM & Systems</Link>
            <Link href="/services/growth-marketing">Growth Marketing</Link>
          </div>

          {/* Column 4: Newsletter */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.newsletterHeading}>Subscribe To Our Newsletter.</h4>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputWrapper}>
                <input type="email" placeholder="Enter Email*" required />
                <button type="submit" className={styles.subscribeBtn}>
                  <Send size={16} />
                </button>
              </div>
              <label className={styles.agreeLabel}>
                <input type="checkbox" required />
                <span>Agree our Terms & Condition</span>
              </label>
            </form>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p>
              © {new Date().getFullYear()} <a href="https://futurr.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}>Futurr Innovations and Research</a>. All rights reserved. | <a href="https://futurrinnovations.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}>futurrinnovations.com</a>
            </p>
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
