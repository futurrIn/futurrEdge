"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" className={styles.logoIcon} alt="Edge Logo" />
          <span className={styles.brandName}>Futurr</span>
        </Link>
        
        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ""}`}>
          <Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/services" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Services</Link>
           <Link href="/portfolio" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
           <Link href="/about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>About</Link>
           <Link href="/subsidiaries" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Subsidiaries</Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/contact" className={styles.ctaButtonMobile} onClick={() => setMobileMenuOpen(false)}>
            Book Consultation
          </Link>
        </nav>

        <div className={styles.rightActions}>
          <Link href="/contact" className={styles.ctaButton}>
            Book Consultation
          </Link>
          <button className={styles.mobileMenuToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
