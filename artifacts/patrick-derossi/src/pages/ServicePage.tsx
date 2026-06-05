import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, Clock, ChevronDown, Star, CheckCircle } from 'lucide-react';
import { SERVICES_DATA } from '../serviceData';

const TESTIMONIALS = [
  { text: "If you need a draftsman, look no further. Patrick is amazing to work with. He took my rough sketches and ideas and turned them into professional permit ready plans. He was so patient and made the entire process stress-free. Highly Recommended.", name: 'Sukhpal Singh', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Sukhpal+Singh&background=1a1a1a&color=c9a84c&size=80' },
  { text: "I would like to express my gratitude to Patrick for efficiently completing all my applications at a minimal cost and within a remarkably short timeframe. Despite being unable to find anyone willing to meet my deadline elsewhere, Patrick delivered exceptional results, demonstrating his expertise. I highly recommend his services.", name: 'Najib Sakhizada', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Najib+Sakhizada&background=1a1a1a&color=c9a84c&size=80' },
  { text: "One of the best services here in Perth. I had the opportunity to work with him and it was a very pleasant experience. He answered all my questions in a very good manner, always with a positive attitude. Highly recommended.", name: 'Stefano Hernandez-Morey', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Stefano+Hernandez-Morey&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Patrick and team were great to deal with, from start to finish nothing was or has been a chore. Will always recommend their service to anyone in need. Highly recommend!", name: 'Chad Mews', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Chad+Mews&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Patrick clearly understood my design requirement, has competent complimentary professionals, and is prompt in dealing with variations. Excellent service provided!", name: 'Tim Smith', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Tim+Smith&background=1a1a1a&color=c9a84c&size=80' },
  { text: "We find Patrick's work and detail to be comprehensive and his knowledge of drafting is excellent.", name: 'Mitch T', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Mitch+T&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Easy to deal with, very professional and plans are spot on. Would not use anyone else.", name: 'Shenol Arslanovski', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Shenol+Arslanovski&background=1a1a1a&color=c9a84c&size=80' },
  { text: "An amazing young man — always helps you with great patience. I would recommend this company without hesitation. Would definitely build again.", name: 'Alem Basagic', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Alem+Basagic&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Purpose driven designs with exceptional eye for detail.", name: 'Hamish Laidlaw', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Hamish+Laidlaw&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Patrick was very professional and very helpful. Highly recommended.", name: 'Mimi Dalipova', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Mimi+Dalipova&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Great service, I highly recommend. Job was done fast and top quality.", name: 'Sebastian O', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Sebastian+O&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Amazing work, a pleasure to work with.", name: 'Gabriel Beliti', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Gabriel+Beliti&background=1a1a1a&color=c9a84c&size=80' },
  { text: "Efficient, quality service.", name: 'Sam Smith', role: 'Google Review', image: 'https://ui-avatars.com/api/?name=Sam+Smith&background=1a1a1a&color=c9a84c&size=80' },
];

const PAGE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #c9a84c;
    --gold-dim: rgba(201,168,76,0.1);
    --gold-border: rgba(201,168,76,0.32);
    --dark: #f4f5f8;
    --dark2: #ebeef3;
    --dark3: #ffffff;
    --dark4: #f0f2f6;
    --gray: rgba(26,27,30,0.56);
    --font: 'DM Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--dark); color: #1a1b1e; font-family: var(--font); overflow-x: hidden; }

  .sp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    padding: 0.6rem 3rem;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(244,245,248,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    box-shadow: 0 2px 24px rgba(26,27,30,0.07);
  }
  @media (max-width: 768px) { .sp-nav { padding: 0.5rem 1.5rem; } }
  .sp-nav-back {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(28,23,14,0.6); text-decoration: none;
    transition: color 0.3s ease;
  }
  .sp-nav-back:hover { color: var(--gold); }
  .sp-nav-logo img { height: 120px; width: auto; display: block; }
  .sp-nav-cta {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--gold); text-decoration: none;
    border: 1px solid var(--gold-border); padding: 0.55rem 1.2rem;
    transition: all 0.3s ease;
  }
  .sp-nav-cta:hover { background: var(--gold); color: #1c1812; border-color: var(--gold); }

  /* Hero */
  .sp-hero {
    position: relative; height: 65vh; min-height: 480px; overflow: hidden;
    display: flex; align-items: flex-end; padding-bottom: 6vh;
    margin-top: 0;
  }
  .sp-hero-bg {
    position: absolute; inset: -3%;
    background-size: cover; background-position: center;
    transform: scale(1.06);
  }
  .sp-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.5) 40%, rgba(13,13,13,0.92) 80%, rgba(13,13,13,1) 100%);
  }
  .sp-hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px; pointer-events: none;
  }
  .sp-hero-content { position: relative; z-index: 10; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 3rem; }
  @media (max-width: 768px) { .sp-hero-content { padding: 0 1.5rem; } }
  .sp-breadcrumb {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
  }
  .sp-breadcrumb-sep { color: rgba(255,255,255,0.2); }
  .sp-num { font-size: 0.62rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 0.75rem; }
  .sp-title {
    font-size: clamp(2.8rem, 6vw, 5.5rem); font-weight: 800;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 1.5rem;
  }
  .sp-tagline { font-size: clamp(0.85rem, 1.5vw, 1.05rem); color: rgba(255,255,255,0.72); max-width: 560px; line-height: 1.65; font-weight: 300; }

  /* Container */
  .sp-container { max-width: 1200px; margin: 0 auto; padding: 0 3rem; }
  @media (max-width: 768px) { .sp-container { padding: 0 1.5rem; } }

  /* Overview */
  .sp-overview { padding: 7rem 0 5rem; background: var(--dark); }
  .sp-overview-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 6rem; align-items: start; }
  @media (max-width: 900px) { .sp-overview-grid { grid-template-columns: 1fr; gap: 3rem; } }
  .sp-section-eyebrow {
    display: inline-block; font-size: 0.62rem; letter-spacing: 0.4em;
    text-transform: uppercase; color: var(--gold); font-weight: 400;
    margin-bottom: 1.5rem; position: relative; padding-left: 2.2rem;
  }
  .sp-section-eyebrow::before {
    content: ''; position: absolute; left: 0; top: 50%;
    width: 1.6rem; height: 1px; background: var(--gold); transform: translateY(-50%);
  }
  .sp-section-h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 2rem; }
  .sp-para { font-size: 0.92rem; color: var(--gray); line-height: 1.9; font-weight: 400; margin-bottom: 1.25rem; }

  .sp-inclusions-box {
    background: var(--dark3); border: 1px solid rgba(28,23,14,0.1);
    padding: 2.5rem; position: sticky; top: 100px;
  }
  .sp-inclusions-title {
    font-size: 0.62rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.75rem; display: flex; align-items: center; gap: 0.75rem;
  }
  .sp-inclusions-title::before { content: ''; display: inline-block; width: 1.2rem; height: 1px; background: var(--gold); }
  .sp-inclusion-item {
    display: flex; align-items: flex-start; gap: 0.85rem;
    padding: 0.75rem 0; border-bottom: 1px solid rgba(28,23,14,0.08);
    font-size: 0.84rem; color: rgba(28,23,14,0.82); font-weight: 400; line-height: 1.4;
  }
  .sp-inclusion-item:last-child { border-bottom: none; }
  .sp-inclusion-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; margin-top: 6px; opacity: 0.8; }
  .sp-cta-inline {
    margin-top: 2rem; display: block; padding: 1.1rem 1.5rem;
    background: var(--gold); color: #1c1812; text-decoration: none;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; text-align: center;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: opacity 0.2s ease;
  }
  .sp-cta-inline:hover { opacity: 0.88; }

  /* Features */
  .sp-features { padding: 6rem 0; background: var(--dark2); position: relative; overflow: hidden; }
  .sp-features-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 56px 56px; pointer-events: none;
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
  }
  .sp-features-inner { position: relative; z-index: 1; }
  .sp-features-head { margin-bottom: 3.5rem; }
  .sp-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(28,23,14,0.08); }
  @media (max-width: 900px) { .sp-feature-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .sp-feature-grid { grid-template-columns: 1fr; } }
  .sp-feature-cell {
    background: var(--dark2); padding: 2.5rem;
    transition: background 0.3s ease;
  }
  .sp-feature-cell:hover { background: var(--dark3); }
  .sp-feature-icon {
    font-size: 1.3rem; color: var(--gold); margin-bottom: 1.25rem; display: block;
    font-family: serif; opacity: 0.9;
  }
  .sp-feature-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.6rem; letter-spacing: -0.01em; }
  .sp-feature-desc { font-size: 0.84rem; color: var(--gray); line-height: 1.75; font-weight: 400; }

  /* Testimonials */
  .sp-testimonials { padding: 6rem 0; background: var(--dark); }
  .sp-testi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
  @media (max-width: 768px) { .sp-testi-grid { grid-template-columns: 1fr; } }
  .sp-testi-card {
    background: var(--dark3); border: 1px solid rgba(28,23,14,0.1);
    padding: 2.25rem; position: relative;
    transition: border-color 0.4s ease;
  }
  .sp-testi-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 0; background: var(--gold);
    transition: height 0.5s cubic-bezier(0.77,0,0.18,1);
  }
  .sp-testi-card:hover { border-color: var(--gold-border); }
  .sp-testi-card:hover::before { height: 100%; }
  .sp-testi-quote { font-size: 3rem; line-height: 0.9; color: var(--gold); opacity: 0.18; font-family: Georgia, serif; margin-bottom: 0.75rem; }
  .sp-testi-stars { display: flex; gap: 3px; margin-bottom: 1rem; }
  .sp-testi-text { font-size: 0.87rem; color: rgba(28,23,14,0.68); line-height: 1.8; font-weight: 300; font-style: italic; margin-bottom: 1.5rem; }
  .sp-testi-author { display: flex; align-items: center; gap: 0.85rem; padding-top: 1.25rem; border-top: 1px solid rgba(28,23,14,0.1); }
  .sp-testi-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--gold-border); flex-shrink: 0; }
  .sp-testi-name { font-size: 0.87rem; font-weight: 700; margin-bottom: 0.15rem; }
  .sp-testi-role { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); opacity: 0.8; }

  /* FAQ */
  .sp-faq { padding: 6rem 0; background: var(--dark2); }
  .sp-faq-list { margin-top: 3.5rem; max-width: 820px; }
  .sp-faq-item { border-bottom: 1px solid rgba(28,23,14,0.1); }
  .sp-faq-q {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 1.75rem 0; gap: 1rem;
    background: none; border: none; color: #1c1812; font-family: var(--font);
    font-size: 0.95rem; font-weight: 600; text-align: left; cursor: pointer;
    transition: color 0.3s ease;
  }
  .sp-faq-q:hover { color: var(--gold); }
  .sp-faq-icon { color: var(--gold); flex-shrink: 0; transition: transform 0.35s ease; }
  .sp-faq-icon.open { transform: rotate(180deg); }
  .sp-faq-a { font-size: 0.87rem; color: var(--gray); line-height: 1.85; font-weight: 400; max-height: 0; overflow: hidden; transition: max-height 0.45s ease, padding 0.3s ease; }
  .sp-faq-a.open { max-height: 400px; padding-bottom: 1.75rem; }

  /* CTA Band */
  .sp-cta-band { padding: 5rem 0; background: var(--dark); border-top: 1px solid var(--gold-border); }
  .sp-cta-band-inner { display: flex; align-items: center; justify-content: space-between; gap: 3rem; }
  @media (max-width: 800px) { .sp-cta-band-inner { flex-direction: column; align-items: flex-start; gap: 2rem; } }
  .sp-cta-heading { font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin: 0.5rem 0 1rem; }
  .sp-cta-sub { font-size: 0.85rem; color: var(--gray); margin: 0; }
  .sp-cta-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 1.2rem; flex-shrink: 0; }
  .sp-cta-btn {
    white-space: nowrap; font-size: 0.8rem; padding: 1rem 2rem;
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--gold); color: #1c1812; text-decoration: none;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    transition: opacity 0.2s ease;
  }
  .sp-cta-btn:hover { opacity: 0.88; }
  .sp-cta-call { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--gold); text-decoration: none; font-size: 0.78rem; letter-spacing: 0.12em; font-weight: 500; opacity: 0.8; transition: opacity 0.2s ease; }
  .sp-cta-call:hover { opacity: 1; }

  /* Footer */
  .sp-footer { background: #1c1a14; border-top: 1px solid var(--gold-border); padding: 2.5rem 0; }
  .sp-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
  .sp-footer-brand { font-size: 0.72rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.35); text-transform: uppercase; }
  .sp-footer-links { display: flex; gap: 2rem; flex-wrap: wrap; }
  .sp-footer-link { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.3s ease; }
  .sp-footer-link:hover { color: var(--gold); }

  /* Services nav strip */
  .sp-services-strip { padding: 5rem 0; background: var(--dark3); border-top: 1px solid rgba(28,23,14,0.08); }
  .sp-services-strip-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(28,23,14,0.08); margin-top: 3rem; }
  @media (max-width: 900px) { .sp-services-strip-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .sp-services-strip-grid { grid-template-columns: 1fr; } }
  .sp-other-service {
    background: var(--dark3); padding: 2rem;
    text-decoration: none; color: #1c1812;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 2px solid transparent;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .sp-other-service:hover { border-color: var(--gold); background: var(--dark4); }
  .sp-other-service-num { font-size: 0.58rem; letter-spacing: 0.3em; color: var(--gold); text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
  .sp-other-service-title { font-size: 0.92rem; font-weight: 700; }
`;

interface ServicePageProps {
  params?: { slug: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const slug = params?.slug;
  const service = SERVICES_DATA.find(s => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!service) return;

    const BASE = 'https://patrickderossi.com.au';
    const canonical = `${BASE}/services/${service.slug}`;
    const title = `${service.title} Perth WA | WA Building Design`;
    const desc = `${service.overview} Expert ${service.title.toLowerCase()} services across the Perth metropolitan area. Call +61 423 231 515 for a free consultation.`;

    document.title = title;

    const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    const origDesc = descEl?.content || '';
    if (descEl) descEl.content = desc;

    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    const origOgTitle = ogTitle?.content || '';
    if (ogTitle) ogTitle.content = title;

    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    const origOgDesc = ogDesc?.content || '';
    if (ogDesc) ogDesc.content = desc;

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    const origOgUrl = ogUrl?.content || '';
    if (ogUrl) ogUrl.content = canonical;

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    const origCanonical = canonicalEl?.href || '';
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    const injectLd = (id: string, data: object) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
    };

    injectLd('ld-service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.overview,
      url: canonical,
      provider: {
        '@type': 'LocalBusiness',
        name: 'WA Building Design',
        telephone: '+61423231515',
        email: 'patrick@wabd.com.au',
        url: BASE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2/35 Westchester Road',
          addressLocality: 'Malaga',
          addressRegion: 'WA',
          postalCode: '6090',
          addressCountry: 'AU',
        },
      },
      areaServed: { '@type': 'AdministrativeArea', name: 'Perth Metropolitan Area, WA' },
    });

    injectLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });

    injectLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/#services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: canonical },
      ],
    });

    return () => {
      document.title = 'WA Building Design | Residential Design Malaga, Perth WA';
      if (descEl) descEl.content = origDesc;
      if (ogTitle) ogTitle.content = origOgTitle;
      if (ogDesc) ogDesc.content = origOgDesc;
      if (ogUrl) ogUrl.content = origOgUrl;
      if (canonicalEl) canonicalEl.href = origCanonical;
      document.getElementById('ld-service')?.remove();
      document.getElementById('ld-faq')?.remove();
      document.getElementById('ld-breadcrumb')?.remove();
    };
  }, [service]);

  if (!service) {
    return (
      <div style={{ background: '#f4f5f8', color: '#1a1b1e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '1.5rem' }}>404 — Service Not Found</p>
        <a href="/" style={{ color: '#c9a84c', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={14} /> Back to Home
        </a>
      </div>
    );
  }

  const otherServices = SERVICES_DATA.filter(s => s.slug !== slug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(false);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'patrick@wabd.com.au',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          service: service.title,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormSent(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setFormSent(false), 8000);
    } catch {
      setFormError(true);
      setTimeout(() => setFormError(false), 6000);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f4f5f8', color: '#1a1b1e', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Nav */}
      <nav className="sp-nav">
        <a href="/#services" className="sp-nav-back">
          <ArrowLeft size={13} /> All Services
        </a>
        <a href="/" className="sp-nav-logo">
          <img src="/logo-dark.png" alt="WA Building Design" />
        </a>
        <a href="/#contact" className="sp-nav-cta">
          <Phone size={12} /> Get a Quote
        </a>
      </nav>

      {/* Hero */}
      <section className="sp-hero" style={{ paddingTop: '72px' }}>
        <div className="sp-hero-bg" style={{ backgroundImage: `url('${service.heroImg}')` }} />
        <div className="sp-hero-overlay" />
        <div className="sp-hero-grid" />
        <div className="sp-hero-content">
          <div className="sp-breadcrumb">
            <span>Home</span>
            <span className="sp-breadcrumb-sep">/</span>
            <span>Services</span>
            <span className="sp-breadcrumb-sep">/</span>
            <span>{service.title}</span>
          </div>
          <span className="sp-num">Service {service.num}</span>
          <h1 className="sp-title">{service.title}</h1>
          <p className="sp-tagline">{service.tagline}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="sp-overview">
        <div className="sp-container">
          <div className="sp-overview-grid">
            <div>
              <span className="sp-section-eyebrow">Overview</span>
              <h2 className="sp-section-h2">What's involved &amp;<br />what you can expect</h2>
              {service.paragraphs.map((p, i) => (
                <p key={i} className="sp-para">{p}</p>
              ))}
            </div>
            <div>
              <div className="sp-inclusions-box">
                <div className="sp-inclusions-title">What's Included</div>
                {service.inclusions.map((item, i) => (
                  <div key={i} className="sp-inclusion-item">
                    <span className="sp-inclusion-dot" />
                    {item}
                  </div>
                ))}
                <a href="/#contact" className="sp-cta-inline">
                  Get a Quote for This Service <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="sp-features">
        <div className="sp-features-grid-bg" />
        <div className="sp-container sp-features-inner">
          <div className="sp-features-head">
            <span className="sp-section-eyebrow">Why Choose Us</span>
            <h2 className="sp-section-h2">What sets our {service.title.toLowerCase()} service apart</h2>
          </div>
          <div className="sp-feature-grid">
            {service.features.map((f, i) => (
              <div key={i} className="sp-feature-cell">
                <span className="sp-feature-icon">{f.icon}</span>
                <div className="sp-feature-title">{f.title}</div>
                <p className="sp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sp-testimonials">
        <div className="sp-container">
          <span className="sp-section-eyebrow">Client Stories</span>
          <h2 className="sp-section-h2" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            What clients say
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', fontWeight: 400 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />)}
              <span style={{ color: '#c9a84c', fontWeight: 800, fontSize: '1rem' }}>5.0</span>
            </span>
          </h2>
          <div className="sp-testi-grid">
            {service.testimonialIndices.slice(0, 2).map(idx => {
              const t = TESTIMONIALS[idx];
              return (
                <div key={idx} className="sp-testi-card">
                  <div className="sp-testi-quote">"</div>
                  <div className="sp-testi-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#c9a84c" color="#c9a84c" />)}
                  </div>
                  <p className="sp-testi-text">"{t.text}"</p>
                  <div className="sp-testi-author">
                    <img src={t.image} alt={t.name} className="sp-testi-avatar" loading="lazy" />
                    <div>
                      <div className="sp-testi-name">{t.name}</div>
                      <div className="sp-testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-faq">
        <div className="sp-container">
          <span className="sp-section-eyebrow">Common Questions</span>
          <h2 className="sp-section-h2">Frequently asked questions</h2>
          <div className="sp-faq-list">
            {service.faqs.map((faq, i) => (
              <div key={i} className="sp-faq-item">
                <button className="sp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown size={18} className={`sp-faq-icon${openFaq === i ? ' open' : ''}`} />
                </button>
                <div className={`sp-faq-a${openFaq === i ? ' open' : ''}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="sp-services-strip">
        <div className="sp-container">
          <span className="sp-section-eyebrow">Explore More</span>
          <h2 className="sp-section-h2">Other services we offer</h2>
          <div className="sp-services-strip-grid">
            {otherServices.map(s => (
              <a key={s.slug} href={`/services/${s.slug}`} className="sp-other-service">
                <div>
                  <span className="sp-other-service-num">{s.num}</span>
                  <span className="sp-other-service-title">{s.title}</span>
                </div>
                <ArrowRight size={16} style={{ color: 'var(--gold)', opacity: 0.6, flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="sp-cta-band">
        <div className="sp-container">
          <div className="sp-cta-band-inner">
            <div>
              <span className="sp-section-eyebrow">Start Today</span>
              <h2 className="sp-cta-heading">Ready to start your<br />{service.title.toLowerCase()} project?</h2>
              <p className="sp-cta-sub">Free initial consultation. No obligation. Perth-wide service.</p>
            </div>
            <div className="sp-cta-actions">
              <a href="/#contact" className="sp-cta-btn">Get a Free Quote <ArrowRight size={16} /></a>
              <a href="tel:+61423231515" className="sp-cta-call"><Phone size={15} /><span>+61 423 231 515</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sp-footer">
        <div className="sp-container">
          <div className="sp-footer-inner">
            <span className="sp-footer-brand">© {new Date().getFullYear()} WA Building Design — South Perth, WA</span>
            <nav className="sp-footer-links">
              <a href="/" className="sp-footer-link">Home</a>
              <a href="/#services" className="sp-footer-link">Services</a>
              <a href="/#work" className="sp-footer-link">Our Work</a>
              <a href="/#contact" className="sp-footer-link">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
