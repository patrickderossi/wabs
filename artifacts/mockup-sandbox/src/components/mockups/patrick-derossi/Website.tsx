import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, 
  Home, FileText, Building2, Paintbrush, Trees, Fence,
  Star, Clock, FileCheck, MapPin, Phone, Mail,
  Facebook, Linkedin, ArrowRight
} from 'lucide-react';

const customStyles = `
  .font-dm-sans {
    font-family: 'DM Sans', sans-serif;
  }
  
  body, html {
    margin: 0;
    padding: 0;
    background-color: #0d0d0d;
    color: #ffffff;
    scroll-behavior: smooth;
  }

  /* Typography */
  .text-gold { color: #c9a84c; }
  .bg-gold { background-color: #c9a84c; }
  .border-gold { border-color: #c9a84c; }
  
  .section-label {
    font-size: 0.75rem;
    font-weight: 300;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(201, 168, 76, 0.8);
    margin-bottom: 1rem;
    display: block;
  }

  /* Animations */
  @keyframes fadeInUp { 
    from { opacity: 0; transform: translateY(30px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  @keyframes fadeIn { 
    from { opacity: 0; } 
    to { opacity: 1; } 
  }
  @keyframes bounce { 
    0%,100% { transform: translateY(0); } 
    50% { transform: translateY(-8px); } 
  }
  
  .animate-fade-in {
    animation: fadeIn 1.5s ease-out forwards;
  }
  
  .animate-bounce-slow {
    animation: bounce 2s infinite;
  }

  .word-anim {
    display: inline-block;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }

  /* Blueprint Grid */
  .blueprint-grid {
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  .blueprint-corners {
    position: relative;
  }
  .blueprint-corners::before, .blueprint-corners::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(201, 168, 76, 0.3);
    pointer-events: none;
  }
  .blueprint-corners::before {
    top: 20px; left: 20px;
    border-right: none;
    border-bottom: none;
  }
  .blueprint-corners::after {
    bottom: 20px; right: 20px;
    border-left: none;
    border-top: none;
  }

  /* Interactive Elements */
  .nav-link {
    position: relative;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }
  .nav-link:hover {
    color: #c9a84c;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #c9a84c;
    transition: width 0.3s ease;
  }
  .nav-link:hover::after {
    width: 100%;
  }

  .btn-gold {
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.4s ease;
  }
  .btn-gold::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #c9a84c;
    transform: translateX(-100%);
    transition: transform 0.4s ease;
    z-index: -1;
  }
  .btn-gold:hover::before {
    transform: translateX(0);
  }
  .btn-gold:hover {
    color: #0d0d0d;
  }

  /* Scroll Reveal */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .delay-100 { transition-delay: 100ms; }
  .delay-200 { transition-delay: 200ms; }
  .delay-300 { transition-delay: 300ms; }
  .delay-400 { transition-delay: 400ms; }
  .delay-500 { transition-delay: 500ms; }

  /* Projects Grid */
  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .project-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .project-grid {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 300px;
    }
    .project-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
    .project-item:nth-child(2) { grid-column: span 1; grid-row: span 1; }
    .project-item:nth-child(3) { grid-column: span 1; grid-row: span 1; }
    .project-item:nth-child(4) { grid-column: span 1; grid-row: span 1; }
    .project-item:nth-child(5) { grid-column: span 2; grid-row: span 1; }
    .project-item:nth-child(6) { grid-column: span 3; grid-row: span 1; }
  }

  .project-card:hover .project-img {
    transform: scale(1.05);
  }
  .project-card:hover .project-overlay {
    opacity: 1;
  }
`;

