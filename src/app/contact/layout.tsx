import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | Book a Free Consultation – Futurr Edge",
  description: "Get in touch with Futurr Edge for a free consultation on your website, app, or AI automation project.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
