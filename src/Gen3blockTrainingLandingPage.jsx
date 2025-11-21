import React, { useEffect, useRef, useState } from 'react';
import {
  initializeHaptics,
  addHapticFeedback,
  createRippleWithHaptic,
  VibrationPattern,
  addMagneticEffect
} from './utils/haptics';
import {
  initIntersectionAnimations,
  initSectionReveal,
  smoothScrollTo,
  addStaggerAnimation
} from './utils/scrollAnimations';
import './animations.css';

export default function Gen3blockTrainingLandingPage() {
  const heroRef = useRef(null);
  const navLinksRef = useRef([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // FAQ data
  const faqs = [
    {
      category: 'Experience',
      question: 'Do I need prior programming experience?',
      answer: 'Foundation workshops are designed for complete beginners. Certification and advanced tracks are better if you have some programming or data experience, and we clearly flag prerequisites on each course page.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'blue'
    },
    {
      category: 'Format',
      question: 'Are sessions live or pre-recorded?',
      answer: 'Core delivery is live and interactive. Selected sessions are recorded for on-demand review, but we encourage live attendance for the best learning experience and peer interaction.',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      color: 'indigo'
    },
    {
      category: 'Careers',
      question: 'Will this help with my career progression?',
      answer: 'We can\'t promise specific roles, but programmes are built to maximise your chances: practical projects, interview-ready stories and access to a network of employers and practitioners.',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'cyan'
    },
    {
      category: 'Organisations',
      question: 'Can my organisation sponsor or fund places?',
      answer: 'Yes. We work directly with HR, L&D and leadership teams, provide invoices and can align programmes to internal development frameworks and budgets.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: 'blue'
    },
    {
      category: 'Duration',
      question: 'How long are the programmes?',
      answer: 'Foundation courses run 3 sessions. Certification programmes are 12 weeks part-time. Corporate programmes are tailored to your needs, typically 4-16 weeks depending on scope and intensity.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'indigo'
    },
    {
      category: 'Certification',
      question: 'Do I get a certificate upon completion?',
      answer: 'Yes. Certification programmes include a GEN3BLOCK AI Practitioner Certificate. Foundation courses receive a completion badge. All can be shared on LinkedIn and added to your CV.',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      color: 'cyan'
    },
    {
      category: 'Location',
      question: 'Where are the in-person sessions held?',
      answer: 'Our primary training centre is in Northampton, UK. We also deliver on-site sessions for corporate clients and partner with venues across the Midlands and beyond for regional cohorts.',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      color: 'blue'
    },
    {
      category: 'Support',
      question: 'What support is available during the course?',
      answer: 'You\'ll have access to instructors via Slack, weekly office hours, peer study groups, and 1-1 sessions for certification students. Support continues for 30 days post-completion.',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'indigo'
    }
  ];

  useEffect(() => {
    // Initialize haptic feedback for interactive elements
    initializeHaptics();

    // Initialize scroll animations
    const cleanupScroll = initIntersectionAnimations('.fade-in-scroll', 'visible', {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    });

    // Initialize section reveal
    const cleanupSections = initSectionReveal('section');

    // Add stagger animations to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, index) => {
      link.style.animationDelay = `${index * 0.1}s`;
      link.classList.add('animate-slide-in-bottom');
    });

    // Add magnetic effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.magnetic-btn');
    const magneticCleanups = Array.from(ctaButtons).map(btn => addMagneticEffect(btn, 8));

    // Cleanup function
    return () => {
      cleanupScroll?.();
      cleanupSections?.();
      magneticCleanups.forEach(cleanup => cleanup?.());
    };
  }, []);

  // Handle ripple effect on button clicks
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    if (button.classList.contains('ripple-container')) {
      createRippleWithHaptic(e, button, VibrationPattern.CLICK);
    }
  };

  // Handle smooth scroll
  const handleNavClick = (e, href) => {
    e.preventDefault();
    smoothScrollTo(href, 80);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-gradient-to-b from-[#0A1024] to-[#0D1430]">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 md:gap-6 lg:gap-9 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <p className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-2xl font-black tracking-wider text-transparent">
                GEN3BLOCK
              </p>
              <p className="text-xs font-light tracking-widest text-slate-400">TRAINING</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-white md:flex">
            <a href="#readiness" onClick={(e) => handleNavClick(e, '#readiness')} className="animated-underline transition smooth-color hover:text-blue-400 glow-hover">AI readiness</a>
            <a href="#who" onClick={(e) => handleNavClick(e, '#who')} className="animated-underline transition smooth-color hover:text-blue-400 glow-hover">Who we train</a>
            <a href="#programmes" onClick={(e) => handleNavClick(e, '#programmes')} className="animated-underline transition smooth-color hover:text-blue-400 glow-hover">Programmes</a>
            <a href="#policy" onClick={(e) => handleNavClick(e, '#policy')} className="animated-underline transition smooth-color hover:text-blue-400 glow-hover">UK policy</a>
            <a href="#faqs" onClick={(e) => handleNavClick(e, '#faqs')} className="animated-underline transition smooth-color hover:text-blue-400 glow-hover">FAQs</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" className="hidden sm:inline-flex rounded-xl border-2 border-blue-400/60 bg-gradient-to-r from-blue-50/40 to-cyan-50/40 px-3 sm:px-4 py-2 text-xs font-semibold text-blue-300 backdrop-blur-sm transition hover:from-blue-100/50 hover:to-cyan-100/50 hover:border-blue-500/70">
              Download overview
            </button>
            <button type="button" className="rounded-xl border-2 border-blue-400/60 bg-gradient-to-r from-blue-50/40 to-cyan-50/40 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-sm transition hover:from-blue-100/50 hover:to-cyan-100/50 hover:border-blue-500/70">
              Book consultation
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-slate-100 via-white to-slate-100">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-10 px-4 sm:px-6 pb-12 sm:pb-16 pt-10 sm:pt-14 lg:flex-row-reverse lg:items-center">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/50 bg-blue-50/80 px-4 py-2 text-xs font-medium text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-200/50">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                Northampton-based · UK policy aligned
              </span>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Master AI Skills for
                <span className="block text-slate-950">
                  Real Work, Real Impact
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                From foundational literacy to advanced deployment—practical, hands-on AI training for learners,
                professionals, and organisations ready to lead in the age of intelligence.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 fade-in-scroll">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="ripple-container interactive-btn magnetic-btn rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl hover:shadow-blue-500/40 sm:hover:scale-105 sm:hover:-translate-y-1 interactive-focus"
                >
                  Browse Programmes
                </button>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="ripple-container interactive-btn magnetic-btn rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl hover:shadow-amber-500/40 sm:hover:scale-105 sm:hover:-translate-y-1 interactive-focus"
                >
                  Talk to an Advisor
                </button>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="ripple-container interactive-btn magnetic-btn rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:from-emerald-600 hover:to-green-600 hover:shadow-xl hover:shadow-emerald-500/40 sm:hover:scale-105 sm:hover:-translate-y-1 interactive-focus"
                >
                  Free Assessment
                </button>
              </div>

            </div>

            <div className="flex-1">
              <div className="relative mx-auto h-64 sm:h-80 lg:h-96 max-w-md rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-1 hover:scale-[1.02] bg-slate-800">
                {/* Hero Image */}
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration and AI training"
                  loading="eager"
                  fetchpriority="high"
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                  style={{
                    display: 'block !important',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                  onError={(e) => {
                    console.log('Image failed to load, using fallback');
                    e.target.style.display = 'none';
                  }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20 rounded-2xl pointer-events-none" style={{ zIndex: 2 }} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white" style={{ zIndex: 3 }}>
                  <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    Elite AI Training
                  </div>
                  <h3 className="text-xl font-bold">Transform Your Team with AI</h3>
                  <p className="mt-2 text-sm text-slate-200">Practical, hands-on training for real-world impact</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI readiness assessment */}
        <section id="readiness" className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-200/50">
                Free Diagnostic Tool
              </span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">How ready are you for AI?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
                Before you invest in tools, training or big transformation programmes, it helps to know where you
                stand today. Our free AI Readiness Assessment gives you a clear snapshot and practical next steps.
              </p>
            </div>

            {/* Main Content */}
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Left: Assessment Details */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-slate-950">What we assess</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <span className="text-sm font-bold text-blue-700">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Strategy & Leadership</p>
                        <p className="mt-1 text-xs text-slate-600">Vision, goals and executive buy-in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                        <span className="text-sm font-bold text-indigo-700">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Skills & Culture</p>
                        <p className="mt-1 text-xs text-slate-600">Team capabilities and adoption readiness</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <span className="text-sm font-bold text-blue-700">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Data & Infrastructure</p>
                        <p className="mt-1 text-xs text-slate-600">Technical foundations and data quality</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <span className="text-sm font-bold text-blue-700">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Governance & Risk</p>
                        <p className="mt-1 text-xs text-slate-600">Policies, compliance and assurance</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-slate-950">What you receive</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong className="font-semibold text-slate-900">Overall readiness score</strong> across all four pillars</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong className="font-semibold text-slate-900">Quick wins for the next 90 days</strong> to build momentum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong className="font-semibold text-slate-900">Suggested training pathways</strong> mapped to your needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong className="font-semibold text-slate-900">Optional follow-up call</strong> with an advisor</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: CTA Card */}
              <div className="flex flex-col justify-center">
                <div className="rounded-2xl border border-blue-200/60 bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-xl shadow-blue-500/10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-[1.02]">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-950">Take the Assessment</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Complete in 10–15 minutes and receive an instant report you can share with your team and stakeholders.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-200/50">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-slate-700">10–15 minutes to complete</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-200/50">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-sm text-slate-700">100% free, no payment required</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-200/50">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm text-slate-700">Ideal for teams, SMEs & public sector</span>
                    </div>
                  </div>

                  <button type="button" className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
                    Start Free Assessment →
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Join hundreds of organisations already using our assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who we train */}
        <section id="who" className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            {/* Enhanced Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-200/50">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Training for Everyone
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                AI training for learners, professionals & teams
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                Whether you're exploring options, changing career or leading transformation, GEN3BLOCK Training
                meets you where you are and helps you take the next step.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Open cohorts</span>
                </div>
                <span className="text-slate-400">•</span>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium">Bespoke programmes</span>
                </div>
                <span className="text-slate-400">•</span>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="font-medium">Hybrid delivery</span>
                </div>
              </div>
            </div>

            {/* Enhanced Cards Grid */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Students & Talent Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white via-blue-50/20 to-white p-6 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">Entry</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">Students & Talent</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Discover future-ready AI skills early and build a competitive edge.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Portfolio-ready AI projects</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Stronger applications & statements</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Industry-standard tools exposure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Changers Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-white via-cyan-50/20 to-white p-6 shadow-lg shadow-cyan-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-700">Career</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">Career Changers</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Move into AI-powered roles without a CS degree.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Applied AI and data skills</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Capstone projects for interviews</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Career coaching and prep</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professionals Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white via-indigo-50/20 to-white p-6 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">Pro</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">Professionals</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Translate AI into workflows and products that drive results.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Sector-specific use cases</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Measurable productivity gains</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Flexible formats around work</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teams & Organizations Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-300/50 bg-gradient-to-br from-white via-blue-50/30 to-white p-6 shadow-lg shadow-blue-500/10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-400/15 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">Enterprise</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">Teams & Organisations</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Equip teams with shared language and guardrails.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Custom curriculum mapped to roles</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Structured pilots and pathways</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-600">Change and governance support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-600">Not sure which path is right for you?</p>
              <button type="button" className="mt-3 inline-flex items-center gap-2 rounded-xl border-2 border-blue-400/60 bg-gradient-to-r from-blue-50/40 to-cyan-50/40 px-6 py-3 text-sm font-semibold text-blue-700 backdrop-blur-sm transition-all duration-300 hover:from-blue-100/50 hover:to-cyan-100/50 hover:border-blue-500/70 hover:scale-105 hover:shadow-lg">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Talk to an Advisor
              </button>
            </div>
          </div>
        </section>

        {/* Programmes */}
        <section id="programmes" className="border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            {/* Enhanced Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-200/50">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Three Training Tiers
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Programmes designed for measurable impact
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                From foundational literacy to advanced deployment, every programme is built around projects and
                outcomes—not just slides.
              </p>
              <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-blue-500/60 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-2 text-xs font-semibold text-blue-700 transition-all duration-300 hover:from-blue-100 hover:to-cyan-100 hover:scale-105 hover:shadow-lg hover:shadow-blue-200/50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View full programme catalogue
              </button>
            </div>

            {/* Enhanced Cards Grid */}
            <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Tier 1: Foundation */}
              <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-300/50 bg-gradient-to-br from-white via-slate-50/50 to-white p-6 shadow-lg shadow-slate-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/10 hover:-translate-y-2">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-slate-400/10 to-slate-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 shadow-lg shadow-slate-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">Tier 1</span>
                      <span className="text-[10px] font-medium text-slate-500">Foundation</span>
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">AI Essentials for Business</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    A three-session series for leaders and professionals who need clear, practical AI literacy and a
                    roadmap for adoption.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Understand capabilities and limits</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Hands-on with leading tools</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Identify high-impact use cases</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Leave with an adoption action plan</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-100/80 px-3 py-2">
                    <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[11px] font-medium text-slate-600">Entry level · Online or in-person</span>
                  </div>
                </div>
                <button type="button" className="relative mt-6 w-full rounded-2xl border-2 border-slate-300 bg-gradient-to-r from-slate-100 to-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400 hover:from-slate-50 hover:to-white hover:scale-[1.02] hover:shadow-lg">
                  Register interest
                </button>
              </div>

              {/* Tier 2: Certification - FEATURED */}
              <div className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-blue-400/60 bg-gradient-to-br from-white via-blue-50/30 to-white p-6 shadow-2xl shadow-blue-500/20 ring-2 ring-blue-400/20 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-500/30 hover:-translate-y-3 hover:scale-[1.03]">
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl transition-all duration-500 group-hover:scale-150" />
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Most Popular
                  </span>
                </div>
                <div className="relative flex-1">
                  <div className="flex items-start">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">Tier 2</span>
                    <span className="text-[10px] font-medium text-blue-600">Certification</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">AI Practitioner Certificate</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    A 12-week applied programme for people moving into AI-focused roles, blending live teaching, labs
                    and a capstone project.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Python, data and notebooks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Core ML concepts and projects</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Deployment, ethics and assurance</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Sector-aligned capstone project</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-blue-100/80 px-3 py-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-[11px] font-medium text-blue-700">Intermediate · 12 weeks · Hybrid delivery</span>
                  </div>
                </div>
                <button type="button" className="relative mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50">
                  Apply for next cohort →
                </button>
              </div>

              {/* Tier 3: Corporate */}
              <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-indigo-300/50 bg-gradient-to-br from-white via-indigo-50/30 to-white p-6 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-2">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-700">Tier 3</span>
                      <span className="text-[10px] font-medium text-indigo-600">Corporate</span>
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">Enterprise AI Transformation</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Bespoke programmes that bring together leadership, technical and frontline teams to adopt AI safely
                    and at scale.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Skills and capability assessment</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Scan → Pilot → Scale pattern</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Departmental workshops and labs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-700">Governance, risk and assurance support</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-100/80 px-3 py-2">
                    <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[11px] font-medium text-indigo-700">All levels · On-site / virtual / hybrid</span>
                  </div>
                </div>
                <button type="button" className="relative mt-6 w-full rounded-2xl border-2 border-indigo-500 bg-gradient-to-r from-indigo-50 to-indigo-100/50 px-5 py-3 text-sm font-semibold text-indigo-700 transition-all duration-300 hover:border-indigo-600 hover:from-indigo-100 hover:to-indigo-200/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-200/50">
                  Request organisational briefing
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* UK policy alignment */}
        <section id="policy" className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            {/* Enhanced Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-200/50">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                UK Policy Aligned
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Features aligned to UK AI policy
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                GEN3BLOCK Training is designed to plug directly into the UK's AI skills and adoption agenda, so
                employers and partners can align programmes with national priorities and local skills plans.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">Sector pathways</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">Three-pillar skills</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">Adoption toolkit</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">Assurance by design</span>
              </div>
            </div>

            {/* Enhanced Cards Grid */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 p-5 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">Employer pathways</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Sector-specific design</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Programmes co-designed with employers across health, finance, manufacturing, creative, construction
                    and life sciences.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">Three-pillar skills</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Technical · transferable · responsible</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Tracks map learning outcomes across technical, non-technical and responsible/ethical AI skills at
                    entry, mid and leadership levels.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-white to-cyan-50/30 p-5 shadow-lg shadow-cyan-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-600">Adoption toolkit</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">From idea to scale</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Leaders receive staged adoption pathways, checklists and templates to assess readiness and de-risk
                    rollouts.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 p-5 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">Scan → Pilot → Scale</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Structured delivery pattern</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Training, labs and executive sessions follow a discovery–pilot–scale cadence with procurement and
                    assurance built in.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">Assurance & safety</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">By design</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Modules include assurance techniques, bias and risk audits and documentation practices aligned with
                    pro-innovation regulation.
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-white to-cyan-50/30 p-5 shadow-lg shadow-cyan-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-600">SME-ready formats</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Short, modular and flexible</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    CPD-friendly, micro-learning formats that address cost, time and digital literacy barriers for SMEs
                    and non-technical teams.
                  </p>
                </div>
              </div>

              {/* Card 7 */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 p-5 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">Regional planning</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">LSIP-ready</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Cohorts can plug into Local Skills Improvement Plans and regional priorities, supporting inclusive
                    access beyond major hubs.
                  </p>
                </div>
              </div>

              {/* Card 8 */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">Compute & data</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Readiness labs</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Teams learn to work with modern AI compute and responsible data stewardship patterns aligned with
                    the UK's focus on sovereign compute and data infrastructure.
                  </p>
                </div>
              </div>

              {/* Card 9 */}
              <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-white to-cyan-50/30 p-5 shadow-lg shadow-cyan-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-cyan-600">Leadership fluency</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Decisions, not buzzwords</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Decision frameworks for value capture, public/private exemplars and procurement-aware guidance for
                    adoption at scale.
                  </p>
                </div>
              </div>

              {/* Card 10 */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 p-5 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">Inclusive talent</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Widening participation</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Delivery models, pacing and support widen participation across under-represented groups and
                    regions.
                  </p>
                </div>
              </div>

              {/* Card 11 */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">Measurable ROI</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-950">Evidence of impact</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Programmes define before/after metrics such as time saved, quality uplift and error reduction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            {/* Enhanced Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-200/50">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Common Questions
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                If you can't find what you're looking for, reach out and we'll help you find the right
                programme or format.
              </p>
            </div>

            {/* Accordion FAQ List */}
            <div className="mt-12 mx-auto max-w-4xl space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                const colorClasses = {
                  blue: {
                    border: 'border-blue-200/50',
                    bg: 'bg-gradient-to-br from-white to-blue-50/30',
                    shadow: 'shadow-blue-500/5',
                    hoverShadow: 'hover:shadow-blue-500/10',
                    orb: 'from-blue-400/10 to-cyan-400/10',
                    iconBg: 'from-blue-500 to-cyan-500',
                    iconShadow: 'shadow-blue-500/30',
                    badgeBg: 'bg-blue-100',
                    badgeText: 'text-blue-700'
                  },
                  indigo: {
                    border: 'border-indigo-200/50',
                    bg: 'bg-gradient-to-br from-white to-indigo-50/30',
                    shadow: 'shadow-indigo-500/5',
                    hoverShadow: 'hover:shadow-indigo-500/10',
                    orb: 'from-indigo-400/10 to-blue-400/10',
                    iconBg: 'from-indigo-500 to-blue-500',
                    iconShadow: 'shadow-indigo-500/30',
                    badgeBg: 'bg-indigo-100',
                    badgeText: 'text-indigo-700'
                  },
                  cyan: {
                    border: 'border-cyan-200/50',
                    bg: 'bg-gradient-to-br from-white to-cyan-50/30',
                    shadow: 'shadow-cyan-500/5',
                    hoverShadow: 'hover:shadow-cyan-500/10',
                    orb: 'from-cyan-400/10 to-blue-400/10',
                    iconBg: 'from-cyan-500 to-blue-500',
                    iconShadow: 'shadow-cyan-500/30',
                    badgeBg: 'bg-cyan-100',
                    badgeText: 'text-cyan-700'
                  }
                };
                const colors = colorClasses[faq.color];

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} shadow-lg ${colors.shadow} transition-all duration-500 ${colors.hoverShadow} ${isOpen ? 'shadow-xl' : ''}`}
                  >
                    <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${colors.orb} blur-2xl transition-all duration-500 group-hover:scale-150`} />
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colors.iconBg} shadow-lg ${colors.iconShadow} transition-all duration-500 group-hover:scale-110`}>
                            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={faq.icon} />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`inline-block rounded-full ${colors.badgeBg} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colors.badgeText}`}>
                              {faq.category}
                            </span>
                            <h3 className="mt-2 text-sm sm:text-base font-bold text-slate-950 pr-8">{faq.question}</h3>
                          </div>
                          <svg
                            className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 pl-0 sm:pl-16">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-600">Still have questions?</p>
              <button type="button" className="mt-3 inline-flex items-center gap-2 rounded-xl border-2 border-blue-400/60 bg-gradient-to-r from-blue-50/40 to-cyan-50/40 px-6 py-3 text-sm font-semibold text-blue-700 backdrop-blur-sm transition-all duration-300 hover:from-blue-100/50 hover:to-cyan-100/50 hover:border-blue-500/70 hover:scale-105 hover:shadow-lg">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* Contact & resources */}
        <section className="relative border-b border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.3fr_minmax(0,1fr)]">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">Ready to plan your next step?</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                  Tell us a little about your goals and we'll help you choose the right programme, cohort and
                  format—for you or your organisation.
                </p>

                <div className="mt-8 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
                  {/* Individuals Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white via-blue-50/20 to-white p-5 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
                          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">Individuals</span>
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-slate-950">Talk to an advisor</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        Book a 30-minute call to discuss your background, goals and the best starting point.
                      </p>
                      <button type="button" className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]">
                        Book consultation
                      </button>
                    </div>
                  </div>

                  {/* Organisations Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white via-indigo-50/20 to-white p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/15 hover:-translate-y-1">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">Organisations</span>
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-slate-950">Request training proposal</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        Share your priorities and we'll design a programme aligned to your teams, region and sector.
                      </p>
                      <button type="button" className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02]">
                        Request proposal
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm p-4 shadow-sm">
                  <div className="space-y-2 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold text-slate-900">Email:</span> hello@gen3block.com
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-semibold text-slate-900">Location:</span> Northampton-based training
                      centre with hybrid and online options.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Start learning today</h3>
                <div className="mt-4 space-y-3 text-xs text-slate-600">
                  {/* Guide Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 p-4 shadow-lg shadow-blue-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">Guide</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-950">The non-technical guide to AI at work</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                        A short, practical PDF covering key concepts, common pitfalls and realistic examples from UK
                        organisations.
                      </p>
                      <button type="button" className="mt-3 w-full rounded-xl border-2 border-blue-200 bg-white/80 px-4 py-2 text-[11px] font-semibold text-blue-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:scale-[1.02]">
                        Download free guide
                      </button>
                    </div>
                  </div>

                  {/* Live Session Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-4 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/30 transition-all duration-500 group-hover:scale-110">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">Live session</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-950">AI Fridays: live demo & Q&A</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                        Regular short sessions showcasing tools, workflows and real examples—with open Q&A.
                      </p>
                      <button type="button" className="mt-3 w-full rounded-xl border-2 border-indigo-200 bg-white/80 px-4 py-2 text-[11px] font-semibold text-indigo-700 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:scale-[1.02]">
                        Register for next session
                      </button>
                    </div>
                  </div>

                  {/* Community Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-white to-cyan-50/30 p-4 shadow-lg shadow-cyan-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
                          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-700">Community</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-950">Join the GEN3BLOCK learning community</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                        Get updates on new cohorts, tutorials and events, plus a space to connect with other learners
                        and practitioners.
                      </p>
                      <button type="button" className="mt-3 w-full rounded-xl border-2 border-cyan-200 bg-white/80 px-4 py-2 text-[11px] font-semibold text-cyan-700 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50 hover:scale-[1.02]">
                        Join the community
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-500/15 bg-gradient-to-b from-[#0A1024] to-[#0D1430]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand Section */}
            <div>
              <div className="leading-tight">
                <p className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-2xl font-black tracking-wider text-transparent">
                  GEN3BLOCK
                </p>
                <p className="text-xs font-light tracking-widest text-slate-400">TRAINING</p>
              </div>
              <p className="mt-4 text-sm font-light text-slate-400">
                AI skills for real work, real impact.
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[#E2E8F0]">Contact</h3>
              <div className="space-y-3 text-sm font-light text-slate-400">
                <p>
                  <span className="text-[#7BDFF2]">Email:</span> hello@gen3block.com
                </p>
                <p>
                  <span className="text-[#7BDFF2]">Location:</span> Northampton, United Kingdom
                </p>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[#E2E8F0]">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sm font-light">
                <a href="#safeguarding" className="text-slate-400 transition hover:text-[#B8F1FF]">
                  Safeguarding
                </a>
                <a href="#privacy" className="text-slate-400 transition hover:text-[#B8F1FF]">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-slate-400 transition hover:text-[#B8F1FF]">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-slate-400 transition hover:text-[#B8F1FF]">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-blue-500/15 pt-8 text-sm font-light text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} GEN3BLOCK Training. All rights reserved.</p>
            <p className="text-xs">Powered by excellence in AI education</p>
          </div>
        </div>
      </footer>
    </div>
  );
}