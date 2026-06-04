import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import imgFormalQuote from '@assets/Formal_Quote_1774258217637.jpeg';
import imgInitialConsult from '@assets/Initial_Consultation_1774258217637.jpeg';
import imgConceptDesign from '@assets/Concept_Design_1774258217636.jpeg';
import imgPlanningApproval from '@assets/Planning_Approval_1774258217638.png';
import imgWorkingDrawings from '@assets/Working_Drawings_1774258217638.jpeg';
import imgThirdParty from '@assets/3rd_Party_Plans_1774258217635.png';
import imgDesignCompliance from '@assets/Design_Compliance_1774258217637.jpeg';
import imgBuildingPermit from '@assets/Building_Permit_1774258217636.jpeg';
import {
  Menu, X, ArrowRight, ArrowUpRight,
  Star, Clock, FileCheck, MapPin, Phone, Mail,
  Facebook, Award, Shield, CheckCircle
} from 'lucide-react';

/* ─── STYLES ──────────────────────────────────────────────────────── */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  ::selection { background: rgba(201,168,76,0.35); color: #1c1812; }
  ::-moz-selection { background: rgba(201,168,76,0.35); color: #1c1812; }

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

  body {
    background: var(--dark);
    color: #1a1b1e;
    font-family: var(--font);
    overflow-x: hidden;
  }

  /* ── Scroll progress ── */
  #scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), #f0c96d);
    z-index: 1000;
    transform-origin: left center;
    width: 100%;
    transform: scaleX(0);
    transition: transform 0.1s linear;
  }

  /* ── Loader ── */
  #pdr-loader {
    position: fixed;
    inset: 0;
    background: var(--dark);
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.8s ease, visibility 0.8s ease;
  }
  #pdr-loader.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .loader-logo {
    height: clamp(112px, 20vw, 192px);
    width: auto;
    opacity: 0;
    animation: loaderFadeIn 0.7s ease 0.2s forwards;
  }
  @keyframes loaderFadeIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* ── Nav ── */
  #pdr-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 500;
    padding: 1.5rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.4s ease, padding 0.4s ease, backdrop-filter 0.4s ease;
  }
  #pdr-nav.scrolled {
    background: rgba(244,245,248,0.96);
    backdrop-filter: blur(12px);
    padding: 1rem 3rem;
    border-bottom: 1px solid rgba(201,168,76,0.2);
    box-shadow: 0 2px 24px rgba(26,27,30,0.07);
  }

  /* ── Nav contact block ── */
  .nav-contact-block {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
    padding: 0 3rem;
  }
  .nav-contact-row {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;
    line-height: 1.5;
    font-weight: 400;
  }
  a.nav-contact-row:hover { color: #fff; }
  #pdr-nav.scrolled .nav-contact-row { color: rgba(26,27,30,0.7); }
  #pdr-nav.scrolled a.nav-contact-row:hover { color: #1a1b1e; }
  @media (max-width: 1024px) { .nav-contact-block { display: none; } }
  #pdr-nav.scrolled .nav-link { color: rgba(28,23,14,0.65); }
  #pdr-nav.scrolled .nav-link:hover,
  #pdr-nav.scrolled .nav-link.active { color: #1c1812; }
  #pdr-nav.scrolled .nav-mobile-btn { color: #1c1812; }
  .nav-wordmark { line-height: 1; }
  .nav-logo-img { height: 122px; width: auto; }
  .nav-wordmark-main { font-size: 1.15rem; font-weight: 700; letter-spacing: 0.04em; display: block; }
  .nav-wordmark-sub { font-size: 0.6rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); display: block; margin-top: 2px; }

  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  @media (max-width: 768px) { .nav-links { display: none; } }

  .nav-link {
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.35s cubic-bezier(0.77,0,0.18,1);
  }
  .nav-link:hover, .nav-link.active { color: #fff; }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }

  .nav-cta {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    border: 1px solid var(--gold-border);
    padding: 0.6rem 1.4rem;
    transition: all 0.3s ease;
  }
  .nav-cta:hover { background: var(--gold); color: var(--dark); border-color: var(--gold); }

  /* ── Mobile menu ── */
  #mobile-menu {
    position: fixed;
    inset: 0;
    background: var(--dark);
    z-index: 490;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    transform: translateX(100%);
    transition: transform 0.6s cubic-bezier(0.77,0,0.18,1);
  }
  #mobile-menu.open { transform: translateX(0); }
  .mobile-link {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: rgba(28,23,14,0.82);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .mobile-link:hover { color: var(--gold); }

  /* ── Marquee ── */
  #marquee {
    background: var(--dark2);
    border-top: 1px solid var(--gold-border);
    border-bottom: 1px solid var(--gold-border);
    overflow: hidden;
    padding: 0.9rem 0;
    white-space: nowrap;
  }
  .marquee-track {
    display: inline-flex;
    animation: marquee 36s linear infinite;
  }
  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0 2rem;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 400;
    color: rgba(26,27,30,0.45);
  }
  .marquee-dot {
    width: 3px; height: 3px;
    background: rgba(26,27,30,0.25);
    border-radius: 50%;
    flex-shrink: 0;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ── Credentials strip ── */
  #credentials-strip {
    background: var(--dark3);
    border-bottom: 1px solid rgba(28,23,14,0.08);
    border-top: 1px solid rgba(28,23,14,0.06);
    padding: 1.1rem 0;
  }
  .credentials-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
  }
  .cred-item {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0 2.2rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,23,14,0.68);
    border-right: 1px solid rgba(28,23,14,0.1);
  }
  .cred-item:last-child { border-right: none; }
  .cred-item svg { color: var(--gold); opacity: 1; flex-shrink: 0; }
  .cred-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0.4;
  }
  .cred-live {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #4ade80;
    letter-spacing: 0.15em;
  }
  .cred-live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    animation: pulseGreen 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes pulseGreen {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ── Nav mobile button ── */
  .nav-mobile-btn {
    display: none;
    background: none;
    border: none;
    color: #fff;
    padding: 0;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .nav-mobile-btn { display: flex; align-items: center; justify-content: center; }
    .nav-links { display: none !important; }
  }

  /* ── Section labels ── */
  .section-eyebrow {
    display: inline-block;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(26,27,30,0.5);
    font-weight: 500;
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 2.5rem;
  }
  .section-eyebrow::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    width: 1.8rem; height: 1px;
    background: rgba(26,27,30,0.3);
    transform: translateY(-50%);
  }
  #hero .section-eyebrow { color: var(--gold); }
  #hero .section-eyebrow::before { background: var(--gold); }
  #footer .section-eyebrow { color: var(--gold); }
  #footer .section-eyebrow::before { background: var(--gold); }

  /* ── Hero ── */
  #hero {
    position: relative;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding-bottom: 8vh;
    color: #fff;
    --gray: rgba(255,255,255,0.72);
  }
  #hero-bg {
    position: absolute;
    inset: -5%;
    width: 110%;
    height: 110%;
    object-fit: cover;
    object-position: center center;
    will-change: transform;
    display: block;
    filter: contrast(0.95) brightness(0.9);
    transform: translateX(8%) scale(1.12);
  }
  #hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(13,13,13,0.88) 0%,
      rgba(13,13,13,0.72) 18%,
      rgba(13,13,13,0.45) 42%,
      rgba(13,13,13,0.85) 75%,
      rgba(13,13,13,1) 100%
    );
  }
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .hero-content { position: relative; z-index: 10; width: 100%; }

  .hero-headline {
    font-size: clamp(2.8rem, 7vw, 7rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    overflow: hidden;
  }

  .headline-word {
    display: inline-block;
    clip-path: inset(0 0 100% 0);
    animation: wordReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
    animation-play-state: paused;
  }
  .headline-word.play { animation-play-state: running; }

  @keyframes wordReveal {
    from { clip-path: inset(0 0 100% 0); transform: translateY(20px); }
    to { clip-path: inset(0 0 0% 0); transform: translateY(0); }
  }

  .hero-sub {
    font-size: clamp(0.75rem, 1.2vw, 0.9rem);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 300;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.4s forwards;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--gold-border);
    padding: 0.4rem 1rem;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0;
    animation: fadeUp 0.8s ease 1.2s forwards;
    margin-bottom: 2rem;
  }

  .hero-btn-wrap {
    display: inline-block;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.6s forwards;
  }
  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 600;
    padding: 1.1rem 2.4rem;
    border: 1px solid var(--gold);
    color: #fff;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: color 0.4s ease;
  }
  .hero-btn-fill {
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.5s cubic-bezier(0.77,0,0.18,1);
    z-index: 0;
  }
  .hero-btn:hover .hero-btn-fill { transform: translateX(0); }
  .hero-btn:hover { color: var(--dark); }
  .hero-btn span, .hero-btn svg { position: relative; z-index: 1; }

  .hero-scroll {
    position: absolute;
    bottom: 2.5rem; left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeIn 1s ease 2s forwards;
  }
  .hero-scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, transparent, var(--gold));
    animation: scrollPulse 2s ease-in-out infinite;
  }
  .hero-scroll-text {
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  @keyframes scrollPulse {
    0%, 100% { transform: scaleY(1); opacity: 0.6; }
    50% { transform: scaleY(1.2); opacity: 1; }
  }

  /* Stats bar */
  #stats-bar {
    background: var(--dark2);
    border-top: 1px solid var(--gold-border);
    border-bottom: 1px solid var(--gold-border);
    padding: 2.5rem 0;
    overflow: hidden;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--gold-border);
  }
  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .stat-cell {
    background: var(--dark2);
    padding: 2rem 2.5rem;
    text-align: center;
    position: relative;
  }
  .stat-num {
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 800;
    line-height: 1;
    color: #1a1b1e;
    letter-spacing: -0.02em;
    display: block;
    margin-bottom: 0.5rem;
  }
  .stat-label {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gray);
  }

  /* ── Grid background ── */
  .section-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.045) 1px, transparent 1px);
    background-size: 56px 56px;
    pointer-events: none;
    z-index: 0;
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
  }

  /* ── Services ── */
  #services { padding: 8rem 0; background: var(--dark); position: relative; overflow: hidden; }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 900px) { .service-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .service-grid { grid-template-columns: 1fr; } }

  .service-card {
    background: var(--dark3);
    border: 1px solid rgba(28,23,14,0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.4s ease, transform 0.4s ease;
    display: flex;
    flex-direction: column;
  }
  .service-card:hover {
    border-color: var(--gold-border);
    transform: translateY(-4px);
  }
  .service-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.77,0,0.18,1);
  }
  .service-card:hover::after { transform: scaleX(1); }

  .service-img-wrap {
    position: relative;
    overflow: hidden;
    height: 200px;
    flex-shrink: 0;
  }
  .service-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
    filter: grayscale(0.3) brightness(0.85);
  }
  .service-card:hover .service-img {
    transform: scale(1.07);
    filter: grayscale(0) brightness(0.95);
  }
  .service-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(13,13,13,0.7) 100%);
  }
  .service-img-num {
    position: absolute;
    top: 1rem; left: 1.25rem;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.75);
    font-weight: 500;
    background: rgba(13,13,13,0.7);
    padding: 0.25rem 0.6rem;
    backdrop-filter: blur(4px);
  }

  .service-body {
    padding: 1.75rem 2rem 2.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .service-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }
  .service-desc { font-size: 0.84rem; color: var(--gray); line-height: 1.75; font-weight: 300; flex: 1; }
  .service-arrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 1.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #1a1b1e;
    opacity: 0;
    transform: translateX(-6px);
    transition: all 0.4s ease;
  }
  .service-card:hover .service-arrow { opacity: 1; transform: translateX(0); }

  /* ── Work Gallery ── */
  #work { padding: 8rem 0; background: var(--dark2); overflow: hidden; }

  .gallery-columns {
    columns: 3;
    column-gap: 6px;
  }
  @media (max-width: 1100px) { .gallery-columns { columns: 2; } }
  @media (max-width: 600px) { .gallery-columns { columns: 1; } }

  .gallery-item {
    break-inside: avoid;
    margin-bottom: 6px;
    position: relative;
    overflow: hidden;
    display: block;
    cursor: pointer;
    background: var(--dark3);
  }
  .gallery-item img {
    display: block;
    width: 100%;
    height: auto;
    filter: grayscale(100%);
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease;
    will-change: transform;
  }
  .gallery-shimmer {
    position: absolute;
    inset: 0;
    border: 2px solid transparent;
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
    pointer-events: none;
    z-index: 1;
  }
  .gallery-item:hover img { transform: scale(1.05); filter: grayscale(0%); }
  .gallery-item:hover .gallery-shimmer {
    border-color: rgba(201,168,76,0.45);
    box-shadow: inset 0 0 40px rgba(201,168,76,0.06);
  }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    cursor: zoom-out;
    animation: lbFadeIn 0.25s ease;
  }
  @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .lightbox-img {
    max-width: 90vw;
    max-height: 88vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 0 80px rgba(201,168,76,0.15), 0 30px 80px rgba(0,0,0,0.7);
    animation: lbZoomIn 0.3s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
  }
  @keyframes lbZoomIn { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .lightbox-close {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    z-index: 10000;
    line-height: 1;
  }
  .lightbox-close:hover { background: rgba(201,168,76,0.3); border-color: rgba(201,168,76,0.5); }

  /* ── Why ── */
  #why { padding: 8rem 0; background: var(--dark); position: relative; overflow: hidden; }

  .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr; gap: 3rem; } }

  .why-pillars { display: flex; flex-direction: column; gap: 0; }
  .pillar {
    padding: 2rem 0;
    border-bottom: 1px solid rgba(28,23,14,0.1);
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    position: relative;
    overflow: hidden;
    transition: padding-left 0.4s ease;
  }
  .pillar::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 2px; height: 0;
    background: var(--gold);
    transition: height 0.5s cubic-bezier(0.77,0,0.18,1);
  }
  .pillar:hover { padding-left: 1rem; }
  .pillar:hover::before { height: 100%; }
  .pillar-icon { color: #1a1b1e; flex-shrink: 0; margin-top: 2px; opacity: 0.6; }
  .pillar-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem; }
  .pillar-desc { font-size: 0.82rem; color: var(--gray); line-height: 1.7; font-weight: 300; }

  .review-badge {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid var(--gold-border);
    padding: 1.25rem 2rem;
    background: var(--gold-dim);
    margin-bottom: 3rem;
  }
  .review-stars { display: flex; gap: 3px; color: var(--gold); }
  .review-score { font-size: 2.5rem; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
  .review-label { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); }

  /* ── CTA Band ── */
  .cta-band {
    padding: 0;
    background: var(--dark);
    position: relative;
    overflow: hidden;
  }
  .cta-band-rule {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-border) 30%, var(--gold-border) 70%, transparent);
  }
  .cta-band-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }
  @media (max-width: 800px) {
    .cta-band-inner { flex-direction: column; align-items: flex-start; padding: 4rem 1.5rem; gap: 2rem; }
  }
  .cta-band-heading {
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0.5rem 0 1rem;
  }
  .cta-band-sub {
    font-size: 0.85rem;
    color: var(--gray);
    letter-spacing: 0.08em;
    margin: 0;
  }
  .cta-band-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    flex-shrink: 0;
  }
  .cta-band-btn {
    white-space: nowrap;
    font-size: 0.8rem;
    padding: 1rem 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gold);
    color: #0d0d0d;
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: opacity 0.2s ease;
  }
  .cta-band-btn:hover { opacity: 0.88; }
  .cta-band-call {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gold);
    text-decoration: none;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    font-weight: 500;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
  .cta-band-call:hover { opacity: 1; }

  /* ── Process Timeline ── */
  #process { padding: 8rem 0; background: var(--dark2); position: relative; }

  /* ── Process Timeline (Aceternity layout) ── */
  .process-tl-rows {
    position: relative;
    padding-bottom: 5rem;
  }

  .process-tl-row {
    display: flex;
    justify-content: flex-start;
    padding-top: 2.5rem;
  }
  .process-tl-row:first-child { padding-top: 0; }
  @media (min-width: 768px) {
    .process-tl-row { padding-top: 9rem; gap: 2.5rem; }
    .process-tl-row:first-child { padding-top: 0; }
  }

  /* Left sticky column */
  .process-tl-sticky {
    position: sticky;
    top: 40vh;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    z-index: 40;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
  }
  @media (min-width: 768px) {
    .process-tl-sticky { flex-direction: row; max-width: 20rem; }
  }

  /* Circular dot on the line */
  .process-tl-dot {
    position: absolute;
    left: 0.75rem;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background: var(--dark2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .process-tl-dot-inner {
    height: 0.875rem;
    width: 0.875rem;
    border-radius: 50%;
    background: rgba(26,27,30,0.1);
    border: 1px solid rgba(26,27,30,0.3);
  }

  /* Big step number — desktop only */
  .process-tl-left-num {
    display: none;
    font-size: clamp(2.5rem, 4vw, 3.75rem);
    font-weight: 800;
    color: rgba(26,27,30,0.15);
    padding-left: 5rem;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  @media (min-width: 768px) { .process-tl-left-num { display: block; } }

  /* Right content column */
  .process-tl-content {
    position: relative;
    padding-left: 5rem;
    padding-right: 1rem;
    width: 100%;
  }
  @media (min-width: 768px) { .process-tl-content { padding-left: 1rem; } }

  /* Step number — mobile only */
  .process-tl-num-mob {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: rgba(26,27,30,0.2);
    margin-bottom: 0.75rem;
  }
  @media (min-width: 768px) { .process-tl-num-mob { display: none; } }

  .process-tl-step-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1c1812;
    margin-bottom: 0.65rem;
    letter-spacing: -0.02em;
  }
  .process-tl-step-desc {
    font-size: 0.875rem;
    color: var(--gray);
    line-height: 1.85;
    margin-bottom: 1.75rem;
  }

  /* 2-col image placeholder grid */
  .process-tl-img-wrap {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    background: var(--dark3);
    height: 14rem;
  }
  .process-tl-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .process-tl-img-wrap:hover img { transform: scale(1.04); }
  @media (min-width: 768px) { .process-tl-img-wrap { height: 18rem; } }
  @media (min-width: 1024px) { .process-tl-img-wrap { height: 22rem; } }

  /* Animated line */
  .process-tl-line-wrap {
    position: absolute;
    left: 2rem;
    top: 0;
    overflow: hidden;
    width: 2px;
  }
  .process-tl-line-bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(26,27,30,0.12) 10%, rgba(26,27,30,0.12) 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  }

  /* ── About ── */
  #about { padding: 8rem 0; background: var(--dark); overflow: hidden; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
  @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; gap: 3rem; } }

  .about-quote {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 300;
    font-style: italic;
    line-height: 1.5;
    color: rgba(28,23,14,0.82);
    padding-left: 2rem;
    border-left: 2px solid var(--gold);
    margin-bottom: 2.5rem;
    letter-spacing: -0.01em;
  }
  .about-body { font-size: 0.92rem; color: var(--gray); line-height: 1.9; font-weight: 300; margin-bottom: 2.5rem; }

  .about-contact-row { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
  .about-contact-link {
    display: inline-flex; align-items: center; gap: 0.75rem;
    font-size: 0.85rem; color: rgba(28,23,14,0.6);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .about-contact-link:hover { color: var(--gold); }
  .about-contact-link svg { color: #1a1b1e; opacity: 0.45; flex-shrink: 0; }

  .about-img-wrap { position: relative; }
  .about-img-frame {
    position: relative;
    overflow: hidden;
    filter: grayscale(1);
    transition: filter 0.8s ease;
  }
  .about-img-frame:hover { filter: grayscale(0); }
  .about-img-frame img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }
  .about-img-badge {
    position: absolute;
    bottom: -1px; left: -1px;
    background: var(--gold);
    color: #1c1812;
    padding: 1.25rem 1.75rem;
  }
  .about-img-badge-name { font-size: 1rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
  .about-img-badge-title { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 1; margin-top: 5px; }

  /* Blueprint decoration */
  .blueprint-deco {
    position: absolute;
    pointer-events: none;
    opacity: 0.08;
  }

  /* ── Contact ── */
  #contact { padding: 8rem 0; background: var(--dark2); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; }
  @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }

  .contact-headline { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1rem; }
  .contact-sub { font-size: 0.9rem; color: var(--gray); font-weight: 300; margin-bottom: 3rem; }

  .contact-detail { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; }
  .contact-detail-icon { color: #1a1b1e; opacity: 0.5; flex-shrink: 0; margin-top: 2px; }
  .contact-detail-label { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gray); margin-bottom: 0.3rem; }
  .contact-detail-value { font-size: 1.1rem; font-weight: 300; }
  .contact-detail-value a { color: #1c1812; text-decoration: none; transition: color 0.3s ease; }
  .contact-detail-value a:hover { color: var(--gold); }

  /* Form */
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gray); }
  .form-input, .form-select, .form-textarea {
    background: var(--dark3);
    border: 1px solid rgba(28,23,14,0.14);
    padding: 1rem 1.25rem;
    color: #1c1812;
    font-family: var(--font);
    font-size: 0.9rem;
    transition: border-color 0.3s ease, background 0.3s ease;
    outline: none;
    width: 100%;
  }
  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1.25rem center;
    padding-right: 3rem;
    cursor: pointer;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--gold);
    background: #fff;
  }
  .form-textarea { resize: none; }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(28,23,14,0.3); }

  .form-submit {
    background: var(--gold);
    color: #1c1812;
    border: none;
    padding: 1.2rem 2.5rem;
    font-family: var(--font);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: background 0.3s ease, transform 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .form-submit:hover { background: #b89440; }
  .form-submit:active { transform: scale(0.98); }

  /* ── Social buttons ── */
  .social-btn {
    width: 2.5rem; height: 2.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); }
  .footer-copy { font-size: 0.65rem; color: rgba(255,255,255,0.45); letter-spacing: 0.1em; }

  /* ── Reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  /* ── Utils ── */
  .container { max-width: 1320px; margin: 0 auto; padding: 0 3rem; }
  @media (max-width: 600px) { .container { padding: 0 1.5rem; } }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Noise overlay */
  #noise {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 180px 180px;
  }

  /* ── Typed text ── */
  .typed-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--gold);
    margin-left: 2px;
    vertical-align: middle;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ── Sticky CTA ── */
  #sticky-cta {
    position: fixed;
    bottom: max(2rem, env(safe-area-inset-bottom, 2rem));
    right: 2rem;
    z-index: 800;
    transform: translateY(120px);
    opacity: 0;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease;
    pointer-events: none;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  #sticky-cta.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .sticky-cta-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: var(--gold);
    color: #1c1812;
    text-decoration: none;
    padding: 0.9rem 1.6rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    box-shadow: 0 8px 32px rgba(201,168,76,0.35);
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  }
  .sticky-cta-btn:hover {
    background: #b89440;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(201,168,76,0.5);
  }
  @media (max-width: 768px) {
    #sticky-cta {
      right: 0; left: 0; bottom: 0;
      flex-direction: row;
      gap: 0;
      border-top: 1px solid rgba(201,168,76,0.25);
      box-shadow: 0 -4px 24px rgba(26,27,30,0.12);
    }
    .sticky-cta-btn {
      flex: 1;
      padding: 1.1rem 1rem;
      font-size: 0.82rem;
      letter-spacing: 0.1em;
      border-radius: 0;
      box-shadow: none;
    }
    .sticky-cta-btn:hover { transform: none; }
  }
  .sticky-cta-pulse {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #1c1812;
    position: relative;
    flex-shrink: 0;
  }
  .sticky-cta-pulse::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid #1c1812;
    animation: pulseRing 1.5s ease-out infinite;
    opacity: 0;
  }
  @keyframes pulseRing {
    0% { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  /* ── Testimonials ── */
  #testimonials { padding: 8rem 0; background: var(--dark2); overflow: hidden; }

  .testi-columns-wrap {
    display: flex;
    justify-content: center;
    gap: 1.25rem;
    margin-top: 4rem;
    max-height: 680px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  }

  .testi-column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    flex-shrink: 0;
    width: 340px;
  }
  @media (max-width: 1100px) {
    .testi-column:nth-child(3) { display: none; }
  }
  @media (max-width: 740px) {
    .testi-column:nth-child(2) { display: none; }
    .testi-column { width: min(340px, 90vw); }
  }

  .testi-card {
    background: var(--dark3);
    border: 1px solid rgba(28,23,14,0.1);
    padding: 2rem;
    position: relative;
    flex-shrink: 0;
    transition: border-color 0.4s ease;
  }
  .testi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: var(--gold);
    transition: height 0.5s cubic-bezier(0.77,0,0.18,1);
  }
  .testi-card:hover { border-color: var(--gold-border); }
  .testi-card:hover::before { height: 100%; }

  .testi-quote-mark {
    font-size: 3rem;
    line-height: 0.9;
    color: #1a1b1e;
    opacity: 0.12;
    font-family: Georgia, serif;
    margin-bottom: 0.75rem;
    display: block;
  }
  .testi-text {
    font-size: 0.88rem;
    line-height: 1.75;
    color: rgba(28,23,14,0.68);
    font-weight: 300;
    font-style: italic;
    margin-bottom: 1.5rem;
  }
  .testi-stars { display: flex; gap: 3px; color: var(--gold); margin-bottom: 1.25rem; }
  .testi-author-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(28,23,14,0.1);
  }
  .testi-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--gold-border);
    flex-shrink: 0;
  }
  .testi-name { font-size: 0.88rem; font-weight: 700; margin-bottom: 0.15rem; }
  .testi-meta { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(26,27,30,0.45); }

  /* ── Suburbs ── */
  #suburbs { padding: 8rem 0; background: var(--dark); }
  .suburbs-inner {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 6rem;
    align-items: start;
  }
  @media (max-width: 900px) { .suburbs-inner { grid-template-columns: 1fr; gap: 3rem; } }
  .suburbs-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  .suburb-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(28,23,14,0.12);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(28,23,14,0.52);
    cursor: default;
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .suburb-tag:hover { border-color: var(--gold-border); color: var(--gold); }
  .suburb-tag-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0.5;
    flex-shrink: 0;
  }
  .suburbs-radius-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    border: 1px solid rgba(26,27,30,0.15);
    padding: 0.8rem 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(26,27,30,0.55);
  }

  /* ── Footer 3-col ── */
  #footer {
    background: #1c1a14;
    border-top: 1px solid var(--gold-border);
    padding: 5rem 0 3rem;
    color: rgba(255,255,255,0.85);
    --gray: rgba(255,255,255,0.58);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.2fr;
    gap: 4rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 2.5rem;
  }
  @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
  .footer-brand-name { font-size: 1.1rem; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 0.5rem; }
  .footer-brand-tag { font-size: 0.8rem; color: var(--gray); font-weight: 300; line-height: 1.7; max-width: 260px; margin-bottom: 1.75rem; }
  .footer-social-row { display: flex; gap: 0.75rem; }
  .footer-col-title {
    font-size: 0.6rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .footer-col-title::before {
    content: '';
    display: inline-block;
    width: 1.2rem; height: 1px;
    background: var(--gold);
  }
  .footer-nav-links { display: flex; flex-direction: column; gap: 0.85rem; }
  .footer-nav-link {
    font-size: 0.85rem;
    color: var(--gray);
    text-decoration: none;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .footer-nav-link:hover { color: var(--gold); }
  .footer-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }
  .footer-contact-item svg { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
  .footer-contact-label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); margin-bottom: 0.25rem; }
  .footer-contact-value { font-size: 0.85rem; color: rgba(255,255,255,0.75); }
  .footer-contact-value a { color: rgba(255,255,255,0.75); text-decoration: none; transition: color 0.3s ease; }
  .footer-contact-value a:hover { color: var(--gold); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-copy { font-size: 0.65rem; color: rgba(255,255,255,0.45); letter-spacing: 0.1em; }
  .footer-back-top {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gray);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
    cursor: pointer;
    background: none;
    border: none;
    font-family: var(--font);
  }
  .footer-back-top:hover { color: var(--gold); }

  /* ─── MOBILE IMPROVEMENTS ─────────────────────────────────────── */
  @media (max-width: 768px) {
    /* Nav */
    #pdr-nav { padding: 0.9rem 1.25rem; justify-content: center; }
    #pdr-nav.scrolled { padding: 0.7rem 1.25rem; }
    .nav-wordmark { flex: unset; text-align: center; }
    .nav-logo-img { height: 100px; width: auto; }
    .nav-mobile-btn { position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); }

    /* Container */
    .container { padding: 0 1.25rem; }

    /* Section vertical spacing */
    #services, #work, #why, #testimonials, #about, #contact, #process, #suburbs { padding: 4.5rem 0; }
    #stats-bar { padding: 1.75rem 0; }
    #footer { padding: 3.5rem 0 2rem; }

    /* Hero */
    #hero { padding-bottom: 5vh; min-height: 100svh; }
    .hero-headline { font-size: clamp(2.5rem, 10vw, 4.5rem); }
    .hero-sub { font-size: 0.7rem; letter-spacing: 0.2em; }
    .hero-scroll { display: none; }
    .hero-badge { font-size: 0.6rem; }

    /* Credentials strip — horizontal scroll, no wrap */
    .credentials-inner {
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding: 0 1.25rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .credentials-inner::-webkit-scrollbar { display: none; }
    .cred-item { white-space: nowrap; flex-shrink: 0; padding: 0 1rem; font-size: 0.65rem; }

    /* Stats */
    .stat-cell { padding: 1.5rem 1rem; }
    .stat-num { font-size: clamp(2rem, 8vw, 3rem); }

    /* Services */
    .service-grid { gap: 1rem; }
    .service-body { padding: 1.25rem 1.25rem 1.75rem; }

    /* Gallery */
    .gallery-columns { column-gap: 4px; }
    .gallery-item { margin-bottom: 4px; }

    /* Why — review badge */
    .review-badge { padding: 1rem 1.25rem; width: 100%; box-sizing: border-box; }

    /* CTA band */
    .cta-band-inner { padding: 3rem 1.25rem; }
    .cta-band-actions { width: 100%; }
    .cta-band-btn { width: 100%; justify-content: center; }

    /* Testimonials */
    .testi-columns-wrap { margin-top: 2.5rem; }

    /* About */
    .about-img-wrap > div[style*="top: -20px"] { display: none; }

    /* Contact */
    .contact-headline { font-size: clamp(1.8rem, 7vw, 2.8rem); }
    .contact-detail-value { font-size: 0.95rem; }

    /* Form */
    .form-submit { width: 100%; }

    /* Sticky CTA */
    #sticky-cta { right: 1rem; }
    .sticky-cta-btn { padding: 0.8rem 1.2rem; font-size: 0.68rem; letter-spacing: 0.12em; }

    /* Footer */
    .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
    .footer-grid { gap: 2rem; }

    /* Mobile menu */
    .mobile-link { font-size: 2rem; }

    /* Sections — section-eyebrow spacing */
    .section-eyebrow { margin-bottom: 1rem; }
  }

  @media (max-width: 480px) {
    /* Nav logo */
    .nav-logo-img { height: 100px; width: auto; }

    /* Tighter sections */
    #services, #work, #why, #testimonials, #about, #contact, #process, #suburbs { padding: 3.5rem 0; }

    /* Hero */
    .hero-headline { font-size: clamp(2.2rem, 11vw, 3.5rem); }
    .hero-btn { padding: 1rem 1.75rem; font-size: 0.7rem; }

    /* Stats */
    .stat-cell { padding: 1.1rem 0.75rem; }
    .stat-num { font-size: 1.9rem; }
    .stat-label { font-size: 0.58rem; }

    /* Service card image */
    .service-img-wrap { height: 160px; }

    /* About badge */
    .about-img-badge { padding: 1rem 1.25rem; }
    .about-img-badge-name { font-size: 0.88rem; }
    .about-img-badge-title { font-size: 0.65rem; }

    /* Review badge */
    .review-score { font-size: 2rem; }

    /* Contact details */
    .contact-headline { font-size: clamp(1.6rem, 9vw, 2.4rem); }

    /* Footer bottom */
    .footer-copy { font-size: 0.6rem; }

    /* Testimonials column max-height */
    .testi-columns-wrap { max-height: 560px; }

    /* Process — stack vertically on mobile */
    .process-tl-row { flex-direction: column; gap: 1rem; padding-top: 2.5rem; }
    .process-tl-sticky { display: none; }
    .process-tl-content { padding-left: 0; }
    .process-tl-num-mob { font-size: 1.25rem; color: var(--gold); opacity: 0.8; margin-bottom: 0.5rem; }
    .process-tl-line-wrap { display: none; }
  }