export function Website() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const headlineWords = "Designing Homes. Delivering Precision.".split(' ');

  const services = [
    { icon: <Home size={28} strokeWidth={1.5} />, title: "Residential Design", desc: "Custom home design from concept to council approval" },
    { icon: <FileText size={28} strokeWidth={1.5} />, title: "Construction Drawings", desc: "Technical documentation and building permits" },
    { icon: <Building2 size={28} strokeWidth={1.5} />, title: "Multi-Unit Development", desc: "Design for duplex, triplex and grouped dwellings" },
    { icon: <Paintbrush size={28} strokeWidth={1.5} />, title: "Renovation & Extension", desc: "Alterations and additions to existing homes" },
    { icon: <Trees size={28} strokeWidth={1.5} />, title: "Granny Flats", desc: "Ancillary dwelling design within Perth regulations" },
    { icon: <Fence size={28} strokeWidth={1.5} />, title: "C.A.F.S", desc: "Carports, alfresco areas, fencing and sheds" }
  ];

  const projects = [
    { img: "/__mockup/images/patrick-derossi/project1.png", name: "Nedlands Residence", type: "Custom Home Design" },
    { img: "/__mockup/images/patrick-derossi/project2.png", name: "Applecross Extension", type: "Renovation & Extension" },
    { img: "/__mockup/images/patrick-derossi/project3.png", name: "Como Duplex", type: "Multi-Unit Development" },
    { img: "/__mockup/images/patrick-derossi/project4.png", name: "Shenton Park Granny Flat", type: "Granny Flat" },
    { img: "/__mockup/images/patrick-derossi/project5.png", name: "Mount Lawley Renovation", type: "Renovation" },
    { img: "/__mockup/images/patrick-derossi/project6.png", name: "Fremantle Heritage Home", type: "Heritage Renovation" },
  ];

  const processSteps = [
    { num: "01", title: "Brief", desc: "We listen to your vision and site requirements" },
    { num: "02", title: "Design", desc: "Concept drawings and design development" },
    { num: "03", title: "Documentation", desc: "Full construction drawings and permit sets" },
    { num: "04", title: "Delivery", desc: "Lodgement support through to approval" },
  ];

  return (
    <div className="font-dm-sans min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden selection:bg-[#c9a84c] selection:text-[#0d0d0d]">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#111111]/95 backdrop-blur-sm border-b border-[#c9a84c]/20 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-wide">Patrick De Rossi</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold mt-1">Design & Drafting</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <a href="#work" className="nav-link">Work</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-[#0d0d0d] z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-8 text-center text-2xl font-light">
          <a href="#work" className="text-white hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
          <a href="#services" className="text-white hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#about" className="text-white hover:text-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#contact" className="text-gold" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section id="hero" className="relative h-screen flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0">
            <img src="/__mockup/images/patrick-derossi/hero.png" alt="Modern Luxury Home" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0d0d0d]/60 to-[#0d0d0d]"></div>
            <div className="absolute inset-0 blueprint-grid opacity-30 mix-blend-overlay"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-start mt-20">
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-tight md:leading-[1.1] mb-6 max-w-4xl tracking-tight">
              {headlineWords.map((word, i) => (
                <React.Fragment key={i}>
                  <span className="word-anim" style={{ animationDelay: `${i * 0.15}s` }}>
                    {word}
                  </span>
                  {word.includes('.') && i < headlineWords.length - 1 ? <br className="hidden md:block" /> : ' '}
                </React.Fragment>
              ))}
            </h1>
            
            <p className="text-gold font-light tracking-[0.15em] text-sm md:text-base uppercase mb-10 animate-fade-in" style={{ animationDelay: '1s', opacity: 0 }}>
              Residential Design & Construction Drafting — Perth, WA — Est. 2007
            </p>
            
            <a 
              href="#work" 
              className="btn-gold border border-gold text-white px-8 py-4 uppercase tracking-widest text-sm font-medium animate-fade-in"
              style={{ animationDelay: '1.2s', opacity: 0 }}
            >
              View Our Work
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce-slow">
            <ChevronDown size={32} strokeWidth={1} />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 md:py-32 relative blueprint-corners border-y border-white/5">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gold/10"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16 md:mb-24 reveal">
              <span className="section-label">What We Do</span>
              <h2 className="text-3xl md:text-5xl font-bold">Comprehensive Drafting Solutions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="reveal group bg-[#141414] p-10 border border-gold/40 hover:border-gold/100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] flex flex-col"
                  style={{ transitionDelay: `${(index % 3 + 1) * 100}ms` }}
                >
                  <div className="text-gold mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="work" className="py-24 md:py-32 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
              <div>
                <span className="section-label">Our Work</span>
                <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
              </div>
            </div>

            <div className="project-grid">
              {projects.map((project, i) => (
                <div key={i} className="project-item project-card relative overflow-hidden bg-[#1a1a1a] reveal h-[300px] lg:h-auto" style={{ transitionDelay: `${(i % 3 + 1) * 100}ms` }}>
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="project-img w-full h-full object-cover transition-transform duration-700 ease-in-out" 
                  />
                  <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-gold text-xs tracking-widest uppercase mb-2 block">{project.type}</span>
                    <h3 className="text-2xl font-medium text-white">{project.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center reveal">
              <a href="#" className="inline-flex items-center gap-2 text-gold font-medium uppercase tracking-widest text-sm hover:text-white transition-colors group">
                View All Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* WHY PATRICK */}
        <section id="why" className="py-24 bg-[#0d0d0d] border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-20 reveal">
              <div className="inline-flex items-center gap-2 border border-gold/50 rounded-full px-6 py-2 mb-8 bg-gold/5">
                <div className="flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium">5.0 Stars — 50 Client Reviews</span>
              </div>
              <span className="section-label">Why Us</span>
              <h2 className="text-3xl md:text-5xl font-bold max-w-2xl">Expertise You Can Build On</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              <div className="text-center md:text-left reveal delay-100">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-gold/20 flex items-center justify-center mx-auto md:mx-0 mb-6">
                  <Clock className="text-gold" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">18+ Years Experience</h3>
                <p className="text-gray-400 font-light leading-relaxed">Established in Perth since 2007, delivering consistent, high-quality residential drafting across Western Australia.</p>
              </div>
              
              <div className="text-center md:text-left reveal delay-200">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-gold/20 flex items-center justify-center mx-auto md:mx-0 mb-6">
                  <FileCheck className="text-gold" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Council-Ready Docs</h3>
                <p className="text-gray-400 font-light leading-relaxed">Meticulously detailed drawings built specifically for smooth, hassle-free local government approvals and building permits.</p>
              </div>
              
              <div className="text-center md:text-left reveal delay-300">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-gold/20 flex items-center justify-center mx-auto md:mx-0 mb-6">
                  <MapPin className="text-gold" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Local Perth Knowledge</h3>
                <p className="text-gray-400 font-light leading-relaxed">Deep, comprehensive understanding of WA building codes, R-Codes, and specific WAPC requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="py-24 md:py-32 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-20 reveal">
              <span className="section-label">How It Works</span>
              <h2 className="text-3xl md:text-5xl font-bold">Our Proven Process</h2>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative reveal" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                    <div className="bg-[#0d0d0d] w-24 h-24 rounded-full border border-gold/30 flex items-center justify-center mb-8 relative z-10 mx-auto md:mx-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      <span className="text-3xl font-light text-gold">{step.num}</span>
                    </div>
                    <div className="text-center md:text-left pr-4">
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400 font-light text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 md:py-32 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 reveal">
                <span className="section-label">About Patrick</span>
                <blockquote className="text-2xl md:text-4xl font-light italic leading-tight mb-10 pl-6 border-l-2 border-gold text-white/90">
                  "Over 18 years delivering precise design and drafting solutions across the Perth metro area."
                </blockquote>
                
                <p className="text-gray-300 font-light leading-relaxed mb-8 text-lg">
                  Patrick De Rossi Design & Drafting is a registered building design and drafting practice based in South Perth, Western Australia, established in 2007. Specialising exclusively in residential projects, we serve clients across Perth's 50km metro area — from custom luxury homes and extensions to granny flats and complex multi-unit developments.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-12 pt-10 border-t border-white/10">
                  <a href="tel:+61423231515" className="flex items-center gap-3 hover:text-gold transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-white/10">
                      <Phone size={18} />
                    </div>
                    <span className="font-medium">+61 423 231 515</span>
                  </a>
                  <a href="mailto:info@patrickderossi.com.au" className="flex items-center gap-3 hover:text-gold transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-white/10">
                      <Mail size={18} />
                    </div>
                    <span className="font-medium">info@patrickderossi.com.au</span>
                  </a>
                </div>
              </div>

              <div className="order-1 lg:order-2 reveal delay-200">
                <div className="relative p-4 border border-gold/20 bg-[#141414]">
                  <img 
                    src="/__mockup/images/patrick-derossi/about.png" 
                    alt="Patrick De Rossi at drafting desk" 
                    className="w-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute -bottom-6 -left-6 bg-gold text-[#0d0d0d] p-6 shadow-xl">
                    <h4 className="font-bold text-xl uppercase tracking-wider">Patrick De Rossi</h4>
                    <span className="text-sm font-medium opacity-80">Principal Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 md:py-32 bg-[#0f0f0f] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-16 reveal">
              <span className="section-label">Get In Touch</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-400 text-xl font-light">Let's discuss your residential design or drafting requirements.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              <div className="lg:col-span-2 space-y-10 reveal delay-100">
                <div>
                  <a href="tel:+61423231515" className="group flex items-start gap-4">
                    <Phone className="text-gold mt-1 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <span className="block text-sm text-gray-500 uppercase tracking-widest mb-1">Call Us</span>
                      <span className="text-2xl md:text-3xl font-light group-hover:text-gold transition-colors">+61 423 231 515</span>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="mailto:info@patrickderossi.com.au" className="group flex items-start gap-4">
                    <Mail className="text-gold mt-1 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <span className="block text-sm text-gray-500 uppercase tracking-widest mb-1">Email Us</span>
                      <span className="text-xl md:text-2xl font-light group-hover:text-gold transition-colors break-all">info@patrickderossi.com.au</span>
                    </div>
                  </a>
                </div>

                <div className="flex items-start gap-4 pt-6 border-t border-white/10">
                  <MapPin className="text-gray-500 mt-1" size={20} />
                  <div>
                    <span className="block text-sm text-gray-500 uppercase tracking-widest mb-1">Office</span>
                    <span className="text-gray-300 font-light">3 Mends St<br/>South Perth WA 6151</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-gray-500 mt-1" size={20} />
                  <div>
                    <span className="block text-sm text-gray-500 uppercase tracking-widest mb-1">Hours</span>
                    <span className="text-gray-300 font-light">Monday – Friday<br/>8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 reveal delay-200">
                <form className="bg-[#141414] p-8 md:p-12 border border-white/5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#1a1a1a] border border-[#333] px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-[#1a1a1a] border border-[#333] px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Service Required</label>
                    <div className="relative">
                      <select className="w-full bg-[#1a1a1a] border border-[#333] px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                        <option value="">Select a service...</option>
                        <option value="residential">Residential Design</option>
                        <option value="construction">Construction Drawings</option>
                        <option value="multi-unit">Multi-Unit Development</option>
                        <option value="renovation">Renovation & Extension</option>
                        <option value="granny">Granny Flats</option>
                        <option value="cafs">C.A.F.S</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Project Details</label>
                    <textarea 
                      rows={5}
                      className="w-full bg-[#1a1a1a] border border-[#333] px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Tell us about your project location and requirements..."
                    ></textarea>
                  </div>

                  <button className="w-full bg-gold text-[#0d0d0d] font-bold uppercase tracking-widest py-5 hover:bg-[#b5953f] transition-colors flex items-center justify-center gap-2 group">
                    Send Enquiry
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-gold/20 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-center md:text-left">
              <span className="block text-lg font-bold mb-1">Patrick De Rossi Design & Drafting</span>
              <span className="text-sm text-gray-500">South Perth WA 6151</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="tel:+61423231515" className="hover:text-gold transition-colors">+61 423 231 515</a>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <a href="mailto:info@patrickderossi.com.au" className="hover:text-gold transition-colors">info@patrickderossi.com.au</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-white hover:text-gold hover:bg-[#1a1a1a] transition-all border border-white/5">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-white hover:text-gold hover:bg-[#1a1a1a] transition-all border border-white/5">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-600 border-t border-white/5 pt-8">
            © {new Date().getFullYear()} Patrick De Rossi Design & Drafting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
