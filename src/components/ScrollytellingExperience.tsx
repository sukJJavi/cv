"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Globe, Linkedin, Sparkles, Terminal, Layers, Cpu } from "lucide-react";
import ParticleFieldCanvas, { ScrollEngineState } from "./ParticleFieldCanvas";
import { NARRATIVE, Locale } from "@/data/narrative";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollytellingExperience() {
  const [locale, setLocale] = useState<Locale>("es");
  const [activeAct, setActiveAct] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const content = NARRATIVE[locale];

  // Shared mutable state read at 60fps by Three.js requestAnimationFrame loop
  const engineStateRef = useRef<ScrollEngineState>({
    morphStage: 0,
    globalProgress: 0,
    interactionPulse: 0,
  });

  // DOM Refs for GSAP ScrollTrigger choreography
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  const act1SectionRef = useRef<HTMLElement | null>(null);
  const act1PinRef = useRef<HTMLDivElement | null>(null);

  const act2SectionRef = useRef<HTMLElement | null>(null);
  const act2PinRef = useRef<HTMLDivElement | null>(null);

  const act3SectionRef = useRef<HTMLElement | null>(null);
  const act3PinRef = useRef<HTMLDivElement | null>(null);

  const footerSectionRef = useRef<HTMLElement | null>(null);

  const triggerPulse = useCallback((strength = 0.85) => {
    engineStateRef.current.interactionPulse = Math.max(
      engineStateRef.current.interactionPulse,
      strength
    );
  }, []);

  const handleLanguageChange = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      triggerPulse(0.9);
      setLocale(nextLocale);
      // Preserve exact ScrollTrigger positions without resetting scroll
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    [locale, triggerPulse]
  );

  const scrollToSection = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // GSAP ScrollTrigger Master Choreography (Initialized once, independent of language toggle)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global scroll progress tracker
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          engineStateRef.current.globalProgress = p;
          setScrollPercent(Math.round(p * 100));
        },
      });

      // =====================================================================
      // 1. HERO PINNED STAGE (Morph 0.0 -> 1.0 as Hero dissolves into Act I)
      // =====================================================================
      if (heroSectionRef.current && heroInnerRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "+=115%",
            pin: true,
            scrub: 1,
            onEnter: () => setActiveAct(0),
            onEnterBack: () => setActiveAct(0),
            onUpdate: (self) => {
              // Morph smoothly from 0.0 (Nebula) toward 0.85 (approaching Lattice)
              engineStateRef.current.morphStage = self.progress * 0.85;
            },
          },
        });

        heroTl
          .to(
            ".hero-meta-row",
            {
              y: -28,
              opacity: 0.15,
              duration: 0.6,
              ease: "power2.inOut",
            },
            0.15
          )
          .to(
            ".hero-headline-line",
            {
              y: -55,
              opacity: 0,
              stagger: 0.06,
              filter: "blur(8px)",
              duration: 0.75,
              ease: "power3.inOut",
            },
            0.2
          )
          .to(
            ".hero-sub-block",
            {
              y: -35,
              opacity: 0,
              duration: 0.65,
              ease: "power2.inOut",
            },
            0.25
          );
      }

      // =====================================================================
      // 2. ACT I: EL OFICIO Y LAS TRINCHERAS (Morph locked around 1.0 Lattice)
      // =====================================================================
      if (act1SectionRef.current && act1PinRef.current) {
        // Pinned narrative intro stage for Act I
        const act1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: act1PinRef.current,
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: 1,
            onEnter: () => setActiveAct(1),
            onEnterBack: () => setActiveAct(1),
            onUpdate: (self) => {
              // Stabilize at 1.0 (Cartesian Lattice) during pin
              engineStateRef.current.morphStage = 0.85 + self.progress * 0.25;
            },
          },
        });

        act1Tl
          .fromTo(
            ".act1-reveal",
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.45,
              ease: "power3.out",
            },
            0
          )
          .to(
            ".act1-reveal",
            {
              y: -36,
              opacity: 0.25,
              stagger: 0.04,
              duration: 0.35,
              ease: "power2.in",
            },
            0.72
          );

        // Transition across Act I timeline cards toward Act II (1.1 -> 1.85)
        ScrollTrigger.create({
          trigger: ".act1-timeline-grid",
          start: "top 80%",
          end: "bottom 25%",
          scrub: 1,
          onUpdate: (self) => {
            engineStateRef.current.morphStage = 1.1 + self.progress * 0.75;
          },
        });
      }

      // =====================================================================
      // 3. ACT II: LA MÁQUINA DE PRODUCCIÓN (Morph 2.0 Industrial Monolith)
      // =====================================================================
      if (act2SectionRef.current && act2PinRef.current) {
        const act2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: act2PinRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            onEnter: () => setActiveAct(2),
            onEnterBack: () => setActiveAct(2),
            onUpdate: (self) => {
              // Lock into dense Monolith (1.85 -> 2.15)
              engineStateRef.current.morphStage = 1.85 + self.progress * 0.3;
            },
          },
        });

        act2Tl
          .fromTo(
            ".act2-reveal",
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.45,
              ease: "power3.out",
            },
            0
          )
          .fromTo(
            ".act2-metric-card",
            { y: 40, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.1,
              duration: 0.45,
              ease: "power3.out",
            },
            0.12
          )
          .to(
            ".act2-reveal",
            {
              y: -32,
              opacity: 0.25,
              duration: 0.3,
              ease: "power2.in",
            },
            0.78
          );

        // Transition across Act II agency/brand matrix toward Act III (2.15 -> 2.85)
        ScrollTrigger.create({
          trigger: ".act2-ecosystem-block",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onUpdate: (self) => {
            engineStateRef.current.morphStage = 2.15 + self.progress * 0.7;
          },
        });
      }

      // =====================================================================
      // 4. ACT III: LA SINGULARIDAD Y EL FUTURO (Morph 3.0 Orbital AI Core)
      // =====================================================================
      if (act3SectionRef.current && act3PinRef.current) {
        const act3Tl = gsap.timeline({
          scrollTrigger: {
            trigger: act3PinRef.current,
            start: "top top",
            end: "+=115%",
            pin: true,
            scrub: 1,
            onEnter: () => setActiveAct(3),
            onEnterBack: () => setActiveAct(3),
            onUpdate: (self) => {
              // Full orbital singularity state (2.85 -> 3.0)
              engineStateRef.current.morphStage = 2.85 + self.progress * 0.15;
            },
          },
        });

        act3Tl
          .fromTo(
            ".act3-reveal",
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.48,
              ease: "power3.out",
            },
            0
          )
          .to(
            ".act3-reveal",
            {
              y: -28,
              opacity: 0.3,
              duration: 0.3,
              ease: "power2.in",
            },
            0.78
          );
      }

      // =====================================================================
      // 5. EPILOGUE / FOOTER
      // =====================================================================
      if (footerSectionRef.current) {
        ScrollTrigger.create({
          trigger: footerSectionRef.current,
          start: "top 65%",
          onEnter: () => setActiveAct(3),
          onLeaveBack: () => setActiveAct(3),
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#050505] text-[#EAE8E3] selection:bg-[#FF4D1C] selection:text-[#050505] overflow-x-hidden"
    >
      {/* ===================================================================
          THREE.JS / WEBGL HIGH-DENSITY MORPHING PARTICLE FIELD
      =================================================================== */}
      <ParticleFieldCanvas engineStateRef={engineStateRef} />

      {/* Subtle atmospheric radial vignette so editorial typography always reads with surgical clarity */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 38% 48%, rgba(5,5,5,0.28) 0%, rgba(5,5,5,0.52) 65%, rgba(5,5,5,0.82) 100%)",
        }}
      />

      {/* ===================================================================
          FIXED COUTURE HEADER (Exact visual match to reference image)
      =================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/75 backdrop-blur-md">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10 md:px-14 h-16 md:h-20 flex items-center justify-between">
          {/* Left Brand Monogram: JBG. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={() => triggerPulse(0.6)}
            className="group flex items-baseline text-left focus:outline-none"
            aria-label="Javier Blanco González - Inicio"
          >
            <span className="font-sans font-extrabold tracking-[-0.06em] text-xl md:text-2xl text-[#EAE8E3] group-hover:text-white transition-colors">
              JBG
            </span>
            <span className="text-[#FF4D1C] font-sans font-black text-xl md:text-2xl ml-[1px] group-hover:scale-125 transition-transform">
              .
            </span>
          </button>

          {/* Center Status Indicator: Orange pixel dot + Monospace uppercase */}
          <div className="hidden sm:flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D1C] opacity-75" />
              <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-[#FF4D1C]" />
            </span>
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.26em] text-[#EAE8E3]/80 uppercase">
              {content.meta.status}
            </span>
          </div>

          {/* Right Language Switcher (ES / EN) + Quick Contact */}
          <div className="flex items-center gap-5">
            <div
              role="group"
              aria-label="Selector de idioma / Language switcher"
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em]"
            >
              <button
                type="button"
                onClick={() => handleLanguageChange("es")}
                className={`px-2 py-1 transition-all duration-200 ${
                  locale === "es"
                    ? "text-[#EAE8E3] font-semibold border-b border-[#FF4D1C]"
                    : "text-[#8E8D8A]/60 hover:text-[#EAE8E3]"
                }`}
              >
                ES
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 transition-all duration-200 ${
                  locale === "en"
                    ? "text-[#EAE8E3] font-semibold border-b border-[#FF4D1C]"
                    : "text-[#8E8D8A]/60 hover:text-[#EAE8E3]"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Horizontal Divider with Signature Ember Pixel Accent (from reference image) */}
        <div className="relative w-full h-[1px] bg-white/[0.11]">
          {/* Active scroll progress filament */}
          <div
            className="absolute top-0 left-0 h-full bg-[#FF4D1C]/70 transition-all duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
          {/* Signature orange pixel square below right header (exact detail from reference screenshot) */}
          <span
            aria-hidden="true"
            className="absolute -top-[5px] right-[4.5%] w-[5px] h-[5px] bg-[#FF4D1C]"
          />
        </div>
      </header>

      {/* ===================================================================
          FIXED BOTTOM TELEMETRY & CHAPTER NAVIGATION BAR
      =================================================================== */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none hidden md:block">
        <div className="max-w-[1680px] mx-auto px-10 md:px-14 py-5 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-[#8E8D8A]">
          {/* Left: Active WebGL Morph Buffer Telemetry */}
          <div className="flex items-center gap-3 bg-[#050505]/70 backdrop-blur-md px-3.5 py-2 border border-white/[0.08] pointer-events-auto">
            <span className="w-1.5 h-1.5 bg-[#FF4D1C]" />
            <span className="text-[#EAE8E3]/90">
              STATE 0{activeAct} //
            </span>
            <span className="text-[#8E8D8A]">
              {content.meta.webglStateLabel[activeAct]}
            </span>
          </div>

          {/* Center: Interactive Act Scrubber Pills */}
          <nav
            aria-label="Capítulos de la narrativa"
            className="flex items-center gap-1.5 bg-[#050505]/75 backdrop-blur-md px-2 py-1.5 border border-white/[0.08] pointer-events-auto"
          >
            {[
              { idx: 0, label: "00 HERO", ref: heroSectionRef },
              { idx: 1, label: "01 2000—12", ref: act1SectionRef },
              { idx: 2, label: "02 HELP ESTUDIO", ref: act2SectionRef },
              { idx: 3, label: "03 IA & LAB", ref: act3SectionRef },
              { idx: 4, label: "04 CONTACTO", ref: footerSectionRef },
            ].map((item) => {
              const isCurrent =
                activeAct === item.idx || (item.idx === 4 && scrollPercent > 92);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToSection(item.ref.current)}
                  className={`px-2.5 py-1 transition-all ${
                    isCurrent
                      ? "bg-[#FF4D1C] text-[#050505] font-semibold"
                      : "text-[#8E8D8A] hover:text-[#EAE8E3]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Coordinates & Scroll Percentage */}
          <div className="flex items-center gap-4 bg-[#050505]/70 backdrop-blur-md px-3.5 py-2 border border-white/[0.08]">
            <span>{content.meta.coordinates}</span>
            <span className="text-[#FF4D1C] font-semibold">
              {String(scrollPercent).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </aside>

      {/* ===================================================================
          MAIN SCROLLYTELLING STAGE
      =================================================================== */}
      <main className="relative z-10">
        {/* =================================================================
            HERO / EL LATIDO INICIAL (EXACT REFERENCE IMAGE COMPOSITION)
        ================================================================= */}
        <section
          ref={heroSectionRef}
          className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-20 md:pt-36 md:pb-24 px-6 sm:px-10 md:px-20 lg:px-28 max-w-[1680px] mx-auto"
        >
          <div ref={heroInnerRef} className="my-auto w-full">
            {/* Top Technical Row: 00 / 01 on Left, Role on Right (Matches reference screenshot) */}
            <div className="hero-meta-row flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-14">
              <div className="font-mono text-[11px] md:text-xs tracking-[0.28em] text-[#FF4D1C] font-medium">
                {content.hero.index}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.28em] text-[#EAE8E3]/90 uppercase">
                {content.hero.role}
              </div>
            </div>

            {/* Monumental Editorial Serif Headline (Matches reference screenshot proportions & line breaks) */}
            <h1 className="font-serif font-normal text-[#EAE8E3] tracking-[-0.03em] leading-[0.98] text-[clamp(3.1rem,8.4vw,8.25rem)] max-w-[15ch]">
              {content.hero.headlineLines.map((line, i) => (
                <span key={i} className="hero-headline-line block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheadline & Subtle Editorial Actions */}
            <div className="hero-sub-block mt-10 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="font-sans font-light text-[#EAE8E3]/85 text-base sm:text-lg md:text-[21px] leading-[1.55] max-w-[44ch] tracking-[-0.01em]">
                {content.hero.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection(act1SectionRef.current)}
                  onMouseEnter={() => triggerPulse(0.75)}
                  className="group inline-flex items-center gap-3 px-5 py-3 bg-[#EAE8E3] text-[#050505] font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-[#FF4D1C] hover:text-[#050505] transition-colors"
                >
                  <span>{content.hero.ctaExplore}</span>
                  <span className="group-hover:translate-y-0.5 transition-transform">
                    ↓
                  </span>
                </button>
                <a
                  href="mailto:javi@help-estudio.es"
                  onMouseEnter={() => triggerPulse(0.75)}
                  className="inline-flex items-center gap-2.5 px-5 py-3 border border-white/20 bg-[#050505]/60 backdrop-blur-sm text-[#EAE8E3] font-mono text-[11px] tracking-[0.22em] uppercase hover:border-[#FF4D1C] hover:text-[#FF4D1C] transition-colors"
                >
                  <span>{content.hero.ctaContact}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Subtle Scroll Telemetry */}
          <div className="hero-sub-block pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.24em] text-[#8E8D8A]">
            <span>{content.hero.manifestoTag}</span>
            <span className="text-[#EAE8E3]/70 animate-pulse">
              {content.meta.scrollHint}
            </span>
          </div>
        </section>

        {/* =================================================================
            ACTO I / EL OFICIO Y LAS TRINCHERAS (2000 — 2012)
            WebGL State: Surgical 3D Cartesian Lattice
        ================================================================= */}
        <section
          ref={act1SectionRef}
          id="act-1"
          className="relative w-full max-w-[1680px] mx-auto px-6 sm:px-10 md:px-20 lg:px-28"
        >
          {/* Pinned Dramatic Narrative Stage */}
          <div
            ref={act1PinRef}
            className="min-h-screen flex flex-col justify-center py-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Chapter Index & Monumental Editorial Serif */}
              <div className="lg:col-span-7 space-y-6">
                <div className="act1-reveal flex items-center gap-4 font-mono text-xs tracking-[0.26em]">
                  <span className="text-[#FF4D1C] font-semibold">
                    {content.act1.index}
                  </span>
                  <span className="w-8 h-[1px] bg-[#FF4D1C]/60" />
                  <span className="text-[#EAE8E3]/80">{content.act1.chapter}</span>
                </div>

                <div className="act1-reveal inline-block px-3 py-1 border border-white/15 bg-white/[0.03] font-mono text-[11px] tracking-[0.24em] text-[#FF4D1C]">
                  {content.act1.years}
                </div>

                <h2 className="act1-reveal font-serif text-[clamp(2.5rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.025em] text-[#EAE8E3]">
                  {content.act1.title}
                </h2>

                <p className="act1-reveal font-sans text-lg md:text-xl text-[#EAE8E3]/80 font-light leading-relaxed max-w-[54ch]">
                  {content.act1.subtitle}
                </p>
              </div>

              {/* Right Column: Deep Auteur Reflection Card */}
              <div className="lg:col-span-5 lg:pt-14 space-y-6">
                <div className="act1-reveal p-7 md:p-9 bg-[#050505]/75 backdrop-blur-md border border-white/[0.12] relative">
                  <span
                    aria-hidden="true"
                    className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-[#FF4D1C]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-[#FF4D1C]"
                  />

                  <p className="font-sans text-base md:text-[17px] leading-[1.7] text-[#EAE8E3]/90 mb-5">
                    {content.act1.editorialLead}
                  </p>
                  <p className="font-sans text-sm md:text-[15px] leading-[1.75] text-[#8E8D8A]">
                    {content.act1.editorialBody}
                  </p>

                  <blockquote className="mt-7 pt-6 border-t border-white/10 font-serif italic text-lg md:text-xl text-[#EAE8E3]">
                    {content.act1.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Act I Interactive Agency Trench Logbook (2000 - 2012) */}
          <div className="act1-timeline-grid pb-32 md:pb-44">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-10">
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#EAE8E3]">
                <Layers className="w-3.5 h-3.5 text-[#FF4D1C]" />
                <span>{content.act1.agenciesLabel}</span>
              </div>
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#8E8D8A]">
                MADRID · IN-HOUSE & NETWORKS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.act1.timeline.map((item, idx) => (
                <article
                  key={`${item.company}-${idx}`}
                  onMouseEnter={() => triggerPulse(0.65)}
                  className="group relative p-6 md:p-7 bg-[#050505]/80 backdrop-blur-md border border-white/[0.1] hover:border-[#FF4D1C]/70 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-[#8E8D8A] mb-4">
                      <span className="text-[#FF4D1C]">{item.period}</span>
                      <span>0{idx + 1}</span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-[26px] text-[#EAE8E3] group-hover:text-white leading-tight">
                      {item.company}
                    </h3>
                    <div className="font-mono text-[11px] tracking-[0.18em] text-[#EAE8E3]/70 uppercase mt-1 mb-4">
                      {item.role}
                    </div>

                    <p className="font-sans text-sm text-[#8E8D8A] leading-relaxed mb-6">
                      {item.highlights}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                    {item.clients.map((client) => (
                      <span
                        key={client}
                        className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] tracking-[0.12em] text-[#EAE8E3]/80"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            ACTO II / LA MÁQUINA DE PRODUCCIÓN (Help Estudio, 2012 — Presente)
            WebGL State: High-Density Magnetic Industrial Monolith
        ================================================================= */}
        <section
          ref={act2SectionRef}
          id="act-2"
          className="relative w-full max-w-[1680px] mx-auto px-6 sm:px-10 md:px-20 lg:px-28"
        >
          {/* Pinned Narrative & Monumental Metrics Stage */}
          <div
            ref={act2PinRef}
            className="min-h-screen flex flex-col justify-center py-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12 md:mb-16">
              <div className="lg:col-span-7 space-y-5">
                <div className="act2-reveal flex items-center gap-4 font-mono text-xs tracking-[0.26em]">
                  <span className="text-[#FF4D1C] font-semibold">
                    {content.act2.index}
                  </span>
                  <span className="w-8 h-[1px] bg-[#FF4D1C]/60" />
                  <span className="text-[#EAE8E3]/80">{content.act2.chapter}</span>
                </div>

                <div className="act2-reveal inline-block px-3 py-1 border border-[#FF4D1C]/40 bg-[#FF4D1C]/10 font-mono text-[11px] tracking-[0.24em] text-[#FF4D1C]">
                  {content.act2.years}
                </div>

                <h2 className="act2-reveal font-serif text-[clamp(2.5rem,5.5vw,5.25rem)] leading-[1.02] tracking-[-0.025em] text-[#EAE8E3]">
                  {content.act2.title}
                </h2>
              </div>

              <div className="lg:col-span-5">
                <div className="act2-reveal p-6 md:p-8 bg-[#050505]/80 backdrop-blur-md border border-white/[0.12] space-y-4">
                  <p className="font-sans text-base leading-[1.65] text-[#EAE8E3]/90">
                    {content.act2.editorialLead}
                  </p>
                  <p className="font-sans text-sm leading-[1.7] text-[#8E8D8A]">
                    {content.act2.editorialBody}
                  </p>
                </div>
              </div>
            </div>

            {/* Monumental Brutalist Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.act2.metrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  onMouseEnter={() => triggerPulse(0.95)}
                  className="act2-metric-card group relative p-7 md:p-9 bg-[#050505]/85 backdrop-blur-md border border-white/[0.14] hover:border-[#FF4D1C] transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.24em] text-[#8E8D8A] mb-3">
                    <span>METRIC // 0{idx + 1}</span>
                    <span className="w-2 h-2 bg-[#FF4D1C]" />
                  </div>
                  <div className="font-serif text-[clamp(3.4rem,6vw,5.8rem)] leading-none tracking-[-0.03em] text-[#EAE8E3] group-hover:text-[#FF4D1C] transition-colors">
                    {metric.value}
                  </div>
                  <div className="font-mono text-xs tracking-[0.22em] text-[#EAE8E3] uppercase mt-4 mb-2">
                    {metric.label}
                  </div>
                  <p className="font-sans text-xs md:text-sm text-[#8E8D8A] leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tier-1 Agencies, Global Brands & Format Architecture Matrix */}
          <div className="act2-ecosystem-block pb-32 md:pb-44 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Tier-1 Partner Agencies */}
              <div className="lg:col-span-5 p-7 md:p-9 bg-[#050505]/80 backdrop-blur-md border border-white/[0.12]">
                <div className="font-mono text-xs tracking-[0.24em] text-[#FF4D1C] uppercase mb-6 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#FF4D1C]" />
                  <span>{content.act2.tier1Label}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {content.act2.agencies.map((agency) => (
                    <div
                      key={agency}
                      onMouseEnter={() => triggerPulse(0.6)}
                      className="p-4 border border-white/[0.1] bg-white/[0.02] hover:border-[#FF4D1C]/60 transition-colors text-center"
                    >
                      <span className="font-serif text-xl text-[#EAE8E3]">
                        {agency}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Format Architecture */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="font-mono text-[11px] tracking-[0.22em] text-[#8E8D8A] uppercase mb-4">
                    {content.act2.formatsLabel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {content.act2.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-3 py-1 bg-white/[0.04] border border-white/10 font-mono text-[11px] tracking-[0.15em] text-[#EAE8E3]/85"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Iconic Global Brands Delivered */}
              <div className="lg:col-span-7 p-7 md:p-9 bg-[#050505]/80 backdrop-blur-md border border-white/[0.12] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs tracking-[0.24em] text-[#EAE8E3] uppercase mb-6 flex items-center justify-between">
                    <span>{content.act2.brandsLabel}</span>
                    <span className="text-[#FF4D1C]">PIXEL-PERFECT SLA</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {content.act2.brands.map((brand) => (
                      <div
                        key={brand}
                        onMouseEnter={() => triggerPulse(0.5)}
                        className="px-4 py-4 border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/30 transition-all flex items-center justify-between"
                      >
                        <span className="font-sans text-sm md:text-base font-medium text-[#EAE8E3]">
                          {brand}
                        </span>
                        <span className="w-1 h-1 bg-[#FF4D1C]/70" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-[#8E8D8A]">
                  <span>ESTRATEGIA · DIRECCIÓN DE ARTE · UX/UI · INGENIERÍA</span>
                  <span className="text-[#EAE8E3]">HELP-ESTUDIO.ES</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            ACTO III / LA SINGULARIDAD Y EL FUTURO (SaaS & IA - Help Estudio Lab)
            WebGL State: Living Multi-Ring Orbital Core
        ================================================================= */}
        <section
          ref={act3SectionRef}
          id="act-3"
          className="relative w-full max-w-[1680px] mx-auto px-6 sm:px-10 md:px-20 lg:px-28"
        >
          {/* Pinned Orbital Singularity Intro */}
          <div
            ref={act3PinRef}
            className="min-h-screen flex flex-col justify-center py-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="act3-reveal flex items-center gap-4 font-mono text-xs tracking-[0.26em]">
                  <span className="text-[#FF4D1C] font-semibold">
                    {content.act3.index}
                  </span>
                  <span className="w-8 h-[1px] bg-[#FF4D1C]/60" />
                  <span className="text-[#EAE8E3]/80">{content.act3.chapter}</span>
                </div>

                <div className="act3-reveal inline-flex items-center gap-2 px-3 py-1 border border-[#FF4D1C]/50 bg-[#FF4D1C]/10 font-mono text-[11px] tracking-[0.24em] text-[#FF4D1C]">
                  <Sparkles className="w-3 h-3" />
                  <span>{content.act3.years}</span>
                </div>

                <h2 className="act3-reveal font-serif text-[clamp(2.5rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.025em] text-[#EAE8E3]">
                  {content.act3.title}
                </h2>

                <p className="act3-reveal font-sans text-lg md:text-xl text-[#EAE8E3]/80 font-light leading-relaxed max-w-[54ch]">
                  {content.act3.subtitle}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="act3-reveal p-7 md:p-9 bg-[#050505]/80 backdrop-blur-md border border-white/[0.14] space-y-5">
                  <p className="font-sans text-base md:text-[17px] leading-[1.7] text-[#EAE8E3]/90">
                    {content.act3.editorialLead}
                  </p>
                  <p className="font-sans text-sm md:text-[15px] leading-[1.75] text-[#8E8D8A]">
                    {content.act3.editorialBody}
                  </p>
                  <div className="pt-5 border-t border-white/10 font-serif italic text-lg text-[#FF4D1C]">
                    “{content.act3.closingManifesto}”
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Estudio Lab — Proprietary SaaS & AI Products Showcase */}
          <div className="pb-32 md:pb-44 space-y-16">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4 mb-10">
                <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#EAE8E3]">
                  <Terminal className="w-3.5 h-3.5 text-[#FF4D1C]" />
                  <span>{content.act3.labLabel}</span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.22em] text-[#FF4D1C]">
                  NEXT.JS · TYPESCRIPT · MULTI-AGENT IA · WEBGL
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.act3.products.map((product) => {
                  const isHovered = hoveredProduct === product.id;
                  return (
                    <a
                      key={product.id}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => {
                        setHoveredProduct(product.id);
                        triggerPulse(1.0);
                      }}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className={`group relative p-7 md:p-10 bg-[#050505]/85 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between ${
                        isHovered
                          ? "border-[#FF4D1C] -translate-y-1 shadow-[0_0_50px_rgba(255,77,28,0.12)]"
                          : "border-white/[0.12]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.22em] mb-5">
                          <span className="text-[#FF4D1C] font-semibold">
                            {product.index}
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#FF4D1C]/15 border border-[#FF4D1C]/40 text-[#EAE8E3] text-[10px]">
                            {product.status}
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h3 className="font-serif text-3xl md:text-4xl text-[#EAE8E3] group-hover:text-[#FF4D1C] transition-colors">
                            {product.name}
                          </h3>
                          <span className="inline-flex items-center gap-1 font-mono text-xs tracking-[0.15em] text-[#8E8D8A] group-hover:text-[#EAE8E3]">
                            {product.url}
                            <ArrowUpRight className="w-4 h-4 text-[#FF4D1C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>

                        <div className="font-mono text-[10px] tracking-[0.22em] text-[#8E8D8A] uppercase mb-5">
                          {product.tag}
                        </div>

                        <p className="font-sans text-sm md:text-base text-[#EAE8E3]/85 leading-[1.7] mb-8">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-white/10 flex flex-wrap gap-2">
                        {product.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] tracking-[0.15em] text-[#EAE8E3]/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 2026 Full-Stack & AI Capabilities Matrix */}
            <div className="p-8 md:p-10 bg-[#050505]/85 backdrop-blur-md border border-white/[0.12]">
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#EAE8E3] mb-8">
                <Cpu className="w-4 h-4 text-[#FF4D1C]" />
                <span>{content.act3.capabilitiesLabel}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.act3.capabilities.map((cap) => (
                  <div key={cap.category} className="space-y-4">
                    <div className="font-mono text-[11px] tracking-[0.2em] text-[#FF4D1C] border-b border-white/10 pb-2">
                      {cap.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cap.items.map((skill) => (
                        <span
                          key={skill}
                          onMouseEnter={() => triggerPulse(0.45)}
                          className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.1] hover:border-[#FF4D1C] font-mono text-xs tracking-[0.12em] text-[#EAE8E3] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            EPÍLOGO / CONTACTO DIRECTO (JBG · HELP ESTUDIO)
        ================================================================= */}
        <footer
          ref={footerSectionRef}
          className="relative w-full border-t border-white/[0.12] bg-[#050505]/90 backdrop-blur-xl pt-24 pb-28 px-6 sm:px-10 md:px-20 lg:px-28"
        >
          <div className="max-w-[1680px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 font-mono text-xs tracking-[0.26em] text-[#FF4D1C]">
                  <span>{content.footer.index}</span>
                  <span>//</span>
                  <span>{content.footer.kicker}</span>
                </div>

                <h2 className="font-serif text-[clamp(2.6rem,6vw,5.8rem)] leading-[1.0] tracking-[-0.03em] text-[#EAE8E3]">
                  {content.footer.headline}
                </h2>

                <p className="font-sans text-base md:text-lg text-[#8E8D8A] max-w-[52ch] leading-relaxed">
                  {content.footer.subline}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <a
                    href="mailto:javi@help-estudio.es"
                    onMouseEnter={() => triggerPulse(1.0)}
                    className="group flex items-center justify-between p-5 border border-white/15 bg-white/[0.02] hover:bg-[#FF4D1C] hover:text-[#050505] hover:border-[#FF4D1C] transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <Mail className="w-4 h-4 text-[#FF4D1C] group-hover:text-[#050505]" />
                      <span className="font-mono text-xs md:text-sm tracking-[0.18em]">
                        JAVI@HELP-ESTUDIO.ES
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://help-estudio.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => triggerPulse(0.8)}
                    className="group flex items-center justify-between p-5 border border-white/15 bg-white/[0.02] hover:border-[#FF4D1C] transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <Globe className="w-4 h-4 text-[#FF4D1C]" />
                      <span className="font-mono text-xs md:text-sm tracking-[0.18em] text-[#EAE8E3]">
                        HELP-ESTUDIO.ES
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E8D8A] group-hover:text-[#FF4D1C]" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/jjavierblanco"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => triggerPulse(0.8)}
                    className="group flex items-center justify-between p-5 border border-white/15 bg-white/[0.02] hover:border-[#FF4D1C] transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <Linkedin className="w-4 h-4 text-[#FF4D1C]" />
                      <span className="font-mono text-xs md:text-sm tracking-[0.18em] text-[#EAE8E3]">
                        /IN/JJAVIERBLANCO
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E8D8A] group-hover:text-[#FF4D1C]" />
                  </a>
                </div>

                {/* Academic & Location Metadata */}
                <div className="p-5 border border-white/[0.08] bg-white/[0.01] space-y-2 font-mono text-[11px] tracking-[0.16em]">
                  <div className="text-[#8E8D8A]">
                    {content.footer.educationLabel}
                  </div>
                  <div className="text-[#EAE8E3]">{content.footer.education}</div>
                  <div className="text-[#8E8D8A]">
                    {content.footer.educationSchool}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] text-[#8E8D8A]">
              <span>{content.footer.copyright}</span>
              <span>{content.footer.location}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
