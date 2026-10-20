export type Locale = "es" | "en";

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string;
  clients: string[];
}

export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export interface ProductItem {
  id: string;
  index: string;
  name: string;
  url: string;
  href: string;
  tag: string;
  status: string;
  description: string;
  stack: string[];
}

export interface NarrativeContent {
  meta: {
    status: string;
    roleHeader: string;
    scrollHint: string;
    coordinates: string;
    webglStateLabel: [string, string, string, string];
  };
  hero: {
    index: string;
    role: string;
    headlineLines: [string, string, string];
    subheadline: string;
    manifestoTag: string;
    ctaExplore: string;
    ctaContact: string;
  };
  act1: {
    index: string;
    chapter: string;
    years: string;
    title: string;
    subtitle: string;
    editorialLead: string;
    editorialBody: string;
    quote: string;
    agenciesLabel: string;
    timeline: TimelineEntry[];
  };
  act2: {
    index: string;
    chapter: string;
    years: string;
    title: string;
    subtitle: string;
    editorialLead: string;
    editorialBody: string;
    metrics: MetricItem[];
    tier1Label: string;
    agencies: string[];
    brandsLabel: string;
    brands: string[];
    formatsLabel: string;
    formats: string[];
  };
  act3: {
    index: string;
    chapter: string;
    years: string;
    title: string;
    subtitle: string;
    editorialLead: string;
    editorialBody: string;
    closingManifesto: string;
    labLabel: string;
    products: ProductItem[];
    capabilitiesLabel: string;
    capabilities: {
      category: string;
      items: string[];
    }[];
  };
  footer: {
    index: string;
    kicker: string;
    headline: string;
    subline: string;
    location: string;
    educationLabel: string;
    education: string;
    educationSchool: string;
    copyright: string;
  };
}

