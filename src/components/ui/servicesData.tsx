import React from "react";
import { Globe, Smartphone, Cpu, Database, BookOpen, ShoppingCart, TrendingUp } from "lucide-react";
import { BentoCardData } from "@/components/ui/MagicBento";

const iconStyle = { color: 'var(--accent-cyan)', opacity: 0.8, width: 48, height: 48 };
const featuredIconStyle = { color: 'var(--accent-purple)', opacity: 0.9, width: 72, height: 72 };

export const servicesData: BentoCardData[] = [
  {
    color: '#120F17',
    label: "Website Development",
    description: "Custom, high-converting websites built for speed, SEO, and premium brand experience.",
    title: "Websites",
    href: "/services/website-development",
    colSpan: 2,
    rowSpan: 2,
    uiComponent: (
      <div className="mockBrowser">
        <div className="mockHeader">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
        <div className="mockBody">
          <div className="mockHero" />
          <div className="mockGrid">
            <div className="mockCard" />
            <div className="mockCard" />
            <div className="mockCard" />
          </div>
        </div>
      </div>
    )
  },
  {
    color: '#120F17',
    label: "Mobile Apps",
    description: "Bespoke iOS and Android mobile applications designed to put your business in your customer's pocket.",
    title: "Mobile",
    href: "/services/mobile-app-development",
    colSpan: 1,
    rowSpan: 1,
    uiComponent: <Smartphone style={iconStyle} />
  },
  {
    color: '#120F17',
    label: "CRM & Systems",
    description: "Custom CRM platforms and ERP pipelines giving you one unified source of truth.",
    title: "CRM",
    href: "/services/crm-business-systems",
    colSpan: 1,
    rowSpan: 1,
    uiComponent: <Database style={iconStyle} />
  },
  {
    color: '#120F17',
    label: "Learning Management",
    description: "Scalable and engaging e-learning platforms for universities and corporate training.",
    title: "LMS",
    href: "/services/lms",
    colSpan: 1,
    rowSpan: 1,
    uiComponent: <BookOpen style={iconStyle} />
  },
  {
    color: '#120F17',
    label: "AI & Automation",
    description: "Automated leads qualification, custom AI chat agents, and system integrations that save hours.",
    title: "AI",
    href: "/services/ai-automation",
    colSpan: 1,
    rowSpan: 2,
    uiComponent: (
      <div className="mockNodes">
        <div className="node"><Cpu size={24} /></div>
        <div className="nodeLine" />
        <div className="node"><Database size={24} /></div>
        <div className="nodeLine" />
        <div className="node"><Smartphone size={24} /></div>
      </div>
    )
  },
  {
    color: '#120F17',
    label: "E-Commerce",
    description: "High-performance online stores built to scale and drive conversions seamlessly.",
    title: "E-Commerce",
    href: "/services/e-commerce",
    colSpan: 2,
    rowSpan: 1,
    uiComponent: (
      <div className="mockChart">
        <div className="bar" style={{ height: '40%' }} />
        <div className="bar" style={{ height: '70%' }} />
        <div className="bar" style={{ height: '50%' }} />
        <div className="bar" style={{ height: '90%' }} />
        <div className="bar" style={{ height: '100%', background: 'var(--accent-purple)' }} />
      </div>
    )
  },
  {
    color: '#120F17',
    label: "Growth Marketing",
    description: "Comprehensive SEO, GEO, and conversion rate optimizations to drive highly qualified leads.",
    title: "Marketing",
    href: "/services/growth-marketing",
    colSpan: 1,
    rowSpan: 1,
    uiComponent: <TrendingUp style={iconStyle} />
  }
];
