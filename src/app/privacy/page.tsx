import React from "react";

export default function PrivacyPage() {
  return (
    <div style={{ padding: '120px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and project details.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. How We Use Your Information</h2>
          <p>We use the information we collect to respond to your inquiries, provide and improve our services, and communicate with you about projects and offers that may be of interest.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>
      </div>
    </div>
  );
}