`;

/* ─── COUNTER HOOK ───────────────────────────────────────────────── */
/* ─── SPLIT TEXT ─────────────────────────────────────────────────── */
function SplitText({ text, style }: { text: string; style?: React.CSSProperties }) {
  const words = text.split(' ');
  return (
    <motion.span
      style={{ display: 'inline', ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block', marginRight: '0.28em' }}
            variants={{
              hidden: { y: '105%', opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function useCounter(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

/* ─── DATA ───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2F6049763deb68490486b31b8246cd37d6?format=webp&width=700',
    title: 'Residential Design',
    desc: 'Full home design from initial concept sketches through to council-approved documentation. We work closely with you to translate your vision into precise, buildable drawings that meet all WA R-Code requirements.',
    num: '01',
    slug: 'residential-design',
  },
  {
    img: '/svc-construction-plans.jpg',
    title: 'Construction Drawings',
    desc: 'Comprehensive working drawing sets covering floor plans, elevations, sections, site plans and structural details. Every package is built to satisfy building permit and local authority requirements from the outset.',
    num: '02',
    slug: 'construction-drawings',
  },
  {
    img: '/svc-multi-unit.jpg',
    title: 'Multi-Unit Development',
    desc: 'Duplex, triplex, grouped dwelling and apartments designed to maximise yield within your site\'s development potential. We navigate WAPC and local planning policy to make your investment work harder.',
    num: '03',
    slug: 'multi-unit-development',
  },
  {
    img: '/svc-renovations.jpg',
    title: 'Renovation & Extension',
    desc: 'Thoughtful alterations and additions that respect your home\'s existing character while delivering the space you need. From rear extensions to full internal reconfigurations and second-storey additions.',
    num: '04',
    slug: 'renovation-extension',
  },
  {
    img: '/svc-granny-flat.jpg',
    title: 'Granny Flats',
    desc: 'Ancillary dwelling designs that comply with Perth\'s R-Codes and maximise liveable space within the allowable footprint. An efficient solution for extended family accommodation or additional rental income.',
    num: '05',
    slug: 'granny-flats',
  },
  {
    img: '/svc-cafs.webp',
    title: 'Carports, Alfrescos & Sheds',
    desc: 'Permit-ready drawings for carports, alfresco entertainment areas, fencing and garden sheds. We handle the documentation so your builder can get on site without delays or council back-and-forth.',
    num: '06',
    slug: 'carports-alfrescos-sheds',
  },
];

const PROJECTS = [
  '/work/hf_20260323_081853_a9abd25a-13fd-4200-8234-27d580877cbc.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_a30a969b7eec4e6883563ee4cd4697cd.webp',
  '/work/hf_20260323_082012_96376417-4a22-4cf9-b495-bc0e126643fc.jpeg',
  '/work/hf_20260323_081901_ea00b3e7-6c73-498c-9617-33bcd86db8e1.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_6049763deb68490486b31b8246cd37d6.webp',
  '/work/hf_20260323_082031_7a2112cc-742e-4787-b400-e45ba544c2da.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_83cae82e0ee742dda2d6173e8479c294.webp',
  '/work/hf_20260323_081937_8b6a4a00-10f2-4619-8715-7e7d2b32829d.jpeg',
  '/work/hf_20260323_082002_4f2a3604-b204-46be-9e84-ffb7015998e4.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_33c2aa76642549618267469fa5e26c21.webp',
  '/work/hf_20260323_082024_45687288-c047-4cdd-be66-e2c8b9d487ac.jpeg',
  '/work/hf_20260323_082031_72a2b3f0-7978-4bf4-abbe-bb9d0bd083ff.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_770263cef6b341a1ae40de5ccb00c55a.webp',
  '/work/hf_20260323_082753_0566c62d-774a-44a2-96fb-d4a9c1b50038.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_2f9c9e1825124fbeac92185e4bc780fd.webp',
  '/work/hf_20260323_082804_3582fc46-accb-4f6c-9ed9-2227fe2a2d9e.jpeg',
  '/work/hf_20260323_083114_e23f4dc5-7a4e-4774-b92d-fd0a9e38fd70.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_961edb2bb9604a9ca51df1fbc2f4af5c.webp',
  '/work/hf_20260323_083404_de107e6d-d2b2-4982-bd20-f394fc950ed7.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_181b6ffbcaa74668ba08247fed116f79.webp',
  '/work/hf_20260323_083709_1efd4373-03c7-4836-bcea-4a12bab0c4b7.jpeg',
  '/work/hf_20260323_081943_7c9bd4c9-38a1-46ad-9e32-af14538bd654.png',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_e5cba90f172f410b9a2994fe505853ac.webp',
  '/work/hf_20260323_081943_95bd6880-0d6e-4d43-b73a-07adc17a6c1e.png',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_e3137891e848424087fc94cb31d18b6b.webp',
  '/work/hf_20260323_081953_857763cc-1f2d-4cc6-8b83-332ffc92a278.jpeg',
  '/work/assets_0df748b9b86d4bc5af1be6fda4f6f0d0_fbf95bcdfe2e444fbd7917fac577ca24.webp',
  '/work/hf_20260323_082007_1f24dd96-c285-4c12-98e3-c159886e9828.jpeg',
  '/work/nomadic-house.png',
];

const PROCESS = [
  {
    num: '01', title: 'Formal Quote',
    desc: 'Before a single line is drawn, you receive a clear, itemised written quote covering every stage of the project — design fees, documentation, authority lodgements, and estimated timeframes. There are no hidden costs and no surprises. You review the scope, ask any questions, and only proceed when you\'re completely comfortable. This upfront transparency sets the tone for the entire project and ensures you have full confidence before committing.',
    img: imgFormalQuote,
  },
  {
    num: '02', title: 'Initial Consultation',
    desc: 'We sit down together — in person or virtually — to explore your vision in depth. We discuss how you live, what you need now and in the future, your block\'s constraints and opportunities, council requirements, and your budget. Notes are taken, questions are asked, and by the end of the meeting a detailed design brief is agreed upon. This brief becomes the single reference point that keeps the entire project on track from concept through to permit.',
    img: imgInitialConsult,
  },
  {
    num: '03', title: 'Concept Design',
    desc: 'Using the agreed brief, preliminary floor plans and elevations are sketched and developed. You\'re presented with a concept that addresses your site, your lifestyle, and your budget — then we refine it together. Rooms are resized, orientations adjusted, outdoor connections considered. We iterate until every space feels right and the home works exactly the way you want it to. Only once you\'re fully satisfied does the design move forward.',
    img: imgConceptDesign,
  },
  {
    num: '04', title: 'Planning Approval',
    desc: 'Some projects — particularly those that vary from standard R-Code requirements or fall within specific overlays — require a Development Application (DA) before construction documents can be finalised. We assess whether a DA is needed, prepare all required documentation including site plans, design statements, and neighbour notification materials, and lodge the application directly with the relevant local government authority. We manage all correspondence and respond to any queries from the planning officer, steering the application through to written approval.',
    img: imgPlanningApproval,
  },
  {
    num: '05', title: 'Working Drawings',
    desc: 'This is the full technical documentation package your builder and certifier need to price, approve, and construct your home. It includes dimensioned floor plans, all elevations, cross-sections, roof plan, site plan, retaining wall details, window and door schedules, and wet area waterproofing notes. Electrical and plumbing layouts are included where required. Every drawing is produced to Australian standard conventions and coordinated to be consistent across the entire set — eliminating conflicts on site before they happen.',
    img: imgWorkingDrawings,
  },
  {
    num: '06', title: '3rd Party Plans',
    desc: 'Most residential projects require input from specialists beyond the draftsman. We coordinate directly with structural engineers, geotechnical consultants, energy efficiency assessors (NatHERS), surveyors, and where needed, bushfire attack level (BAL) assessors. Their reports and drawings are reviewed, cross-checked against our documentation, and incorporated into the full drawing set. You don\'t need to manage multiple consultants — we handle the coordination so the final package is complete, consistent, and ready for lodgement.',
    img: imgThirdParty,
  },
  {
    num: '07', title: 'Design Compliance',
    desc: 'A Certificate of Design Compliance (CDC) is a mandatory document confirming that your design satisfies all requirements of the National Construction Code (NCC) and applicable Western Australian R-Codes. We work with a registered private building certifier who reviews the complete documentation set, raises any technical queries, and issues the CDC once satisfied. This step is a legal requirement for issuing a building permit in WA and cannot be bypassed — having a thorough, well-prepared drawing set at this stage avoids costly delays.',
    img: imgDesignCompliance,
  },
  {
    num: '08', title: 'Building Permit',
    desc: 'With the CDC in hand and all documentation complete, we compile and lodge the formal Building Permit Application with the local government authority. We liaise with the certifier throughout the assessment period, responding promptly to any technical queries or requests for additional information. Once the permit is granted, you receive the stamped drawings and permit documentation — everything your builder needs to legally commence construction. From this point, your home moves from paper to reality.',
    img: imgBuildingPermit,
  },
];

const TESTIMONIALS = [
  {
    text: "If you need a draftsman, look no further. Patrick is amazing to work with. He took my rough sketches and ideas and turned them into professional permit ready plans. He was so patient and made the entire process stress-free. Highly Recommended.",
    name: 'Sukhpal Singh',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Sukhpal+Singh&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "I would like to express my gratitude to Patrick for efficiently completing all my applications at a minimal cost and within a remarkably short timeframe. Despite being unable to find anyone willing to meet my deadline elsewhere, Patrick delivered exceptional results, demonstrating his expertise. I highly recommend his services.",
    name: 'Najib Sakhizada',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Najib+Sakhizada&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "One of the best services here in Perth. I had the opportunity to work with him and it was a very pleasant experience. He answered all my questions in a very good manner, always with a positive attitude. Highly recommended.",
    name: 'Stefano Hernandez-Morey',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Stefano+Hernandez-Morey&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Patrick and team were great to deal with, from start to finish nothing was or has been a chore. Will always recommend their service to anyone in need. Highly recommend!",
    name: 'Chad Mews',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Chad+Mews&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Patrick clearly understood my design requirement, has competent complimentary professionals, and is prompt in dealing with variations. Excellent service provided!",
    name: 'Tim Smith',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Tim+Smith&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "We find Patrick's work and detail to be comprehensive and his knowledge of drafting is excellent.",
    name: 'Mitch T',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Mitch+T&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Easy to deal with, very professional and plans are spot on. Would not use anyone else.",
    name: 'Shenol Arslanovski',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Shenol+Arslanovski&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "An amazing young man — always helps you with great patience. I would recommend this company without hesitation. Would definitely build again.",
    name: 'Alem Basagic',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Alem+Basagic&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Purpose driven designs with exceptional eye for detail.",
    name: 'Hamish Laidlaw',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Hamish+Laidlaw&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Patrick was very professional and very helpful. Highly recommended.",
    name: 'Mimi Dalipova',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Mimi+Dalipova&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Great service, I highly recommend. Job was done fast and top quality.",
    name: 'Sebastian O',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Sebastian+O&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Amazing work, a pleasure to work with.",
    name: 'Gabriel Beliti',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Gabriel+Beliti&background=1a1a1a&color=c9a84c&size=80',
  },
  {
    text: "Efficient, quality service.",
    name: 'Sam Smith',
    role: 'Google Review',
    image: 'https://ui-avatars.com/api/?name=Sam+Smith&background=1a1a1a&color=c9a84c&size=80',
  },
];

const SUBURBS = [
  'South Perth', 'Como', 'Applecross', 'Nedlands', 'Fremantle', 'Cottesloe',
  'Subiaco', 'Claremont', 'Dalkeith', 'Peppermint Grove', 'Mt Lawley', 'Leederville',
  'Shenton Park', 'Floreat', 'Wembley', 'Victoria Park', 'Burswood', 'Rivervale',
  'Canning Vale', 'Willetton', 'Booragoon', 'Murdoch', 'Joondalup', 'Osborne Park',
];

const TYPED_PHRASES = [
  'Custom Home Design',
  'Dual Occupancy',
  'Renovation & Extension',
  'Granny Flat Design',
  'Construction Drawings',
  'Council Approvals',
];

const HERO_PHRASES = [
  'Granny Flat.',
  'Custom Home.',
  'Home Extension.',
  'Duplex.',
  'Renovation.',
  'New Build.',
];

/* ─── TESTIMONIALS COLUMN ────────────────────────────────────────── */
function TestimonialsColumn({
  testimonials,
  duration = 15,
  className,
}: {
  testimonials: typeof TESTIMONIALS;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`testi-column${className ? ` ${className}` : ''}`} style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '1.25rem' }}
      >
        {[...Array(2)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <span className="testi-quote-mark">&ldquo;</span>
                <p className="testi-text">{t.text}</p>
                <div className="testi-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={11} fill="#c9a84c" color="#c9a84c" />)}
                </div>
                <div className="testi-author-row">
                  <img src={t.image} alt={t.name} className="testi-avatar" loading="lazy" />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-meta">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── PROCESS TIMELINE ──────────────────────────────────────────── */
function BorderTrail({ size = 120, duration = 6 }: { size?: number; duration?: number }) {
  return (
    <div style={{
      pointerEvents: 'none',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      border: '1px solid transparent',
      WebkitMaskClip: 'padding-box, border-box',
      WebkitMaskComposite: 'destination-in',
      maskClip: 'padding-box, border-box',
      maskComposite: 'intersect',
      WebkitMaskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
      maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
    }}>
      <motion.div
        style={{
          position: 'absolute',
          aspectRatio: '1',
          width: size,
          background: 'transparent',
          offsetPath: `rect(0 auto auto 0 round 6px)`,
          boxShadow: `0 0 ${size * 0.5}px ${size * 0.25}px rgba(201,168,76,0.55), 0 0 ${size}px ${size * 0.5}px rgba(201,168,76,0.25), 0 0 ${size * 1.5}px ${size * 0.75}px rgba(201,168,76,0.08)`,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration, ease: 'linear' }}
      />
    </div>
  );
}

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div ref={ref} className="process-tl-rows">

        {PROCESS.map((step, i) => (
          <motion.div
            key={i}
            className="process-tl-row"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
          >

            {/* ── Left sticky label ── */}
            <div className="process-tl-sticky">
              <div className="process-tl-dot">
                <div className="process-tl-dot-inner" />
              </div>
              <span className="process-tl-left-num">{step.num}</span>
            </div>

            {/* ── Right content ── */}
            <div className="process-tl-content">
              <span className="process-tl-num-mob">{step.num}</span>
              <h3 className="process-tl-step-name">{step.title}</h3>
              <p className="process-tl-step-desc">{step.desc}</p>
              <div className="process-tl-img-wrap">
                <img src={step.img} alt={step.title} loading="lazy" />
                <BorderTrail size={140} duration={7} />
              </div>
            </div>

          </motion.div>
        ))}

        {/* ── Animated vertical line ── */}
        <div className="process-tl-line-wrap" style={{ height: height + 'px' }}>
          <div className="process-tl-line-bg" style={{ height: '100%' }} />
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '2px',
              borderRadius: '9999px',
              background: 'linear-gradient(to bottom, rgba(26,27,30,0.4), rgba(26,27,30,0.15), transparent)',
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>

      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [lightbox]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [heroPhaseIdx, setHeroPhaseIdx] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState<string | false>(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
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
          service: formData.service || 'Not specified',
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormSent(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setFormSent(false), 8000);
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'text' in err
        ? (err as { text: string }).text
        : err instanceof Error ? err.message : JSON.stringify(err);
      console.error('EmailJS error:', msg);
      setFormError(msg || 'Unknown error');
      setTimeout(() => setFormError(false), 12000);
    } finally {
      setFormLoading(false);
    }
  };
  const heroBgRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroWordsRef = useRef<HTMLSpanElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const typedPhrase = useRef(0);
  const typedChar = useRef(0);
  const typedDeleting = useRef(false);

  /* ── Loader ── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(t);
  }, []);

  /* ── Typewriter ── */
  useEffect(() => {
    if (!loaded) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = TYPED_PHRASES[typedPhrase.current];
      if (typedDeleting.current) {
        typedChar.current -= 1;
        setTypedText(phrase.slice(0, typedChar.current));
        if (typedChar.current === 0) {
          typedDeleting.current = false;
          typedPhrase.current = (typedPhrase.current + 1) % TYPED_PHRASES.length;
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 38);
        }
      } else {
        typedChar.current += 1;
        setTypedText(phrase.slice(0, typedChar.current));
        if (typedChar.current === phrase.length) {
          typedDeleting.current = true;
          timer = setTimeout(tick, 2200);
        } else {
          timer = setTimeout(tick, 68);
        }
      }
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [loaded]);

  /* ── Hero word animation after load ── */
  useEffect(() => {
    if (!loaded) return;
    heroWordsRef.current.forEach((el, i) => {
      if (el) setTimeout(() => el.classList.add('play'), i * 160);
    });
  }, [loaded]);

  /* ── Hero phrase cycling ── */
  useEffect(() => {
    if (!loaded) return;
    const id = setInterval(() => {
      setHeroPhaseIdx(n => (n + 1) % HERO_PHRASES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [loaded]);

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowSticky(y > window.innerHeight * 0.7);
      if (progressRef.current) {
        const max = document.body.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${y / max})`;
      }
      const sections = ['hero', 'services', 'about', 'testimonials', 'work', 'process', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll parallax ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateX(8%) translateY(${y * 0.35}px) scale(1.12)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Intersection Observer for reveals ── */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  /* ── Stats counter observer ── */
  useEffect(() => {
    const el = document.getElementById('stats-bar');
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);


  const years = useCounter(17, 1600, statsVisible);
  const reviews = useCounter(500, 2000, statsVisible);
  const projects_ = useCounter(250, 1800, statsVisible);

  const navLinks = [
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#testimonials', label: 'Reviews', id: 'testimonials' },
    { href: '#work', label: 'Work', id: 'work' },
    { href: '#process', label: 'Our Process', id: 'process' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f4f5f8', color: '#1a1b1e', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* Noise overlay */}
      <div id="noise" />
      {/* ── STICKY CTA ── */}
      <div id="sticky-cta" className={showSticky ? 'visible' : ''}>
        <a href="tel:+61423231515" className="sticky-cta-btn" style={{ background: '#1a1b1e', color: '#fff', gap: '0.5rem' }}>
          <Phone size={13} style={{ color: 'var(--gold)' }} />
          0423 231 515
        </a>
        <a href="#contact" className="sticky-cta-btn">
          <div className="sticky-cta-pulse" />
          Get a Quote
          <ArrowUpRight size={14} />
        </a>
      </div>
      {/* Scroll progress */}
      <div id="scroll-progress" ref={progressRef} />
      {/* Loader */}
      <div id="pdr-loader" className={loaded ? 'hidden' : ''}>
        <img src="/logo-dark.png" alt="WA Building Design" className="loader-logo" />
      </div>
      {/* Navigation */}
      <nav id="pdr-nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-wordmark">
          <img
            src={scrolled ? '/logo-dark.png' : '/logo-white.png'}
            alt="WA Building Design"
            style={{ width: 'auto', display: 'block' }}
            className="nav-logo-img"
          />
        </div>
        <div className="nav-contact-block">
          <a href="tel:+61423231515" className="nav-contact-row">
            <Phone size={10} strokeWidth={1.5} />
            0423 231 515
          </a>
          <span className="nav-contact-row">
            <MapPin size={10} strokeWidth={1.5} />
            Malaga WA 6090
          </span>
          <span className="nav-contact-row">
            <Shield size={10} strokeWidth={1.5} />
            ACN 698 749 692
          </span>
        </div>
        <div className="nav-links">
          {navLinks.map(l => (
            <a key={l.id} href={l.href} className={`nav-link${activeSection === l.id ? ' active' : ''}`}>{l.label}</a>
          ))}
          <a href="#contact" className="nav-cta">Get a Quote</a>
        </div>
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>
      {/* Mobile menu */}
      <div id="mobile-menu" className={mobileOpen ? 'open' : ''}>
        {navLinks.map(l => (
          <a key={l.id} href={l.href} className="mobile-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
      </div>
      {/* ── HERO ── */}
      <section id="hero">
        <img
          id="hero-bg"
          ref={heroBgRef as React.RefObject<HTMLImageElement & HTMLElement>}
          src="/hero-image.jpg"
          alt="Patrick De Rossi consulting with clients over architectural plans"
        />
        <div id="hero-overlay" />
        <div className="hero-grid" />

        <div className="hero-content container">
          <h1 className="hero-headline" style={{ marginBottom: '1.75rem' }}>
            {['Expert', 'Residential'].map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className="headline-word"
                  ref={el => { if (el) heroWordsRef.current[i] = el; }}
                  style={{ animationDelay: `${i * 0.18}s`, marginRight: '0.25em' }}
                >{w}</span>
              </React.Fragment>
            ))}
            <br />
            {['Building', 'Designer'].map((w, i) => (
              <React.Fragment key={i + 2}>
                <span
                  className="headline-word"
                  ref={el => { if (el) heroWordsRef.current[i + 2] = el; }}
                  style={{ animationDelay: `${(i + 2) * 0.18}s`, marginRight: '0.25em' }}
                >{w}</span>
              </React.Fragment>
            ))}
            <br />
            {['for', 'your', 'next'].map((w, i) => (
              <React.Fragment key={i + 4}>
                <span
                  className="headline-word"
                  ref={el => { if (el) heroWordsRef.current[i + 4] = el; }}
                  style={{ animationDelay: `${(i + 4) * 0.18}s`, marginRight: '0.25em' }}
                >{w}</span>
              </React.Fragment>
            ))}
            <br />
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 'inherit' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroPhaseIdx}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-105%' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', color: 'var(--gold)', marginRight: '0.25em' }}
                >
                  {HERO_PHRASES[heroPhaseIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="hero-sub" style={{ marginBottom: '2.5rem' }}>
            Perth's trusted residential building designer — 17+ years, 500+ homes.
          </p>

          <div className="hero-btn-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
            <a href="#contact" className="hero-btn">
              <div className="hero-btn-fill" />
              <span>Get a Free Quote</span>
              <ArrowRight size={14} />
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <a href="#work" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s ease' }}>
                View Our Work <ArrowRight size={12} />
              </a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <a href="tel:+61423231515" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.3s ease' }}>
                <Phone size={12} style={{ color: 'var(--gold)' }} /> 0423 231 515
              </a>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
      {/* ── STATS BAR ── */}
      <div id="stats-bar">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              { num: statsVisible ? `${years}+` : '0', label: 'Years Experience' },
              { num: statsVisible ? `${reviews}+` : '0', label: 'Happy Clients' },
              { num: statsVisible ? `${projects_}+` : '0', label: 'Custom Homes Designed' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="stat-cell"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
            <motion.a
              href="https://www.google.com/search?q=WA+Building+Design+Patrick+De+Rossi+Perth&hl=en#lrd=0x0:0x0,1"
              target="_blank"
              rel="noopener noreferrer"
              className="stat-cell"
              style={{ textDecoration: 'none', transition: 'background 0.3s ease' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--dark)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--dark2)')}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="stat-num">5.0</span>
              <span className="stat-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" color="var(--gold)" />)}
                </span>
                Google Rating ↗
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
      {/* ── SERVICES ── */}
      <section id="services">
        <div className="section-grid-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            style={{ marginBottom: '4rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-eyebrow">What We Do</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '560px' }}>
              <SplitText text="Comprehensive Residential Design & Drafting" />
            </h2>
          </motion.div>
          <motion.div
            className="service-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {SERVICES.map((s, i) => (
              <motion.a
                key={i}
                href={`/services/${s.slug}`}
                className="service-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <div className="service-img-wrap">
                  <img src={s.img} alt={s.title} className="service-img" loading="lazy" />
                  <div className="service-img-overlay" />
                  <span className="service-img-num">{s.num}</span>
                </div>
                <div className="service-body">
                  <div className="service-title">{s.title}</div>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-arrow">
                    Learn More <ArrowUpRight size={13} />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── ABOUT ── */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="reveal-left">
              <span className="section-eyebrow">About Patrick</span>
              <blockquote className="about-quote">
                "Fusing creativity with technical precision to bring over 500 clients' projects to life — on time, on budget, and beyond expectations."
              </blockquote>
              <p className="about-body">
                With 17+ years in the Western Australian building industry, Patrick De Rossi has become a trusted name in residential design. Based in Malaga, WA Building Design specialises exclusively in residential projects — from custom homes and extensions to granny flats, multi-unit developments, and everything in between.
              </p>
              <p className="about-body" style={{ marginTop: '-1rem' }}>
                Patrick holds registration as a Building Designer and Registered Builder, bringing hands-on expertise and deep local knowledge of Perth's R-Codes, local authority requirements, and council approval processes to every project.
              </p>
              <div className="about-contact-row">
                <a href="tel:+61423231515" className="about-contact-link">
                  <Phone size={16} /><span>+61 423 231 515</span>
                </a>
                <a href="mailto:patrick@wabd.com.au" className="about-contact-link">
                  <Mail size={16} /><span>patrick@wabd.com.au</span>
                </a>
                <span className="about-contact-link" style={{ cursor: 'default' }}>
                  <MapPin size={16} style={{ color: 'rgba(26,27,30,0.45)' }} /><span>2/35 Westchester Road, Malaga WA 6090</span>
                </span>
              </div>
            </div>

            <div className="about-img-wrap reveal-right">
              <div className="about-img-frame">
                <img
                  src="/patrick.jpg"
                  alt="Patrick De Rossi"
                  loading="lazy"
                />
              </div>
              <div className="about-img-badge">
                <div className="about-img-badge-name">Patrick De Rossi</div>
                <div className="about-img-badge-title">Building Designer & Registered Builder</div>
              </div>
              <div style={{
                position: 'absolute',
                top: '-20px', right: '-20px',
                width: '120px', height: '120px',
                border: '1px solid var(--gold-border)',
                zIndex: -1,
              }} />
            </div>
          </div>
        </div>
      </section>
      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 0 }}
          >
            <div>
              <span className="section-eyebrow">Client Stories</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                <SplitText text="What Our Clients Say" />
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#c9a84c" color="#c9a84c" />)}
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1b1e', letterSpacing: '-0.02em' }}>5.0</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)' }}>Google Rating</span>
            </div>
          </motion.div>

          <motion.div
            className="testi-columns-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { slice: [0, 3] as [number, number], duration: 18 },
              { slice: [3, 6] as [number, number], duration: 22 },
              { slice: [6, 9] as [number, number], duration: 20 },
            ].map((col, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <TestimonialsColumn testimonials={TESTIMONIALS.slice(...col.slice)} duration={col.duration} />
              </motion.div>
            ))}
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <a
              href="https://www.google.com/search?q=WA+Building+Design+Patrick+De+Rossi+Perth&hl=en#lrd=0x0:0x0,1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1b1e', border: '1px solid rgba(26,27,30,0.2)', padding: '0.7rem 1.5rem', textDecoration: 'none', transition: 'background 0.3s ease', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Star size={13} fill="#c9a84c" color="#c9a84c" />
              Read All Reviews on Google
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
      {/* ── PROJECTS ── */}
      <section id="work">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }} className="reveal">
            <span className="section-eyebrow">Our Work</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Selected Projects
            </h2>
          </div>
          <div className="gallery-columns reveal">
            {PROJECTS.map((src, i) => (
              <div key={i} className="gallery-item" onClick={() => setLightbox(src)}>
                <img src={src} alt={`Project ${i + 1}`} loading="lazy" />
                <div className="gallery-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA BAND ── */}
      <section id="cta-band" className="cta-band reveal">
        <div className="cta-band-inner">
          <div className="cta-band-text">
            <span className="section-eyebrow">Start Today</span>
            <h2 className="cta-band-heading">Have a project in mind?<br />Let's bring it to life.</h2>
            <p className="cta-band-sub">
              Free initial consultation. No obligation. Perth-wide service.
            </p>
          </div>
          <div className="cta-band-actions">
            <a href="#contact" className="btn-primary cta-band-btn">
              Get a Free Quote <ArrowRight size={16} />
            </a>
            <a href="tel:+61423231515" className="cta-band-call">
              <Phone size={16} />
              <span>+61 423 231 515</span>
            </a>
          </div>
        </div>
        <div className="cta-band-rule" />
      </section>
      {/* ── PROCESS ── */}
      <section id="process">
        <div className="section-grid-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '5rem' }} className="reveal">
            <span className="section-eyebrow">How It Works</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              <SplitText text="Our Proven Process" />
            </h2>
          </div>
          <ProcessTimeline />
          <div className="reveal" style={{ marginTop: '5rem', padding: '3.5rem', background: 'var(--dark3)', border: '1px solid var(--gold-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(26,27,30,0.5)' }}>Ready to Begin?</span>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Step 1 starts with a free, no-obligation quote.
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--gray)', maxWidth: '480px', lineHeight: 1.8, margin: 0 }}>
              Every project begins with total cost clarity — before a single line is drawn.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--gold)', color: '#0d0d0d', padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Get a Free Quote <ArrowRight size={14} />
              </a>
              <a href="tel:+61423231515" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--gold-border)', color: 'var(--gold)', padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <Phone size={14} /> 0423 231 515
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal-left">
              <span className="section-eyebrow">Get In Touch</span>
              <h2 className="contact-headline">Ready to Start Your Project?</h2>
              <p className="contact-sub">Let's discuss your residential design or drafting requirements.</p>

              <div className="contact-detail">
                <div className="contact-detail-icon"><Phone size={18} strokeWidth={1.5} /></div>
                <div>
                  <div className="contact-detail-label">Phone</div>
                  <div className="contact-detail-value"><a href="tel:+61423231515">+61 423 231 515</a></div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><Mail size={18} strokeWidth={1.5} /></div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value" style={{ fontSize: '0.95rem' }}>
                    <a href="mailto:patrick@wabd.com.au">patrick@wabd.com.au</a>
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><MapPin size={18} strokeWidth={1.5} /></div>
                <div>
                  <div className="contact-detail-label">Address</div>
                  <div className="contact-detail-value" style={{ fontSize: '0.95rem', color: 'var(--gray)' }}>2/35 Westchester Road, Malaga WA 6090</div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><Clock size={18} strokeWidth={1.5} /></div>
                <div>
                  <div className="contact-detail-label">Hours</div>
                  <div className="contact-detail-value" style={{ fontSize: '0.95rem', color: 'var(--gray)' }}>Mon – Fri, 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text" className="form-input" placeholder="John Smith" required
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email" className="form-input" placeholder="john@example.com" required
                      value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel" className="form-input" placeholder="04xx xxx xxx"
                    value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required</label>
                  <select
                    className="form-select"
                    value={formData.service}
                    onChange={e => setFormData(f => ({ ...f, service: e.target.value }))}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Details</label>
                  <textarea
                    className="form-textarea" rows={5}
                    placeholder="Tell us about your project, site address and suburb..."
                    value={formData.message}
                    onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', color: 'rgba(28,23,14,0.52)', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                  <CheckCircle size={13} style={{ color: 'rgba(26,27,30,0.45)', flexShrink: 0 }} />
                  We respond to all enquiries within 1 business day.
                </div>
                {formSent && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', padding: '0.8rem 1rem', background: 'rgba(201,168,76,0.08)', border: '1px solid var(--gold-border)', fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
                    <CheckCircle size={14} /> Message sent — we'll be in touch within 1 business day.
                  </div>
                )}
                {formError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', padding: '0.8rem 1rem', background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.25)', fontSize: '0.8rem', color: '#e07070', letterSpacing: '0.05em' }}>
                    Something went wrong — please try calling us or emailing directly.
                  </div>
                )}
                <button type="submit" className="form-submit" disabled={formLoading} style={{ opacity: formLoading ? 0.65 : 1 }}>
                  {formLoading ? 'Sending…' : 'Send Enquiry'}
                  {!formLoading && <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* ── SERVICE AREAS ── */}
      <section id="suburbs">
        <div className="container">
          <div className="suburbs-inner">
            <div className="reveal-left">
              <span className="section-eyebrow">Service Area</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Serving Greater Perth
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray)', lineHeight: 1.9, fontWeight: 300, maxWidth: '320px', marginBottom: '1.75rem' }}>
                Based in Malaga, we design for residential clients across the entire Perth metropolitan area — from Joondalup to Fremantle.
              </p>
              <div className="suburbs-radius-badge">
                <MapPin size={14} />
                50km Service Radius from Malaga
              </div>
            </div>
            <div className="reveal-right">
              <div className="suburbs-grid">
                {SUBURBS.map((s, i) => (
                  <span key={i} className="suburb-tag">
                    <span className="suburb-tag-dot" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── FOOTER ── */}
      <footer id="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <img src="/logo-white.png" alt="WA Building Design" style={{ height: '104px', width: 'auto', display: 'block', marginBottom: '1.25rem' }} />
              <p className="footer-brand-tag">
                Perth's trusted residential design and drafting practice. 17+ years, 500+ happy clients, and counting.
              </p>
              <div className="footer-social-row">
                <a href="https://www.facebook.com/profile.php?id=61578555902726" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><Facebook size={15} /></a>
                <a href="https://wa.me/61423231515" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <nav className="footer-nav-links">
                {[
                  { href: '#services', label: 'Services' },
                  { href: '#about', label: 'About Patrick' },
                  { href: '#testimonials', label: 'Client Stories' },
                  { href: '#work', label: 'Our Work' },
                  { href: '#process', label: 'Our Process' },
                  { href: '#contact', label: 'Get a Quote' },
                ].map(l => (
                  <a key={l.href} href={l.href} className="footer-nav-link">
                    <ArrowRight size={12} style={{ color: 'var(--gold)', opacity: 0.6 }} />
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <div className="footer-contact-item">
                <Phone size={15} strokeWidth={1.5} />
                <div>
                  <div className="footer-contact-label">Phone</div>
                  <div className="footer-contact-value"><a href="tel:+61423231515">+61 423 231 515</a></div>
                </div>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} strokeWidth={1.5} />
                <div>
                  <div className="footer-contact-label">Email</div>
                  <div className="footer-contact-value" style={{ fontSize: '0.8rem' }}>
                    <a href="mailto:patrick@wabd.com.au">patrick@wabd.com.au</a>
                  </div>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin size={15} strokeWidth={1.5} />
                <div>
                  <div className="footer-contact-label">Location</div>
                  <div className="footer-contact-value">2/35 Westchester Road, Malaga WA 6090</div>
                </div>
              </div>
              <div className="footer-contact-item">
                <Clock size={15} strokeWidth={1.5} />
                <div>
                  <div className="footer-contact-label">Hours</div>
                  <div className="footer-contact-value">Mon – Fri, 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Registrations & Memberships</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>BSA Registered Building Designer</span>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem' }}>·</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>Registered Builder — WA</span>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem' }}>·</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>BDAWA Member</span>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem' }}>·</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>CPD Accredited — Continuing Professional Development</span>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} WA Building Design Pty Ltd · ABN: 29 669 511 781 · All rights reserved
              <span style={{ margin: '0 0.75rem', opacity: 0.3 }}>·</span>
              <a href="/privacy" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                Privacy Policy
              </a>
            </div>
            <button
              className="footer-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top <ArrowRight size={12} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </footer>
      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <img
            className="lightbox-img"
            src={lightbox}
            alt="Project photo"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
