"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Users, Search, RefreshCw, LogOut, Download } from "lucide-react";
import styles from "./page.module.css";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  source: string;
  details: string | null;
  createdAt: string;
}

export default function AdminLeadsPanel() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid passcode.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attempt to load session automatically on mount
    const checkSession = async () => {
      const res = await fetch(`/api/leads`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        setIsAuthenticated(true);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setLeads([]);
    setPasscode("");
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToCSV = () => {
    if (filteredLeads.length === 0) return;
    
    const headers = ["Date", "Name", "Phone", "Email", "Service", "Source", "Details"];
    const csvRows = [headers.join(",")];
    
    filteredLeads.forEach((lead) => {
      const row = [
        new Date(lead.createdAt).toLocaleDateString(),
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.phone.replace(/"/g, '""')}"`,
        `"${lead.email ? lead.email.replace(/"/g, '""') : ""}"`,
        `"${lead.serviceType.replace(/"/g, '""')}"`,
        `"${lead.source.replace(/"/g, '""')}"`,
        `"${lead.details ? lead.details.replace(/"/g, '""') : ""}"`
      ];
      csvRows.push(row.join(","));
    });
    
    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <motion.div 
          className={styles.loginCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.iconCircle}>
            <Lock size={32} />
          </div>
          <h1 className={styles.loginTitle}>Admin Access</h1>
          <p className={styles.loginSubtitle}>Enter the passcode to view captured leads.</p>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className={styles.inputField}
              required
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Verifying..." : "Unlock Dashboard"}
              <Unlock size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <div className={styles.titleIcon}><Users size={24} /></div>
          <div>
            <h1>Leads Dashboard</h1>
            <p>Manage and view captured prospects</p>
          </div>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className={styles.actionBtn} onClick={exportToCSV} disabled={filteredLeads.length === 0}>
            <Download size={16} />
            Export
          </button>
          <button className={styles.actionBtn} onClick={fetchLeads} disabled={loading}>
            <RefreshCw size={16} className={loading ? styles.spinning : ""} />
            Refresh
          </button>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.tableCard}>
          <div className={styles.tableResponsive}>
            <table className={styles.leadsTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Source</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredLeads.map((lead, i) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className={styles.nameCell}>{lead.name}</td>
                      <td>
                        <div className={styles.contactCell}>
                          <span>{lead.phone}</span>
                          {lead.email && <span className={styles.emailText}>{lead.email}</span>}
                        </div>
                      </td>
                      <td>
                        <span className={styles.badge}>{lead.serviceType}</span>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${styles.sourceBadge}`}>{lead.source}</span>
                      </td>
                      <td className={styles.detailsCell}>{lead.details || "-"}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredLeads.length === 0 && (
              <div className={styles.emptyState}>
                <Users size={48} className={styles.emptyIcon} />
                <h3>No leads found</h3>
                <p>Try adjusting your search criteria or capture new leads.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
