import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Services | Web, AI Automation, Mobile Apps & More – Futurr Edge",
  description: "Explore Futurr Edge's services — custom website development, AI automation, mobile apps, growth marketing, LMS, and e-commerce solutions.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
