import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locationSeoData } from '@/data/locationSeoData';
import styles from './page.module.css';

interface Props {
  params: {
    location: string;
  };
}

export function generateStaticParams() {
  return locationSeoData.map((data) => ({
    location: data.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = locationSeoData.find((d) => d.slug === params.location);
  
  if (!data) {
    return {};
  }

  return {
    title: data.seoTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://www.futurredge.com/${data.slug}/website-development`,
    }
  };
}

export default function LocationWebDevelopmentPage({ params }: Props) {
  const data = locationSeoData.find((d) => d.slug === params.location);

  if (!data) {
    notFound();
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `futurrEdge Web Development ${data.name}`,
    "url": `https://www.futurredge.com/${data.slug}/website-development`
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Development Services",
    "areaServed": {
      "@type": "City",
      "name": data.name
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.bgGlow} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className="gradient-text">{data.heroHeadline}</span>
          </h1>
          <p className={styles.subtitle}>
            {data.heroSupporting}
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/contact" className={styles.ctaButton}>Start Your Project</Link>
            <Link href="/portfolio" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>See Our Work</Link>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Local Digital Growth</h2>
            <p className={styles.text}>{data.introParagraph1}</p>
            <p className={styles.text}>{data.introParagraph2}</p>
            
            <h3 className={styles.cardTitle} style={{ marginTop: '24px' }}>Serving {data.name} & Beyond</h3>
            <ul className={styles.list}>
              {data.servingAreas.map(area => (
                <li key={area} className={styles.listItem}>{area}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Industry Solutions</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Retail & E-commerce:</strong> Secure online stores with seamless checkout.</li>
              <li className={styles.listItem}><strong>Real Estate:</strong> High-performance portfolio sites for builders.</li>
              <li className={styles.listItem}><strong>Healthcare & Education:</strong> Appointment systems and student portals.</li>
              <li className={styles.listItem}><strong>Hospitality:</strong> Integrated booking and digital menus for restaurants.</li>
            </ul>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Success Story</h3>
              <p className={styles.text}><strong>The Challenge:</strong> {data.successStory.challenge}</p>
              <p className={styles.text}><strong>The Solution:</strong> {data.successStory.solution}</p>
              <p className={styles.text}><strong>The Result:</strong> {data.successStory.result}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Frequently Asked Questions
          </h2>
          <div>
            {data.faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
