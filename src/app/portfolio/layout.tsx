import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Portfolio | Our Work & Case Studies – Futurr Edge",
  description: "Browse real projects delivered by Futurr Edge, including e-commerce platforms, mobile apps, and custom web experiences for growing businesses.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
