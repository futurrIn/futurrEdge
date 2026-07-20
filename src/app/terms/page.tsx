import React from "react";

export default function TermsPage() {
  return (
    <div style={{ padding: '120px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Terms & Conditions</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Introduction</h2>
          <p>Welcome to Futurr Edge. By accessing and using our website and services, you agree to comply with and be bound by the following terms and conditions.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. Intellectual Property</h2>
          <p>The content, organization, graphics, design, compilation, and other matters related to our site are protected under applicable copyrights, trademarks, and other proprietary rights.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Services</h2>
          <p>We provide digital development, AI automation, and related services. Specific deliverables, timelines, and costs will be outlined in individual project proposals or contracts.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Limitation of Liability</h2>
          <p>Futurr Edge shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the services and products offered on this site.</p>
        </section>
      </div>
    </div>
  );
}