export const NARRATIVE: Record<Locale, NarrativeContent> = {
  es: {
    meta: {
      status: "DISPONIBLE PARA PROYECTOS SELECCIONADOS",
      roleHeader: "DIRECTOR CREATIVO / ARQUITECTO DE PRODUCTO",
      scrollHint: "DESPLAZA PARA ATRAVESAR LA MEMORIA · 2000 — 2026",
      coordinates: "40.4168° N, 3.7038° W · MADRID / REMOTO",
      webglStateLabel: [
        " CAMPO DE MEMORIA VIVA // NEBULOSA",
        " RETÍCULA CARTESIANA // RIGOR CLÁSICO",
        " MONOLITO DE ALTA DENSIDAD // FUERZA INDUSTRIAL",
        " NÚCLEO ORBITAL // SINGULARIDAD & IA",
      ],
    },
    hero: {
      index: "00 / 01",
      role: "DIRECTOR CREATIVO / ARQUITECTO DE PRODUCTO",
      headlineLines: [
        "Veinticinco años",
        "persiguiendo el",
        "píxel perfecto.",
      ],
      subheadline:
        "Ideas que se convierten en sistemas. Sistemas que se sienten humanos.",
      manifestoTag: "JAVIER BLANCO GONZÁLEZ · OBRA Y TRAYECTORIA (2000 — 2026)",
      ctaExplore: "INICIAR EL VIAJE",
      ctaContact: "CONECTAR",
    },
    act1: {
      index: "01 / 04",
      chapter: "ACTO I · EL OFICIO Y LAS TRINCHERAS",
      years: "2000 — 2012",
      title: "La disciplina invisible antes del algoritmo.",
      subtitle:
        "Doce años forjando el ojo y el pulso en las grandes canteras interactivas de Madrid.",
      editorialLead:
        "Antes de los frameworks reactivos y de la inteligencia sintética, existía el taller: noches interminables ajustando curvas Bézier, comprimiendo kilobytes al límite y defendiendo cada píxel como una declaración de principios.",
      editorialBody:
        "De mis primeros trazos en Netthink a liderar cuentas globales en Orbital BBDO, Publicis Dialog, Wunderman, Isobar, VCCP Spain y Carrots. Aquella época salvaje me enseñó una verdad inmutable: la dirección de arte sin estructura es decoración; el código sin sensibilidad es ruido.",
      quote:
        "«El oficio no se aprende en la calma; se talla cuando el rigor geométrico se convierte en instinto.»",
      agenciesLabel: "BITÁCORA DE TRINCHERA · AGENCIAS INTERNACIONALES",
      timeline: [
        {
          period: "2011 — 2012",
          role: "Director Creativo",
          company: "Carrots",
          location: "Madrid",
          highlights:
            "Formación y expansión del equipo creativo. Campañas social-first y ecosistemas digitales.",
          clients: ["SPF.com", "Movistar Team", "Click Seguros", "Néctar"],
        },
        {
          period: "2012",
          role: "Digital Creative Director",
          company: "VCCP Spain",
          location: "Madrid",
          highlights:
            "Dirección creativa digital integrada en red internacional de agencias.",
          clients: ["Nike", "Endesa"],
        },
        {
          period: "2009 — 2011",
          role: "Supervisor Creativo",
          company: "Netthink (Isobar)",
          location: "Madrid",
          highlights:
            "Supervisión creativa de grandes cuentas digitales y dirección de equipos multidisciplinares.",
          clients: ["Disney", "Orange", "Kellogg's", "ONCE", "Vodafone"],
        },
        {
          period: "2007 — 2009",
          role: "Director de Arte",
          company: "Wunderman",
          location: "Madrid",
          highlights:
            "Conceptualización y ejecución de campañas 360º e interactivas de alto impacto.",
          clients: ["Ford", "Microsoft", "Iberia", "Repsol", "Land Rover"],
        },
        {
          period: "2006 — 2007",
          role: "Director de Arte",
          company: "Publicis Dialog & Orbital BBDO",
          location: "Madrid",
          highlights:
            "Experiencias interactivas y campañas integradas para grandes anunciantes nacionales.",
          clients: ["Movistar", "Renault", "NH Hoteles", "Telefónica", "Grupo Vips"],
        },
        {
          period: "2000 — 2006",
          role: "Diseñador Web & Director de Arte",
          company: "Netthink",
          location: "Madrid",
          highlights:
            "El kilómetro cero. Seis años descubriendo la alquimia entre tipografía, movimiento y código.",
          clients: ["MSN", "Real Madrid", "Disney", "Microsoft"],
        },
      ],
    },
    act2: {
      index: "02 / 04",
      chapter: "ACTO II · LA MÁQUINA DE PRODUCCIÓN",
      years: "2012 — PRESENTE · HELP ESTUDIO",
      title: "El socio silencioso cuando fallar no es opción.",
      subtitle:
        "Fundar Help Estudio para operar en la sala de máquinas de las agencias Tier-1.",
      editorialLead:
        "En 2012 di el salto a la independencia con una premisa radical: unir estrategia, dirección creativa e ingeniería en un solo flujo sin intermediarios. Cuando una campaña nacional sale al aire mañana a las 08:00, las excusas no compilan.",
      editorialBody:
        "Durante más de catorce años ininterrumpidos, Help Estudio ha sido el brazo de élite integrado en los equipos de Havas, Dentsu o Wunderman. Más de 1.200 campañas entregadas bajo presión extrema para las marcas más exigentes del mercado, manteniendo una artesanía pixel-perfect en cada formato.",
      metrics: [
        {
          value: "+1.200",
          label: "CAMPAÑAS ENTREGADAS",
          detail: "Ejecución quirúrgica bajo plazos críticos sin margen de error.",
        },
        {
          value: "14+",
          label: "AÑOS DE PRODUCCIÓN CONTINUA",
          detail: "Socio de confianza de los mayores grupos publicitarios.",
        },
        {
          value: "12+",
          label: "AGENCIAS PARTNER TIER-1",
          detail: "Integración directa como recurso senior de alto rendimiento.",
        },
      ],
      tier1Label: "ALIANZAS TIER-1 // AGENCIAS PARTNER",
      agencies: [
        "Havas",
        "Dentsu",
        "Wunderman",
        "Wink",
        "Bámbu",
        "Ymedia",
      ],
      brandsLabel: "MARCAS EN PRODUCCIÓN DE ALTO RENDIMIENTO",
      brands: [
        "Citroën",
        "Movistar",
        "BMW",
        "Sanitas",
        "Mango",
        "Michelin",
        "Coca-Cola",
        "Ouigo",
        "Peugeot",
        "Mahou",
        "Santander",
        "Paradores",
      ],
      formatsLabel: "ARQUITECTURA DE FORMATOS",
      formats: [
        "HTML5 Custom",
        "Rich Media",
        "VPAID Interactive",
        "OBA Dynamic",
        "IAB Estándar",
        "Motion Systems",
      ],
    },
    act3: {
      index: "03 / 04",
      chapter: "ACTO III · LA SINGULARIDAD Y EL FUTURO",
      years: "2024 — 2026 · HELP ESTUDIO LAB",
      title: "La única forma de predecir el futuro es programándolo.",
      subtitle:
        "Fusión total entre dirección de arte, arquitectura de producto SaaS y sistemas de agentes de IA.",
      editorialLead:
        "Veinticinco años después, las fronteras entre quien imagina, quien diseña y quien programa han desaparecido. Hoy concibo y construyo productos propios desde cero con Next.js, TypeScript y arquitecturas de agentes encadenados.",
      editorialBody:
        "Help Estudio Lab es el laboratorio donde la experiencia acumulada en más de mil campañas converge con la ingeniería moderna. Un solo autor controlando la totalidad del espectro: desde el modelo de datos en PostgreSQL y la orquestación de LLMs hasta la micro-interacción final en pantalla.",
      closingManifesto:
        "No usamos la inteligencia artificial para reemplazar el criterio, sino para amplificar la obsesión artesanal a una escala antes imposible.",
      labLabel: "ECOSISTEMA DE PRODUCTOS PROPIOS · HELP ESTUDIO LAB",
      products: [
        {
          id: "next3hours",
          index: "LAB // 01",
          name: "Next3Hours",
          url: "next3hours.com",
          href: "https://next3hours.com",
          tag: "CONCIERGE IA MARCA BLANCA · B2B HOSPITALITY",
          status: "EN VIVO EN MADRID",
          description:
            "Seis agentes de IA encadenados diseñan una tarde a medida para huéspedes de hoteles boutique: sitios reales, rutas con tiempos exactos y recompensas con la voz editorial única de cada hotel.",
          stack: ["Next.js", "TypeScript", "6-Agent Chain", "LLM Orchestration", "PostGIS"],
        },
        {
          id: "smashzone",
          index: "LAB // 02",
          name: "Smashzone",
          url: "smashzone.app",
          href: "https://smashzone.app",
          tag: "SPORTS TECH & REWARDS · IOS / ANDROID",
          status: "TEMPORADA 0 EN VIVO",
          description:
            "Juega al pádel, gana recompensas reales. Valida cada partido cruzando geolocalización de pista y biometría de salud en tiempo real, premiando cada encuentro verificado con tokens.",
          stack: ["React Native / Next.js", "Geofencing", "HealthKit", "Token Economy", "PostgreSQL"],
        },
        {
          id: "motorland",
          index: "LAB // 03",
          name: "Motorland",
          url: "motorland.io",
          href: "https://motorland.io",
          tag: "WEBGL PROCEDURAL ARCADE · CYBERPUNK",
          status: "PRODUCCIÓN",
          description:
            "Juego de carreras cyberpunk de circuito infinito en el navegador: 4 niveles de dificultad, 4 naves únicas y trazados generados proceduralmente a 60fps.",
          stack: ["Three.js", "WebGL", "Procedural Math", "TypeScript", "Custom Shaders"],
        },
        {
          id: "cartle",
          index: "LAB // 04",
          name: "Cartle",
          url: "cartle.es",
          href: "https://cartle.es",
          tag: "SAAS AUTOMATION · GASTRONOMÍA",
          status: "EN VIVO",
          description:
            "El menú del día transformado en activo digital en segundos: generación automatizada para redes sociales, código QR dinámico y web editorial propia para cada restaurante.",
          stack: ["Next.js", "Prisma", "AI Vision", "Edge Rendering", "Vercel"],
        },
      ],
      capabilitiesLabel: "MATRIZ TÉCNICA & CAPACIDADES 2026",
      capabilities: [
        {
          category: "FRONT-END & PRODUCT ARCHITECTURE",
          items: ["Next.js", "React", "TypeScript", "Three.js / WebGL", "Prisma", "PostgreSQL", "Vercel"],
        },
        {
          category: "ART DIRECTION & MOTION CRAFT",
          items: ["Figma", "GSAP ScrollTrigger", "Framer Motion", "Adobe CC", "Rich Media HTML5", "Design Systems"],
        },
        {
          category: "GENERATIVE AI & AGENT SYSTEMS",
          items: ["Claude", "Gemini", "ChatGPT", "Midjourney", "Chained Agents", "Make / n8n / Zapier", "Vibe-Coding"],
        },
      ],
    },
    footer: {
      index: "04 / 04",
      kicker: "EL PRÓXIMO SISTEMA COMIENZA CON UNA CONVERSACIÓN",
      headline: "Construyamos algo extraordinario.",
      subline:
        "Disponible para dirección creativa ejecutiva, arquitectura de producto digital, desarrollo de MVP con IA y alianzas de producción de alto nivel.",
      location: "Madrid, España · Operativa Global en Remoto",
      educationLabel: "FORMACIÓN ACADÉMICA",
      education: "Ingeniería Técnica en Informática de Gestión",
      educationSchool: "Universidad de Alcalá (1997 — 2003)",
      copyright: "© 2000 — 2026 JAVIER BLANCO GONZÁLEZ · HELP ESTUDIO. TODOS LOS PÍXELES RESERVADOS.",
    },
  },
  en: {
    meta: {
      status: "AVAILABLE FOR SELECTED PROJECTS",
      roleHeader: "CREATIVE DIRECTOR / PRODUCT ARCHITECT",
      scrollHint: "SCROLL TO TRAVERSE MEMORY · 2000 — 2026",
      coordinates: "40.4168° N, 3.7038° W · MADRID / REMOTE",
      webglStateLabel: [
        " LIVING MEMORY FIELD // NEBULA",
        " CARTESIAN LATTICE // CLASSICAL RIGOR",
        " HIGH-DENSITY MONOLITH // INDUSTRIAL FORCE",
        " ORBITAL CORE // SINGULARITY & AI",
      ],
    },
    hero: {
      index: "00 / 01",
      role: "CREATIVE DIRECTOR / PRODUCT ARCHITECT",
      headlineLines: [
        "Twenty-five years",
        "chasing the",
        "pixel perfect.",
      ],
      subheadline:
        "Ideas that become systems. Systems that feel human.",
      manifestoTag: "JAVIER BLANCO GONZÁLEZ · WORK & TRAJECTORY (2000 — 2026)",
      ctaExplore: "BEGIN THE JOURNEY",
      ctaContact: "GET IN TOUCH",
    },
    act1: {
      index: "01 / 04",
      chapter: "ACT I · THE CRAFT & THE TRENCHES",
      years: "2000 — 2012",
      title: "Invisible discipline before the algorithm.",
      subtitle:
        "Twelve years forging eye and pulse inside Madrid's premier interactive creative houses.",
      editorialLead:
        "Long before reactive frameworks and synthetic intelligence, there was the workshop: endless nights tuning Bézier curves, shaving kilobytes to the bone, and defending every single pixel as a statement of intent.",
      editorialBody:
        "From my earliest keyframes at Netthink to leading global accounts at Orbital BBDO, Publicis Dialog, Wunderman, Isobar, VCCP Spain, and Carrots. That untamed era taught me an immutable truth: art direction without structure is mere decoration; code without sensitivity is noise.",
      quote:
        "“Craft is never learned in comfort; it is carved when geometric rigor becomes second nature.”",
      agenciesLabel: "TRENCH LOGBOOK · INTERNATIONAL AGENCIES",
      timeline: [
        {
          period: "2011 — 2012",
          role: "Creative Director",
          company: "Carrots",
          location: "Madrid",
          highlights:
            "Built and scaled the creative team for client acquisition and retention. Led social-first ecosystems.",
          clients: ["SPF.com", "Movistar Team", "Click Seguros", "Néctar"],
        },
        {
          period: "2012",
          role: "Digital Creative Director",
          company: "VCCP Spain",
          location: "Madrid",
          highlights:
            "Digital creative leadership within an international agency network for flagship accounts.",
          clients: ["Nike", "Endesa"],
        },
        {
          period: "2009 — 2011",
          role: "Creative Supervisor",
          company: "Netthink (Isobar)",
          location: "Madrid",
          highlights:
            "Creative supervision of major digital accounts and leadership of multidisciplinary teams.",
          clients: ["Disney", "Orange", "Kellogg's", "ONCE", "Vodafone"],
        },
        {
          period: "2007 — 2009",
          role: "Art Director",
          company: "Wunderman",
          location: "Madrid",
          highlights:
            "Concept and execution of high-impact 360º and interactive campaigns for global icons.",
          clients: ["Ford", "Microsoft", "Iberia", "Repsol", "Land Rover"],
        },
        {
          period: "2006 — 2007",
          role: "Art Director",
          company: "Publicis Dialog & Orbital BBDO",
          location: "Madrid",
          highlights:
            "Interactive digital experiences and multidisciplinary campaigns for tier-one national brands.",
          clients: ["Movistar", "Renault", "NH Hoteles", "Telefónica", "Grupo Vips"],
        },
        {
          period: "2000 — 2006",
          role: "Web Designer & Art Director",
          company: "Netthink",
          location: "Madrid",
          highlights:
            "Ground zero. Six formative years discovering the alchemy between typography, motion, and code.",
          clients: ["MSN", "Real Madrid", "Disney", "Microsoft"],
        },
      ],
    },
    act2: {
      index: "02 / 04",
      chapter: "ACT II · THE PRODUCTION ENGINE",
      years: "2012 — PRESENT · HELP ESTUDIO",
      title: "The silent partner when failure is not an option.",
      subtitle:
        "Founding Help Estudio to operate inside the engine room of Tier-1 global agencies.",
      editorialLead:
        "In 2012, I leaped into independence with a radical premise: unify strategy, creative direction, and product engineering into a single unmediated flow. When a national campaign goes live tomorrow at 08:00 AM, excuses do not compile.",
      editorialBody:
        "For over fourteen uninterrupted years, Help Estudio has served as the embedded elite force within Havas, Dentsu, and Wunderman. Over 1,200 campaigns delivered under extreme pressure for the market's most demanding brands—upholding uncompromising pixel-perfect craft across every format.",
      metrics: [
        {
          value: "+1,200",
          label: "CAMPAIGNS DELIVERED",
          detail: "Surgical execution under relentless deadlines with zero margin for error.",
        },
        {
          value: "14+",
          label: "YEARS OF CONTINUOUS OUTPUT",
          detail: "Trusted production partner to the world's largest advertising groups.",
        },
        {
          value: "12+",
          label: "TIER-1 PARTNER AGENCIES",
          detail: "Embedded directly into agency squads as a specialized senior force.",
        },
      ],
      tier1Label: "TIER-1 ALLIANCES // PARTNER AGENCIES",
      agencies: [
        "Havas",
        "Dentsu",
        "Wunderman",
        "Wink",
        "Bámbu",
        "Ymedia",
      ],
      brandsLabel: "HIGH-PERFORMANCE CAMPAIGN BRANDS",
      brands: [
        "Citroën",
        "Movistar",
        "BMW",
        "Sanitas",
        "Mango",
        "Michelin",
        "Coca-Cola",
        "Ouigo",
        "Peugeot",
        "Mahou",
        "Santander",
        "Paradores",
      ],
      formatsLabel: "FORMAT ARCHITECTURE",
      formats: [
        "Custom HTML5",
        "Rich Media",
        "VPAID Interactive",
        "OBA Dynamic",
        "IAB Standard",
        "Motion Systems",
      ],
    },
    act3: {
      index: "03 / 04",
      chapter: "ACT III · THE SINGULARITY & THE FUTURE",
      years: "2024 — 2026 · HELP ESTUDIO LAB",
      title: "The only way to predict the future is to code it yourself.",
      subtitle:
        "Total convergence of art direction, SaaS product architecture, and autonomous AI agent systems.",
      editorialLead:
        "Twenty-five years in, the walls between the visionary, the designer, and the engineer have dissolved. Today I conceive and ship proprietary SaaS products from scratch using Next.js, TypeScript, and chained AI agent architectures.",
      editorialBody:
        "Help Estudio Lab is where the battle-tested rigor of over a thousand campaigns collides with modern software engineering. A single auteur commanding the full stack: from PostgreSQL schemas and multi-agent LLM orchestration to the final shader on screen.",
      closingManifesto:
        "We do not use artificial intelligence to replace taste—we use it to amplify artisanal obsession to a scale previously unimaginable.",
      labLabel: "PROPRIETARY PRODUCT ECOSYSTEM · HELP ESTUDIO LAB",
      products: [
        {
          id: "next3hours",
          index: "LAB // 01",
          name: "Next3Hours",
          url: "next3hours.com",
          href: "https://next3hours.com",
          tag: "WHITE-LABEL AI CONCIERGE · B2B HOSPITALITY",
          status: "LIVE IN MADRID",
          description:
            "Six chained AI agents craft a bespoke afternoon for boutique hotel guests: curated real venues, timed walking routes, and perks written in each hotel's distinct editorial voice.",
          stack: ["Next.js", "TypeScript", "6-Agent Chain", "LLM Orchestration", "PostGIS"],
        },
        {
          id: "smashzone",
          index: "LAB // 02",
          name: "Smashzone",
          url: "smashzone.app",
          href: "https://smashzone.app",
          tag: "SPORTS TECH & REWARDS · IOS / ANDROID",
          status: "SEASON 0 LIVE",
          description:
            "Play padel, earn real-world rewards. Validates every match by cross-checking court geolocation and biometric health data, rewarding every verified game with tokens.",
          stack: ["React Native / Next.js", "Geofencing", "HealthKit", "Token Economy", "PostgreSQL"],
        },
        {
          id: "motorland",
          index: "LAB // 03",
          name: "Motorland",
          url: "motorland.io",
          href: "https://motorland.io",
          tag: "WEBGL PROCEDURAL ARCADE · CYBERPUNK",
          status: "IN PRODUCTION",
          description:
            "Infinite-circuit cyberpunk racing game in the browser: 4 difficulty tiers, 4 distinct ships, and procedurally generated tracks running at 60fps.",
          stack: ["Three.js", "WebGL", "Procedural Math", "TypeScript", "Custom Shaders"],
        },
        {
          id: "cartle",
          index: "LAB // 04",
          name: "Cartle",
          url: "cartle.es",
          href: "https://cartle.es",
          tag: "SAAS AUTOMATION · HOSPITALITY",
          status: "LIVE",
          description:
            "The daily menu turned into an instant digital asset: automated social media publishing in seconds, dynamic QR, and a dedicated editorial web presence for restaurants.",
          stack: ["Next.js", "Prisma", "AI Vision", "Edge Rendering", "Vercel"],
        },
      ],
      capabilitiesLabel: "TECHNICAL MATRIX & 2026 CAPABILITIES",
      capabilities: [
        {
          category: "FRONT-END & PRODUCT ARCHITECTURE",
          items: ["Next.js", "React", "TypeScript", "Three.js / WebGL", "Prisma", "PostgreSQL", "Vercel"],
        },
        {
          category: "ART DIRECTION & MOTION CRAFT",
          items: ["Figma", "GSAP ScrollTrigger", "Framer Motion", "Adobe CC", "Rich Media HTML5", "Design Systems"],
        },
        {
          category: "GENERATIVE AI & AGENT SYSTEMS",
          items: ["Claude", "Gemini", "ChatGPT", "Midjourney", "Chained Agents", "Make / n8n / Zapier", "Vibe-Coding"],
        },
      ],
    },
    footer: {
      index: "04 / 04",
      kicker: "THE NEXT SYSTEM BEGINS WITH A CONVERSATION",
      headline: "Let’s build something extraordinary.",
      subline:
        "Available for executive creative direction, digital product architecture, AI-native MVP engineering, and high-stakes production partnerships.",
      location: "Madrid, Spain · Operating Globally Remote",
      educationLabel: "ACADEMIC FOUNDATION",
      education: "B.Eng. in Management Computer Science",
      educationSchool: "Universidad de Alcalá (1997 — 2003)",
      copyright: "© 2000 — 2026 JAVIER BLANCO GONZÁLEZ · HELP ESTUDIO. ALL PIXELS RESERVED.",
    },
  },
};
