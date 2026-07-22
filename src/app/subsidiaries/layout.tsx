import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Subsidiaries | Futurr Edge Group Companies",
  description: "Discover the companies and ventures under the Futurr Edge / Futurr Innovations group.",
};

export default function SubsidiariesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
