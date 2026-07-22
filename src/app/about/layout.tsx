import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Meet the Team Behind Futurr Edge",
  description: "Learn about Futurr Edge — a web development and AI automation agency helping startups and businesses build custom digital products.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
