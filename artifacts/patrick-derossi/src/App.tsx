import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowRight, ArrowUpRight,
  Home, FileText, Building2, Wrench, Trees, Fence,
  Star, Clock, FileCheck, MapPin, Phone, Mail,
  Facebook, Linkedin, Award, Shield, CheckCircle
} from 'lucide-react';

/* ─── STYLES ──────────────────────────────────────────────────────── */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  ::selection { background: rgba(201,168,76,0.3); color: #fff; }
  ::-moz-selection { background: rgba(201,168,76,0.3); color: #fff; }

  :root {
    --gold: #c9a84c;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-border: rgba(201,168,76,0.3);
    --dark: #0d0d0d;
    --dark2: #111111;
    --dark3: #141414;
    --dark4: #1a1a1a;
    --gray: rgba(255,255,255,0.45);
    --font: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: #fff;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.8s ease, visibility 0.8s ease;
  }
  #pdr-loader.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .loader-line {
    width: 0;
    height: 1px;
    background: var(--gold);
    animation: loaderLine 1.2s cubic-bezier(0.77,0,0.18,1) forwards;
  }
  .loader-text {
    font-size: clamp(1.2rem, 3vw, 2rem);
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    opacity: 0;
    animation: loaderText 0.6s ease 0.8s forwards;
  }
  .loader-sub {
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0;
    animation: loaderText 0.6s ease 1s forwards;
    margin-top: 0.5rem;
  }

  @keyframes loaderLine {
    from { width: 0; }
    to { width: min(400px, 80vw); }
  }
  @keyframes loaderText {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
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
    background: rgba(13,13,13,0.92);
    backdrop-filter: blur(12px);
    padding: 1rem 3rem;
    border-bottom: 1px solid var(--gold-border);
  }
  .nav-wordmark { line-height: 1; }
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
    color: rgba(255,255,255,0.3);
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
    color: rgba(201,168,76,0.7);
  }
  .marquee-dot {
    width: 3px; height: 3px;
    background: rgba(201,168,76,0.4);
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
    border-bottom: 1px solid rgba(255,255,255,0.04);
    padding: 0.8rem 0;
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
    gap: 0.6rem;
    padding: 0 1.8rem;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .cred-item:last-child { border-right: none; }
  .cred-item svg { color: var(--gold); opacity: 0.8; flex-shrink: 0; }
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
    color: var(--gold);
    font-weight: 400;
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 2.5rem;
  }
  .section-eyebrow::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    width: 1.8rem; height: 1px;
    background: var(--gold);
    transform: translateY(-50%);
  }

  /* ── Hero ── */
  #hero {
    position: relative;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding-bottom: 8vh;
  }
  #hero-bg {
    position: absolute;
    inset: -5%;
    background-size: cover;
    background-position: center;
    will-change: transform;
  }
  #hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(13,13,13,0.2) 0%,
      rgba(13,13,13,0.4) 40%,
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
    color: var(--gold);
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

  /* ── Services ── */
  #services { padding: 8rem 0; background: var(--dark); }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.05);
  }
  @media (max-width: 900px) { .service-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .service-grid { grid-template-columns: 1fr; } }

  .service-card {
    background: var(--dark);
    padding: 3rem 2.5rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.4s ease;
  }
  .service-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.77,0,0.18,1);
  }
  .service-card:hover { background: var(--dark3); }
  .service-card:hover::before { transform: scaleX(1); }

  .service-num {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    color: var(--gold);
    margin-bottom: 2rem;
    display: block;
  }
  .service-icon {
    color: var(--gold);
    margin-bottom: 1.5rem;
    opacity: 0.7;
    transition: opacity 0.3s ease, transform 0.4s ease;
  }
  .service-card:hover .service-icon { opacity: 1; transform: translateY(-4px); }
  .service-title {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }
  .service-desc { font-size: 0.85rem; color: var(--gray); line-height: 1.7; font-weight: 300; }
  .service-arrow {
    position: absolute;
    bottom: 2.5rem; right: 2rem;
    color: var(--gold);
    opacity: 0;
    transform: translate(-5px, 5px);
    transition: all 0.4s ease;
  }
  .service-card:hover .service-arrow { opacity: 1; transform: translate(0,0); }

  /* ── Projects ── */
  #work { padding: 8rem 0; background: var(--dark2); overflow: hidden; }

  .projects-track {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 380px 280px;
    gap: 4px;
  }
  @media (max-width: 900px) {
    .projects-track { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
    .project-tile:nth-child(1) { grid-column: span 2; height: 300px; }
    .project-tile { height: 220px; }
  }
  @media (max-width: 600px) {
    .projects-track { grid-template-columns: 1fr; grid-template-rows: auto; }
    .project-tile:nth-child(1) { grid-column: span 1; height: 280px; }
    .project-tile { height: 220px; }
  }

  .project-tile:nth-child(1) { grid-column: span 2; }
  .project-tile:nth-child(5) { grid-column: span 2; }

  .project-tile {
    position: relative;
    overflow: hidden;
  }
  .project-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
    will-change: transform;
  }
  .project-tile:hover .project-img { transform: scale(1.07); }

  .project-info {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13,13,13,0.92) 0%, transparent 55%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem 1.75rem;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .project-tile:hover .project-info { opacity: 1; }

  .project-tile-type {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.4rem;
    transform: translateY(10px);
    transition: transform 0.5s ease 0.05s;
  }
  .project-tile-name {
    font-size: 1.3rem;
    font-weight: 700;
    transform: translateY(12px);
    transition: transform 0.5s ease 0.1s;
    letter-spacing: -0.01em;
  }
  .project-tile:hover .project-tile-type,
  .project-tile:hover .project-tile-name {
    transform: translateY(0);
  }

  /* ── Why ── */
  #why { padding: 8rem 0; background: var(--dark); position: relative; overflow: hidden; }

  .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr; gap: 3rem; } }

  .why-pillars { display: flex; flex-direction: column; gap: 0; }
  .pillar {
    padding: 2rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
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
  .pillar-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
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

  /* ── Process ── */
  #process { padding: 8rem 0; background: var(--dark2); }

  .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 0; row-gap: 3.5rem; position: relative; }
  @media (max-width: 900px) { .process-grid { grid-template-columns: 1fr 1fr; gap: 3rem 2rem; } }
  @media (max-width: 600px) { .process-grid { grid-template-columns: 1fr; gap: 2.5rem; } }

  .process-connector {
    position: absolute;
    top: 2.5rem; left: 0; right: 0;
    height: 1px;
    background: var(--gold-border);
    overflow: hidden;
  }
  .process-connector-fill {
    height: 100%;
    background: var(--gold);
    width: 0;
    transition: width 1.5s cubic-bezier(0.77,0,0.18,1);
  }
  .process-connector-fill.play { width: 100%; }

  @media (max-width: 900px) { .process-connector { display: none; } }

  .process-step { padding: 0 2rem 0 0; position: relative; }
  .process-num-wrap {
    width: 5rem; height: 5rem;
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2rem;
    position: relative;
    background: var(--dark2);
    transition: border-color 0.4s ease, background 0.4s ease;
  }
  .process-step:hover .process-num-wrap {
    border-color: var(--gold);
    background: var(--gold-dim);
  }
  .process-num {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--gold);
    letter-spacing: -0.02em;
  }
  .process-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; }
  .process-desc { font-size: 0.82rem; color: var(--gray); line-height: 1.7; font-weight: 300; }

  /* ── About ── */
  #about { padding: 8rem 0; background: var(--dark); overflow: hidden; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
  @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; gap: 3rem; } }

  .about-quote {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 300;
    font-style: italic;
    line-height: 1.5;
    color: rgba(255,255,255,0.85);
    padding-left: 2rem;
    border-left: 2px solid var(--gold);
    margin-bottom: 2.5rem;
    letter-spacing: -0.01em;
  }
  .about-body { font-size: 0.92rem; color: var(--gray); line-height: 1.9; font-weight: 300; margin-bottom: 2.5rem; }

  .about-contact-row { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
  .about-contact-link {
    display: inline-flex; align-items: center; gap: 0.75rem;
    font-size: 0.85rem; color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .about-contact-link:hover { color: var(--gold); }
  .about-contact-link svg { color: var(--gold); flex-shrink: 0; }

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
    color: var(--dark);
    padding: 1.25rem 1.75rem;
  }
  .about-img-badge-name { font-size: 0.9rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
  .about-img-badge-title { font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.7; margin-top: 3px; }

  /* Blueprint decoration */
  .blueprint-deco {
    position: absolute;
    pointer-events: none;
    opacity: 0.08;
  }

  /* ── Contact ── */
  #contact { padding: 8rem 0; background: #0a0a0a; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; }
  @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }

  .contact-headline { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1rem; }
  .contact-sub { font-size: 0.9rem; color: var(--gray); font-weight: 300; margin-bottom: 3rem; }

  .contact-detail { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; }
  .contact-detail-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
  .contact-detail-label { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gray); margin-bottom: 0.3rem; }
  .contact-detail-value { font-size: 1.1rem; font-weight: 300; }
  .contact-detail-value a { color: #fff; text-decoration: none; transition: color 0.3s ease; }
  .contact-detail-value a:hover { color: var(--gold); }

  /* Form */
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gray); }
  .form-input, .form-select, .form-textarea {
    background: var(--dark4);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 1rem 1.25rem;
    color: #fff;
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
    background: var(--dark3);
  }
  .form-textarea { resize: none; }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(255,255,255,0.2); }

  .form-submit {
    background: var(--gold);
    color: var(--dark);
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
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); }
  .footer-copy { font-size: 0.65rem; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; }

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
  }
  #sticky-cta.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .sticky-cta-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--gold);
    color: var(--dark);
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
  .sticky-cta-pulse {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--dark);
    position: relative;
    flex-shrink: 0;
  }
  .sticky-cta-pulse::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid var(--dark);
    animation: pulseRing 1.5s ease-out infinite;
    opacity: 0;
  }
  @keyframes pulseRing {
    0% { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  /* ── Testimonials ── */
  #testimonials { padding: 8rem 0; background: var(--dark2); overflow: hidden; }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 4rem;
  }
  @media (max-width: 900px) { .testimonials-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .testimonials-grid { grid-template-columns: 1fr; } }

  .testi-card {
    background: var(--dark3);
    border: 1px solid rgba(255,255,255,0.05);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s ease, transform 0.4s ease;
  }
  .testi-card:hover { border-color: var(--gold-border); transform: translateY(-4px); }
  .testi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: var(--gold);
    transition: height 0.5s cubic-bezier(0.77,0,0.18,1);
  }
  .testi-card:hover::before { height: 100%; }
  .testi-quote-mark {
    font-size: 4rem;
    line-height: 1;
    color: var(--gold);
    opacity: 0.25;
    font-family: Georgia, serif;
    margin-bottom: 0.5rem;
    display: block;
  }
  .testi-text {
    font-size: 0.92rem;
    line-height: 1.8;
    color: rgba(255,255,255,0.8);
    font-weight: 300;
    font-style: italic;
    margin-bottom: 2rem;
  }
  .testi-stars { display: flex; gap: 3px; color: var(--gold); margin-bottom: 1.25rem; }
  .testi-divider {
    width: 2rem; height: 1px;
    background: var(--gold-border);
    margin-bottom: 1.25rem;
  }
  .testi-name { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.2rem; }
  .testi-meta { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); }

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
    border: 1px solid rgba(255,255,255,0.08);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
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
    border: 1px solid var(--gold-border);
    padding: 0.8rem 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
  }

  /* ── Footer 3-col ── */
  #footer {
    background: #050505;
    border-top: 1px solid var(--gold-border);
    padding: 5rem 0 3rem;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.2fr;
    gap: 4rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
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
  .footer-nav-link:hover { color: #fff; }
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
  .footer-copy { font-size: 0.65rem; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; }
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
`;

/* ─── COUNTER HOOK ───────────────────────────────────────────────── */
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
  { icon: <Home size={26} strokeWidth={1.5} />, title: 'Residential Design', desc: 'Full home design from initial concept sketches through to council-approved documentation. We work closely with you to translate your vision into precise, buildable drawings that meet all WA R-Code requirements.', num: '01' },
  { icon: <FileText size={26} strokeWidth={1.5} />, title: 'Construction Drawings', desc: 'Comprehensive working drawing sets covering floor plans, elevations, sections, site plans and structural details. Every package is built to satisfy building permit and local authority requirements from the outset.', num: '02' },
  { icon: <Building2 size={26} strokeWidth={1.5} />, title: 'Multi-Unit Development', desc: 'Duplex, triplex, grouped dwelling and apartments designed to maximise yield within your site\'s development potential. We navigate WAPC and local planning policy to make your investment work harder.', num: '03' },
  { icon: <Wrench size={26} strokeWidth={1.5} />, title: 'Renovation & Extension', desc: 'Thoughtful alterations and additions that respect your home\'s existing character while delivering the space you need. From rear extensions to full internal reconfigurations and second-storey additions.', num: '04' },
  { icon: <Trees size={26} strokeWidth={1.5} />, title: 'Granny Flats', desc: 'Ancillary dwelling designs that comply with Perth\'s R-Codes and maximise liveable space within the allowable footprint. An efficient solution for extended family accommodation or additional rental income.', num: '05' },
  { icon: <Fence size={26} strokeWidth={1.5} />, title: 'C.A.F.S', desc: 'Permit-ready drawings for carports, alfresco entertainment areas, fencing and garden sheds. We handle the documentation so your builder can get on site without delays or council back-and-forth.', num: '06' },
];

const PROJECTS = [
  { img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2Fa30a969b7eec4e6883563ee4cd4697cd?format=webp&width=900', name: 'Ultra-Modern Double Storey', type: 'Custom Home Design' },
  { img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2F52c209f0e0d24770bd2ca845dda8bdeb?format=webp&width=900', name: 'Contemporary Residence', type: 'Custom Home Design' },
  { img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2F6049763deb68490486b31b8246cd37d6?format=webp&width=900', name: 'Modern Single Storey', type: 'Custom Home Design' },
  { img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2F83cae82e0ee742dda2d6173e8479c294?format=webp&width=900', name: 'Hampton-Style Home', type: 'Custom Home Design' },
  { img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2F33c2aa76642549618267469fa5e26c21?format=webp&width=900', name: 'Contemporary Single Storey', type: 'Custom Home Design' },
  { img: 'https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2Feb0d938ec5b44e65a8095a02be6d9637?format=webp&width=900', name: 'Modern New Build', type: 'Custom Home Design' },
];

const PROCESS = [
  { num: '01', title: 'Formal Quote', desc: 'A transparent, itemised quote before any work begins — covering every stage, fee, and timeline so you know exactly what to expect.' },
  { num: '02', title: 'Initial Consultation', desc: 'We meet to discuss your vision, site, lifestyle needs, and budget. This forms the foundation for a design brief that guides everything that follows.' },
  { num: '03', title: 'Concept Design', desc: 'Preliminary floor plans and elevations are developed and refined with your feedback until the layout is exactly right for your block and the way you live.' },
  { num: '04', title: 'Planning Approval', desc: 'Where required, we prepare and lodge a Development Application with the relevant local authority and manage all queries through to approval.' },
  { num: '05', title: 'Working Drawings', desc: 'Full construction documentation — floor plans, elevations, sections, site plans, electrical and plumbing layouts — built to satisfy your certifier and builder.' },
  { num: '06', title: '3rd Party Plans', desc: 'We coordinate any required engineer, surveyor, energy assessor, or other specialist reports and seamlessly incorporate them into your drawing set.' },
  { num: '07', title: 'Design Compliance', desc: 'A Certificate of Design Compliance (CDC) is prepared and issued by a registered certifier, confirming your design meets all NCC and R-Code requirements.' },
  { num: '08', title: 'Building Permit', desc: 'We lodge your completed building permit application and liaise with the certifier until permit is granted — so your builder can break ground without delay.' },
];

const TESTIMONIALS = [
  {
    text: "Patrick is a legend! I needed some drafting done for a granny flat, and he nailed it. He worked quickly but didn't cut any corners. The design was spot on, and even my builder commented on how clear and detailed the plans were. If you need quality drafting, Patrick's your guy.",
    name: "Mark O'Sullivan",
    meta: 'Owner Builder Home — Rockingham',
  },
  {
    text: "We used Patrick for a new duplex design, and he was fantastic! Super professional but also really easygoing. He had great ideas to maximise the space, and his attention to detail was incredible. Honestly, the whole experience was seamless, and we're thrilled with the result. Can't recommend him enough!",
    name: 'Priya & John Williams',
    meta: 'Duplex Design — Cannington',
  },
  {
    text: "I would like to express my gratitude to Patrick for efficiently completing all my applications at a minimal cost and within a remarkably short timeframe. Despite being unable to find anyone willing to meet my deadline elsewhere, Patrick delivered exceptional results. I highly recommend his services.",
    name: 'Sarah & Michael Johnson',
    meta: 'Custom Family Home — Claremont',
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

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [typedText, setTypedText] = useState('');
  const heroBgRef = useRef<HTMLDivElement>(null);
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
      const sections = ['hero', 'services', 'work', 'testimonials', 'why', 'process', 'about', 'contact'];
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

  /* ── Mouse parallax ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (heroBgRef.current) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (mousePos.current.x - cx) / cx;
        const dy = (mousePos.current.y - cy) / cy;
        heroBgRef.current.style.transform = `translate(${dx * -12}px, ${dy * -8}px) scale(1.12)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
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

  /* ── Process line observer ── */
  useEffect(() => {
    const el = document.getElementById('process');
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setProcessVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  const years = useCounter(17, 1600, statsVisible);
  const reviews = useCounter(500, 2000, statsVisible);
  const projects_ = useCounter(250, 1800, statsVisible);

  const navLinks = [
    { href: '#work', label: 'Work', id: 'work' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#0d0d0d', color: '#fff', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Noise overlay */}
      <div id="noise" />

      {/* ── STICKY CTA ── */}
      <div id="sticky-cta" className={showSticky ? 'visible' : ''}>
        <a href="#contact" className="sticky-cta-btn">
          <div className="sticky-cta-pulse" />
          Get a Quote
          <Phone size={14} />
        </a>
      </div>

      {/* Scroll progress */}
      <div id="scroll-progress" ref={progressRef} />

      {/* Loader */}
      <div id="pdr-loader" className={loaded ? 'hidden' : ''}>
        <div className="loader-line" style={{ marginBottom: '1.5rem' }} />
        <div className="loader-text">Patrick De Rossi</div>
        <div className="loader-sub">Design & Drafting — Est. 2007</div>
      </div>

      {/* Navigation */}
      <nav id="pdr-nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-wordmark">
          <img
            src="/logo.webp"
            alt="Patrick De Rossi Design & Drafting"
            style={{ height: '38px', width: 'auto', display: 'block' }}
          />
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
        <div
          id="hero-bg"
          ref={heroBgRef}
          style={{
            backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2Feafa756245504b6dafa92e688ab57651?format=webp&width=1600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div id="hero-overlay" />
        <div className="hero-grid" />

        <div className="hero-content container">
          <div className="hero-badge">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            South Perth, WA — Est. 2007
          </div>

          <h1 className="hero-headline" style={{ marginBottom: '1.75rem' }}>
            {['Every', 'Line'].map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className="headline-word"
                  ref={el => { if (el) heroWordsRef.current[i] = el; }}
                  style={{ animationDelay: `${i * 0.18}s`, marginRight: '0.25em' }}
                >{w}</span>
              </React.Fragment>
            ))}
            <br />
            {['Drawn', 'With', <span key="purpose" style={{ color: 'var(--gold)' }}>Purpose.</span>].map((w, i) => (
              <React.Fragment key={i + 2}>
                <span
                  className="headline-word"
                  ref={el => { if (el) heroWordsRef.current[i + 2] = el; }}
                  style={{ animationDelay: `${(i + 2) * 0.18}s`, marginRight: '0.25em' }}
                >{w}</span>
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-sub" style={{ marginBottom: '2.5rem', minHeight: '1.4em' }}>
            <span>{typedText}</span>
            <span className="typed-cursor" />
          </p>

          <div className="hero-btn-wrap">
            <a href="#work" className="hero-btn">
              <div className="hero-btn-fill" />
              <span>View Our Work</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      {(() => {
        const items = ['Residential Design', 'Custom Home Plans', 'Dual Occupancy', 'Granny Flats', 'Renovation Drawings', 'Council Approvals', 'Site Plans', 'Floor Plans', 'Elevation Drawings', 'South Perth WA'];
        const all = [...items, ...items];
        return (
          <div id="marquee" aria-hidden="true">
            <div className="marquee-track">
              {all.map((t, i) => (
                <span key={i} className="marquee-item">
                  {t}
                  <span className="marquee-dot" />
                </span>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── CREDENTIALS STRIP ── */}
      <div id="credentials-strip">
        <div className="credentials-inner">
          <div className="cred-item">
            <Award size={13} />
            Registered Building Designer
          </div>
          <div className="cred-item">
            <Shield size={13} />
            Registered Builder
          </div>
          <div className="cred-item">
            <Star size={13} />
            Est. 2007 — 17 Years Perth
          </div>
          <div className="cred-item">
            <span className="cred-live">
              <span className="cred-live-dot" />
              Currently Accepting New Projects
            </span>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div id="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-cell">
              <span className="stat-num">{statsVisible ? `${years}+` : '—'}</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-cell">
              <span className="stat-num">{statsVisible ? `${reviews}+` : '—'}</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-cell">
              <span className="stat-num">{statsVisible ? `${projects_}+` : '—'}</span>
              <span className="stat-label">Custom Homes</span>
            </div>
            <div className="stat-cell">
              <span className="stat-num">5.0</span>
              <span className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" color="var(--gold)" />)}
                &nbsp;Star Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services">
        <div className="container">
          <div style={{ marginBottom: '4rem' }} className="reveal">
            <span className="section-eyebrow">What We Do</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '500px' }}>
              Comprehensive Residential Drafting
            </h2>
          </div>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="service-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="service-num">{s.num}</span>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
                <div className="service-arrow"><ArrowUpRight size={18} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }} className="reveal">
            <div>
              <span className="section-eyebrow">Our Work</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Featured Projects
              </h2>
            </div>
            <a
              href="https://patrickderossi.com.au"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid var(--gold-border)', paddingBottom: '2px', transition: 'border-color 0.3s ease' }}
            >
              View All <ArrowRight size={14} />
            </a>
          </div>
          <div className="projects-track reveal">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-tile">
                <img src={p.img} alt={p.name} className="project-img" loading="lazy" />
                <div className="project-info">
                  <span className="project-tile-type">{p.type}</span>
                  <span className="project-tile-name">{p.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} className="reveal">
            <div>
              <span className="section-eyebrow">Client Stories</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                What Our Clients Say
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" color="var(--gold)" />)}
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.02em' }}>5.0</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)' }}>Google Rating</span>
            </div>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="testi-quote-mark">&ldquo;</span>
                <p className="testi-text">{t.text}</p>
                <div className="testi-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" color="var(--gold)" />)}
                </div>
                <div className="testi-divider" />
                <div className="testi-name">{t.name}</div>
                <div className="testi-meta">{t.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PATRICK ── */}
      <section id="why">
        <div className="blueprint-deco" style={{ right: '-100px', top: '-50px', width: '500px', height: '500px' }}>
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <circle cx="250" cy="250" r="200" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="150" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="80" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="50" y1="250" x2="450" y2="250" stroke="#c9a84c" strokeWidth="0.5" />
            <line x1="250" y1="50" x2="250" y2="450" stroke="#c9a84c" strokeWidth="0.5" />
            {[0, 45, 90, 135].map(a => (
              <line key={a}
                x1={250 + 200 * Math.cos(a * Math.PI / 180)}
                y1={250 + 200 * Math.sin(a * Math.PI / 180)}
                x2={250 + 80 * Math.cos(a * Math.PI / 180)}
                y2={250 + 80 * Math.sin(a * Math.PI / 180)}
                stroke="#c9a84c" strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        <div className="container">
          <div className="why-grid">
            <div className="reveal-left">
              <span className="section-eyebrow">Why Choose Us</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                Expertise You Can Build On
              </h2>
              <div className="review-badge">
                <div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" color="var(--gold)" />)}
                  </div>
                  <div className="review-label">50+ Client Reviews</div>
                </div>
                <div style={{ width: '1px', height: '2.5rem', background: 'var(--gold-border)' }} />
                <div>
                  <div className="review-score">5.0</div>
                  <div className="review-label">Average Rating</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.9, fontWeight: 300, maxWidth: '420px' }}>
                Based in South Perth since 2007, we have built a reputation for precision, reliability and seamless council approvals across the Perth metro area.
              </p>
            </div>

            <div className="why-pillars reveal-right">
              {[
                { icon: <Clock size={22} strokeWidth={1.5} />, title: '17+ Years Experience', desc: 'Established in Perth since 2007, delivering high-quality residential drafting across Western Australia.' },
                { icon: <FileCheck size={22} strokeWidth={1.5} />, title: 'Council-Ready Documentation', desc: 'Meticulously detailed drawings built for smooth, hassle-free local government approvals and building permits.' },
                { icon: <MapPin size={22} strokeWidth={1.5} />, title: 'Local Perth Knowledge', desc: 'Deep understanding of WA R-Codes, WAPC requirements and local authority planning policies.' },
              ].map((p, i) => (
                <div key={i} className="pillar" style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="pillar-icon">{p.icon}</div>
                  <div>
                    <div className="pillar-title">{p.title}</div>
                    <div className="pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process">
        <div className="container">
          <div style={{ marginBottom: '5rem' }} className="reveal">
            <span className="section-eyebrow">How It Works</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Our Proven Process
            </h2>
          </div>
          <div className="process-grid">
            <div className="process-connector">
              <div className={`process-connector-fill${processVisible ? ' play' : ''}`} />
            </div>
            {PROCESS.map((step, i) => (
              <div
                key={i}
                className="process-step reveal"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="process-num-wrap">
                  <span className="process-num">{step.num}</span>
                </div>
                <div className="process-title">{step.title}</div>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
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
                With 17+ years in the Western Australian building industry, Patrick De Rossi has become a trusted name in residential design and drafting. Based in South Perth and established in 2007, the practice specialises exclusively in residential projects — from custom homes and extensions to granny flats, multi-unit developments, and everything in between.
              </p>
              <p className="about-body" style={{ marginTop: '-1rem' }}>
                Patrick holds registration as a Building Designer and Registered Builder, bringing hands-on expertise and deep local knowledge of Perth's R-Codes, local authority requirements, and council approval processes to every project.
              </p>
              <div className="about-contact-row">
                <a href="tel:+61423231515" className="about-contact-link">
                  <Phone size={16} /><span>+61 423 231 515</span>
                </a>
                <a href="mailto:info@patrickderossi.com.au" className="about-contact-link">
                  <Mail size={16} /><span>info@patrickderossi.com.au</span>
                </a>
                <span className="about-contact-link" style={{ cursor: 'default' }}>
                  <MapPin size={16} style={{ color: 'var(--gold)' }} /><span>3 Mends St, South Perth WA 6151</span>
                </span>
              </div>
            </div>

            <div className="about-img-wrap reveal-right">
              <div className="about-img-frame">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F0df748b9b86d4bc5af1be6fda4f6f0d0%2F25f6db68907b4e7f9b55020c56198d0d?format=webp&width=800"
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
                    <a href="mailto:info@patrickderossi.com.au">info@patrickderossi.com.au</a>
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><MapPin size={18} strokeWidth={1.5} /></div>
                <div>
                  <div className="contact-detail-label">Address</div>
                  <div className="contact-detail-value" style={{ fontSize: '0.95rem', color: 'var(--gray)' }}>3 Mends St, South Perth WA 6151</div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><Clock size={18} strokeWidth={1.5} /></div>
                <div>
                  <div className="contact-detail-label">Hours</div>
                  <div className="contact-detail-value" style={{ fontSize: '0.95rem', color: 'var(--gray)' }}>Mon – Fri, 8:00 AM – 5:00 PM</div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <form className="contact-form" onSubmit={e => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="John Smith" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" placeholder="04xx xxx xxx" />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required</label>
                  <select className="form-select">
                    <option value="">Select a service...</option>
                    {SERVICES.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Details</label>
                  <textarea className="form-textarea" rows={5} placeholder="Tell us about your project, site address and suburb..." />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                  <CheckCircle size={13} style={{ color: 'var(--gold)', opacity: 0.7, flexShrink: 0 }} />
                  We respond to all enquiries within 1 business day.
                </div>
                <button type="submit" className="form-submit">
                  Send Enquiry
                  <ArrowRight size={16} />
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
                Based in South Perth, we design for residential clients across the entire Perth metropolitan area — from Joondalup to Fremantle.
              </p>
              <div className="suburbs-radius-badge">
                <MapPin size={14} />
                50km Service Radius from South Perth
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
              <div className="footer-brand-name">Patrick De Rossi</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Design & Drafting</div>
              <p className="footer-brand-tag">
                Perth's trusted residential design and drafting practice. 17+ years, 500+ happy clients, and counting.
              </p>
              <div className="footer-social-row">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><Facebook size={15} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn"><Linkedin size={15} /></a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <nav className="footer-nav-links">
                {[
                  { href: '#work', label: 'Our Work' },
                  { href: '#services', label: 'Services' },
                  { href: '#testimonials', label: 'Client Stories' },
                  { href: '#process', label: 'Our Process' },
                  { href: '#about', label: 'About Patrick' },
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
                    <a href="mailto:info@patrickderossi.com.au">info@patrickderossi.com.au</a>
                  </div>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin size={15} strokeWidth={1.5} />
                <div>
                  <div className="footer-contact-label">Location</div>
                  <div className="footer-contact-value">3 Mends St, South Perth WA 6151</div>
                </div>
              </div>
              <div className="footer-contact-item">
                <Clock size={15} strokeWidth={1.5} />
                <div>
                  <div className="footer-contact-label">Hours</div>
                  <div className="footer-contact-value">Mon – Fri, 8:00 AM – 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} Patrick De Rossi Design & Drafting. All rights reserved. — ABN registered, WA
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
    </div>
  );
}
