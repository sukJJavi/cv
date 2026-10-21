export type Locale = "es" | "en";

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  badge?: string;
  highlights: string;
  awards?: string;
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
    vccpNote?: string;
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
      status: "CREANDO EL FUTURO · MADRID & GLOBAL",
      roleHeader: "DIRECTOR CREATIVO / ARQUITECTO DE PRODUCTO",
      scrollHint: "DESLIZA PARA ATRAVESAR LA MEMORIA · 2000 — 2026",
      coordinates: "VEINTICINCO AÑOS DE OFICIO · MADRID / MUNDO",
      webglStateLabel: [
        "ACTO 0 · EL LATIDO (EL PULSO ORIGINAL)",
        "ACTO I · EL TRAZO Y LAS TRINCHERAS (EL RIGOR DEL OFICIO)",
        "ACTO II · LA COLUMNA VERTEBRAL (CATORCE AÑOS DE RESISTENCIA)",
        "ACTO III · LA SINAPSIS DIGITAL (RED NEURONAL & DECISIONES)",
      ],
    },
    hero: {
      index: "00 / 04",
      role: "DIRECTOR CREATIVO / ARQUITECTO DE PRODUCTO",
      headlineLines: [
        "Veinticinco años",
        "persiguiendo el",
        "píxel perfecto.",
      ],
      subheadline:
        "Del asombro analógico al pulso de los agentes de IA. Una historia humana de resistencia, oficio y reinvención constante en la vanguardia digital.",
      manifestoTag: "JAVIER BLANCO GONZÁLEZ · 25 AÑOS DE OFICIO (2000 — 2026)",
      ctaExplore: "ENTRAR EN LA HISTORIA",
      ctaContact: "CONVERSAR",
    },
    act1: {
      index: "01 / 04",
      chapter: "ACTO I · EL TRAZO Y LAS TRINCHERAS",
      years: "2000 — 2012 · LOS AÑOS SALVAJES",
      title: "Cuando internet aún se estaba inventando.",
      subtitle:
        "Doce años de noches en vela, obsesión milimétrica y la disciplina férrea del oficio en las grandes canteras interactivas de Madrid.",
      editorialLead:
        "Antes de los frameworks y de las pantallas táctiles, solo existía una pantalla de fósforo, el silencio de la madrugada y la reverencia absoluta por la belleza. Cada curva Bézier era un pulso contra los límites técnicos; cada kilobyte, una trinchera defendida con orgullo.",
      editorialBody:
        "De mis primeros trazos en Netthink a la dirección de arte en Orbital BBDO —reconocida con premios en los principales festivales—, y la gestión de grandes cuentas en Publicis, Wunderman e Isobar. Doce años de oficio que me enseñaron que la dirección de arte no es decoración, sino una cuestión de respeto y verdad hacia quien mira.",
      quote:
        "«El oficio no es una técnica que se aprende en la calma; es una lealtad que se forja en el fuego y no se negocia jamás.»",
      agenciesLabel: "TRAYECTORIA EN AGENCIA · 2000 — 2012",
      timeline: [
        {
          period: "2000 — 2006",
          role: "Diseñador Web & Director de Arte",
          company: "Netthink",
          location: "Madrid",
          badge: "El Kilómetro Cero",
          highlights:
            "El punto de partida de toda mi carrera. Seis años fundacionales descubriendo la alquimia entre tipografía, movimiento y código interactivo en la agencia pionera de la era digital española.",
          clients: ["MSN", "Real Madrid", "Disney", "Microsoft"],
        },
        {
          period: "2006 — 2007",
          role: "Director de Arte",
          company: "Orbital BBDO",
          location: "Madrid",
          badge: "Campañas Premiadas",
          highlights:
            "Etapa clave de dirección de arte interactiva y conceptualización para grandes marcas globales. Campañas multidisciplinares reconocidas con los galardones más prestigiosos de la industria.",
          awards: "Premios El Sol · FIAP · Echo Award",
          clients: [
            "Renault",
            "NH Hoteles",
            "Grupo Vips",
            "Telefónica",
            "Banco Popular",
            "EA Sports",
          ],
        },
        {
          period: "2007",
          role: "Director de Arte Interactivo",
          company: "Publicis Dialog",
          location: "Madrid",
          badge: "Experiencias de Marca",
          highlights:
            "Desarrollo de experiencias interactivas y campañas integradas de gran formato para líderes del mercado de automoción y telecomunicaciones.",
          clients: ["Movistar", "Renault", "Telefónica"],
        },
        {
          period: "2007 — 2009",
          role: "Director de Arte",
          company: "Wunderman",
          location: "Madrid",
          badge: "Campañas Globales 360º",
          highlights:
            "Conceptualización y ejecución milimétrica de campañas interactivas 360º de alcance global, aunando rigor de marca, estrategia de respuesta directa y vanguardia digital.",
          clients: [
            "Ford",
            "Microsoft",
            "Movistar",
            "Iberia",
            "Repsol",
            "Land Rover",
          ],
        },
        {
          period: "2009 — 2011",
          role: "Supervisor Creativo",
          company: "Netthink (Isobar)",
          location: "Madrid",
          badge: "Supervisión Creativa",
          highlights:
            "Regreso a la agencia matriz como supervisor creativo: dirección de equipos multidisciplinares de arte y código, y liderazgo de grandes cuentas multinacionales bajo plazos implacables.",
          awards: "FIAP · El Ojo de Iberoamérica · Premios Eficacia",
          clients: ["Disney", "Orange", "Vodafone", "Kellogg's", "ONCE"],
        },
        {
          period: "2011 — 2012",
          role: "Director Creativo",
          company: "Carrots",
          location: "Madrid",
          badge: "Social-First",
          highlights:
            "Formación y liderazgo de equipo creativo. Ecosistemas digitales interactivos y estrategias social-first en los albores de la web social.",
          clients: ["SPF.com", "Movistar Team", "Click Seguros", "Néctar"],
        },
      ],
      vccpNote:
        "Nota: Tras doce años en agencias y una breve estancia de un mes en VCCP Spain a comienzos de 2012, di el salto definitivo para fundar Help Estudio.",
    },
    act2: {
      index: "02 / 04",
      chapter: "ACTO II · LA COLUMNA VERTEBRAL",
      years: "2012 — PRESENTE · HELP ESTUDIO",
      title: "El salto al vacío. La trinchera propia.",
      subtitle:
        "Catorce años sosteniendo la producción digital de los mayores grupos publicitarios sin bajar jamás el listón.",
      editorialLead:
        "En 2012 decidí saltar al vacío sin red: fundar Help Estudio como un acto de fe en el trabajo bien hecho. Convertirme en el socio invisible, de máxima exigencia y confianza ciega para quienes no pueden permitirse pestañear ni fallar.",
      editorialBody:
        "Más de 1.200 campañas entregadas bajo presión extrema para Havas, Dentsu y Wunderman. Madrugadas de vértigo antes del lanzamiento de Citroën, Movistar o BMW. La columna vertebral de una trayectoria que aprendió a mantenerse en pie en mitad de cualquier tempestad.",
      metrics: [
        {
          value: "+1.200",
          label: "BATALLAS EN PRIMERA LÍNEA",
          detail: "Campañas de alto impacto entregadas a tiempo con un estándar de artesanía inquebrantable.",
        },
        {
          value: "14+",
          label: "AÑOS EN LA TRINCHERA PROPIA",
          detail: "Catorce años ininterrumpidos como el aliado de confianza absoluta de los grandes grupos.",
        },
        {
          value: "100%",
          label: "LEALTAD AL OFICIO",
          detail: "El compromiso visceral de cuidar cada detalle, cada curva y cada interacción como si fuera la primera.",
        },
      ],
      tier1Label: "QUIENES CONFIARON EN LA TEMPESTAD // ALIADOS",
      agencies: [
        "Havas",
        "Dentsu",
        "Wunderman",
        "Wink",
        "Bámbu",
        "Ymedia",
      ],
      brandsLabel: "MARCAS QUE COSTARON NOCHES EN VELA",
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
      formatsLabel: "DOMINIO ABSOLUTO DEL MEDIO",
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
      chapter: "ACTO III · LA CONSTELACIÓN PROPIA",
      years: "2024 — FUTURO · HELP ESTUDIO LAB",
      title: "La certeza de quien programa su propio destino.",
      subtitle:
        "La madurez creativa total: no esperar el permiso de nadie y dar vida a productos vivos con inteligencia artificial.",
      editorialLead:
        "Llega un día en que el oficio acumulado durante veinticinco años rompe todas las jaulas. Ya no construyes solo para otros ni esperas aprobaciones ajenas: te sientas frente al editor, respiras hondo y haces que tus ideas cobren vida.",
      editorialBody:
        "Help Estudio Lab es la constelación nacida de esa libertad. Next3Hours, Smashzone, Motorland, Cartle. Cuatro criaturas vivas programadas con Next.js, TypeScript y sistemas de agentes de IA. La ligereza de quien domina las herramientas y el vértigo hermoso de seguir inventando.",
      closingManifesto:
        "No usamos la tecnología para reemplazar la emoción humana, sino para darle alas a una obsesión que lleva veinticinco años encendida.",
      labLabel: "CRIATURAS NACIDAS DEL LABORATORIO · HELP ESTUDIO LAB",
      products: [
        {
          id: "next3hours",
          index: "LAB // 01",
          name: "Next3Hours",
          url: "next3hours.com",
          href: "https://next3hours.com",
          tag: "CONCIERGE IA DE AUTOR · B2B HOSPITALITY",
          status: "EN VIVO EN MADRID",
          description:
            "Seis agentes de IA encadenados diseñan una tarde a medida para huéspedes de hoteles boutique: lugares con alma, tiempos exactos y la voz editorial única de cada hotel.",
          stack: ["Next.js", "TypeScript", "6-Agent Chain", "LLM Orchestration", "PostGIS"],
        },
        {
          id: "smashzone",
          index: "LAB // 02",
          name: "Smashzone",
          url: "smashzone.app",
          href: "https://smashzone.app",
          tag: "SPORTS TECH & RECOMPENSAS · IOS / ANDROID",
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
      capabilitiesLabel: "EL ARSENAL CREATIVO & TÉCNICO",
      capabilities: [
        {
          category: "DIRECCIÓN DE ARTE & OFICIO VISUAL",
          items: ["Figma", "GSAP ScrollTrigger", "Framer Motion", "Adobe CC", "HTML5 de Autor", "Sistemas de Diseño"],
        },
        {
          category: "ARQUITECTURA DE PRODUCTO & CÓDIGO",
          items: ["Next.js", "React", "TypeScript", "Three.js / WebGL", "Prisma", "PostgreSQL", "Vercel"],
        },
        {
          category: "INTELIGENCIA ARTIFICIAL & AGENTES",
          items: ["Claude", "Gemini", "ChatGPT", "Midjourney", "Agentes Encadenados", "Make / n8n", "Vibe-Coding"],
        },
      ],
    },
    footer: {
      index: "04 / 04",
      kicker: "EL PRÓXIMO CAPÍTULO COMIENZA CON UNA CONVERSACIÓN",
      headline: "Hablemos de lo que de verdad importa.",
      subline:
        "Si buscas a alguien que entienda el diseño como una cuestión de piel, el código como un lienzo vivo y el oficio como un compromiso inquebrantable, la puerta está abierta.",
      location: "Madrid, España · Operativa Global en Remoto",
      educationLabel: "RAÍZ ACADÉMICA",
      education: "Ingeniería Técnica en Informática de Gestión",
      educationSchool: "Universidad de Alcalá (1997 — 2003)",
      copyright: "© 2000 — 2026 JAVIER BLANCO GONZÁLEZ · HELP ESTUDIO. TODOS LOS PÍXELES RESERVADOS.",
    },
  },
  en: {
    meta: {
      status: "BUILDING THE FUTURE · MADRID & GLOBAL",
      roleHeader: "CREATIVE DIRECTOR / PRODUCT ARCHITECT",
      scrollHint: "SCROLL TO TRAVERSE MEMORY · 2000 — 2026",
      coordinates: "TWENTY-FIVE YEARS OF CRAFT · MADRID / WORLD",
      webglStateLabel: [
        "ACT 0 · THE HEARTBEAT (THE ORIGINAL PULSE)",
        "ACT I · THE STROKE & THE TRENCHES (DEVOTION TO CRAFT)",
        "ACT II · THE BACKBONE (FOURTEEN YEARS OF RESILIENCE)",
        "ACT III · THE DIGITAL SYNAPSE (NEURAL NETWORK & DECISION TREE)",
      ],
    },
    hero: {
      index: "00 / 04",
      role: "CREATIVE DIRECTOR / PRODUCT ARCHITECT",
      headlineLines: [
        "Twenty-five years",
        "chasing the",
        "perfect pixel.",
      ],
      subheadline:
        "From analog wonder to the pulse of AI agents. A human story of resilience, craft, and endless reinvention on the digital frontier.",
      manifestoTag: "JAVIER BLANCO GONZÁLEZ · 25 YEARS OF CRAFT (2000 — 2026)",
      ctaExplore: "ENTER THE STORY",
      ctaContact: "START A DIALOGUE",
    },
    act1: {
      index: "01 / 04",
      chapter: "ACTI · THE STROKE & THE TRENCHES",
      years: "2000 — 2012 · THE WILD YEARS",
      title: "When the internet was still being invented.",
      subtitle:
        "Twelve years of sleepless nights, millimeter obsession, and unyielding discipline in Madrid's premier creative agencies.",
      editorialLead:
        "Before reactive frameworks and touchscreens, there was only the phosphor glow, the silence of 3 AM, and an absolute reverence for beauty. Every Bézier curve was a battle against technical limits; every single kilobyte, a trench defended with pride.",
      editorialBody:
        "From my first keyframes at Netthink to art direction at Orbital BBDO —honored with major awards at premier festivals—, and directing accounts at Publicis, Wunderman, and Isobar. Twelve crucible years that taught me art direction is never decoration—it is an act of respect and honesty toward the viewer.",
      quote:
        "“Craft is never mastered in comfort; it is a sacred devotion forged under fire and never compromised.”",
      agenciesLabel: "AGENCY TRAJECTORY · 2000 — 2012",
      timeline: [
        {
          period: "2000 — 2006",
          role: "Web Designer & Art Director",
          company: "Netthink",
          location: "Madrid",
          badge: "Ground Zero",
          highlights:
            "The starting point of my entire career. Six foundational years discovering the alchemy of typography, animation, and interactive code at Spain's pioneering digital agency.",
          clients: ["MSN", "Real Madrid", "Disney", "Microsoft"],
        },
        {
          period: "2006 — 2007",
          role: "Art Director",
          company: "Orbital BBDO",
          location: "Madrid",
          badge: "Award-Winning Campaigns",
          highlights:
            "A defining period of interactive art direction and concept execution for global brands. Multidisciplinary campaigns recognized across the industry's premier festivals.",
          awards: "El Sol Festival · FIAP · Echo Award",
          clients: [
            "Renault",
            "NH Hoteles",
            "Grupo Vips",
            "Telefónica",
            "Banco Popular",
            "EA Sports",
          ],
        },
        {
          period: "2007",
          role: "Interactive Art Director",
          company: "Publicis Dialog",
          location: "Madrid",
          badge: "Brand Experiences",
          highlights:
            "Creation of rich digital brand experiences and large-scale integrated campaigns for telecommunications and automotive leaders.",
          clients: ["Movistar", "Renault", "Telefónica"],
        },
        {
          period: "2007 — 2009",
          role: "Art Director",
          company: "Wunderman",
          location: "Madrid",
          badge: "360º Global Campaigns",
          highlights:
            "Millimeter concept and art direction for global 360º interactive campaigns, uniting brand rigor, direct response strategy, and cutting-edge design.",
          clients: [
            "Ford",
            "Microsoft",
            "Movistar",
            "Iberia",
            "Repsol",
            "Land Rover",
          ],
        },
        {
          period: "2009 — 2011",
          role: "Creative Supervisor",
          company: "Netthink (Isobar)",
          location: "Madrid",
          badge: "Creative Supervision",
          highlights:
            "Return to the mothership as creative supervisor: leading and mentoring multidisciplinary squads of art and engineering for top international accounts.",
          awards: "FIAP · El Ojo de Iberoamérica · Effie Awards",
          clients: ["Disney", "Orange", "Vodafone", "Kellogg's", "ONCE"],
        },
        {
          period: "2011 — 2012",
          role: "Creative Director",
          company: "Carrots",
          location: "Madrid",
          badge: "Social-First",
          highlights:
            "Creative direction and team leadership during the dawn of the social web, conceptualizing interactive brand ecosystems.",
          clients: ["SPF.com", "Movistar Team", "Click Seguros", "Néctar"],
        },
      ],
      vccpNote:
        "Note: Following twelve years across premier agencies and a brief one-month stay at VCCP Spain in early 2012, came the definitive leap to establish Help Estudio.",
    },
    act2: {
      index: "02 / 04",
      chapter: "ACT II · THE BACKBONE",
      years: "2012 — PRESENT · HELP ESTUDIO",
      title: "The leap into the void. My own trenches.",
      subtitle:
        "Fourteen uninterrupted years holding the line for the world’s top advertising networks without ever dropping the bar.",
      editorialLead:
        "In 2012, I leaped into the void with zero safety net: founding Help Estudio as an act of pure faith in honest craft. Becoming the invisible, relentless, deeply trusted partner for those who simply cannot afford to fail.",
      editorialBody:
        "Over 1,200 campaigns delivered under extreme pressure for Havas, Dentsu, and Wunderman. High-stakes nights before national launches for Citroën, Movistar, or BMW. The unyielding backbone of a craft forged in the storm that learned to stand tall no matter the weight.",
      metrics: [
        {
          value: "+1,200",
          label: "FRONTLINE CAMPAIGNS",
          detail: "Delivered on time under maximum pressure with an unyielding artisan standard.",
        },
        {
          value: "14+",
          label: "YEARS IN MY OWN TRENCHES",
          detail: "Fourteen continuous years as the trusted ally to major global networks.",
        },
        {
          value: "100%",
          label: "DEVOTION TO THE CRAFT",
          detail: "The visceral commitment to care for every single pixel, curve, and interaction as if it were the first.",
        },
      ],
      tier1Label: "THOSE WHO TRUSTED IN THE STORM // ALLIES",
      agencies: [
        "Havas",
        "Dentsu",
        "Wunderman",
        "Wink",
        "Bámbu",
        "Ymedia",
      ],
      brandsLabel: "BRANDS THAT COST SLEEPLESS NIGHTS",
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
      formatsLabel: "ABSOLUTE MASTERY OF THE MEDIUM",
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
      chapter: "ACT III · THE CONSTELLATION",
      years: "2024 — FUTURE · HELP ESTUDIO LAB",
      title: "The certainty of coding your own destiny.",
      subtitle:
        "Total creative maturity: waiting for nobody's permission and breathing life into autonomous products with AI.",
      editorialLead:
        "There comes a day when a quarter-century of accumulated craft shatters every cage. You no longer build only for others or wait for outside validation: you sit before the editor, breathe, and bring your own visions to life.",
      editorialBody:
        "Help Estudio Lab is the constellation born of that pure freedom. Next3Hours, Smashzone, Motorland, Cartle. Four living products built with Next.js, TypeScript, and autonomous multi-agent systems. The weightlessness of mastering your tools and the breathtaking vertigo of continuing to invent.",
      closingManifesto:
        "We do not use technology to replace human emotion, but to grant wings to an obsession that has burned for twenty-five years.",
      labLabel: "CREATURES BORN OF THE LAB · HELP ESTUDIO LAB",
      products: [
        {
          id: "next3hours",
          index: "LAB // 01",
          name: "Next3Hours",
          url: "next3hours.com",
          href: "https://next3hours.com",
          tag: "AUTEUR AI CONCIERGE · B2B HOSPITALITY",
          status: "LIVE IN MADRID",
          description:
            "Six chained AI agents craft a bespoke afternoon for boutique hotel guests: soulful real venues, timed walking routes, and each hotel's distinct editorial voice.",
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
      capabilitiesLabel: "THE CREATIVE & TECHNICAL ARSENAL",
      capabilities: [
        {
          category: "ART DIRECTION & VISUAL CRAFT",
          items: ["Figma", "GSAP ScrollTrigger", "Framer Motion", "Adobe CC", "Auteur HTML5", "Design Systems"],
        },
        {
          category: "PRODUCT ARCHITECTURE & CODE",
          items: ["Next.js", "React", "TypeScript", "Three.js / WebGL", "Prisma", "PostgreSQL", "Vercel"],
        },
        {
          category: "ARTIFICIAL INTELLIGENCE & AGENTS",
          items: ["Claude", "Gemini", "ChatGPT", "Midjourney", "Chained Agents", "Make / n8n", "Vibe-Coding"],
        },
      ],
    },
    footer: {
      index: "04 / 04",
      kicker: "THE NEXT CHAPTER BEGINS WITH A CONVERSATION",
      headline: "Let’s talk about what truly matters.",
      subline:
        "If you are looking for someone who treats design as a matter of soul, code as a living canvas, and craft as an unbreakable vow, my door is open.",
      location: "Madrid, Spain · Operating Globally Remote",
      educationLabel: "ACADEMIC ROOT",
      education: "B.Eng. in Management Computer Science",
      educationSchool: "Universidad de Alcalá (1997 — 2003)",
      copyright: "© 2000 — 2026 JAVIER BLANCO GONZÁLEZ · HELP ESTUDIO. ALL PIXELS RESERVED.",
    },
  },
};
