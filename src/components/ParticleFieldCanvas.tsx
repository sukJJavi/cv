"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ScrollEngineState {
  /** Continuous state from 0.0 (Hero) -> 1.0 (Act I) -> 2.0 (Act II) -> 3.0 (Act III) */
  morphStage: number;
  /** Overall normalized scroll progress 0..1 */
  globalProgress: number;
  /** Optional pulse intensity triggered when hovering interactive cards */
  interactionPulse: number;
}

interface ParticleFieldCanvasProps {
  engineStateRef: React.MutableRefObject<ScrollEngineState>;
}

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  uniform float uPulse;
  uniform vec2 uResolution;

  attribute vec3 aPosAct1;
  attribute vec3 aPosAct2;
  attribute vec3 aPosAct3;
  attribute float aScale;
  attribute float aColorType;
  attribute float aPhase;
  attribute float aBodyPart;

  varying float vColorType;
  varying float vAlpha;
  varying float vHighlight;
  varying float vVortexGlow;
  varying float vPhotonRing;
  varying float vDoppler;
  varying float vShadow;
  varying float vSynapsePulse;

  // Smooth hermite interpolation helper
  float easeInOutCubic(float x) {
    return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
  }

  // Simplex-like 3D trigonometric turbulence
  vec3 curlOffset(vec3 p, float t, float phase) {
    float x = sin(p.y * 0.45 + t * 0.65 + phase) * cos(p.z * 0.35 - t * 0.4);
    float y = cos(p.x * 0.42 - t * 0.55 + phase) * sin(p.z * 0.45 + t * 0.35);
    float z = sin(p.x * 0.38 + t * 0.5 + phase) * cos(p.y * 0.48 - t * 0.45);
    return vec3(x, y, z);
  }

  mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vColorType = aColorType;

    // Stagger morph slightly per particle using aPhase for organic streaming transitions
    float stage = clamp(uMorph, 0.0, 3.0);

    // Compute weights/interpolations across the 4 states:
    // State 0: Hero Nebula (stage 0.0)
    // State 1: Act I Architectural Lattice (stage 1.0)
    // State 2: Act II Industrial Monolith (stage 2.0)
    // State 3: Act III Stylized Walker & Ambient Environment (stage 3.0)

    vec3 pos0 = position;
    vec3 pos1 = aPosAct1;
    vec3 pos2 = aPosAct2;
    vec3 pos3 = aPosAct3;

    // =========================================================================
    // DYNAMIC LIFE INSIDE EACH OF THE 4 POETIC EMOTIONAL STATES
    // =========================================================================

    // 0. ACTO 0 / EL LATIDO: pulso orgánico de alta frecuencia (doble sinusoide Math.sin(time * 4))
    // Elimina el zoom radial mecánico y genera una vibración y contracción celular viva
    float tHero = uTime * 4.0;
    float pulsePrimary = sin(tHero + aPhase * 0.85);
    float pulseHarmonic = sin(tHero * 0.5 - length(pos0.xy) * 0.35 + aPhase * 0.5);
    float dualPulse = pulsePrimary * 0.65 + pulseHarmonic * 0.35;

    // Micro-vibraciones bio-orgánicas celulares de alta frecuencia
    float cellularTremor = sin(tHero * 2.5 + aPhase * 6.28) * 0.045 + sin(tHero * 4.2 + aPhase * 12.56) * 0.02;

    // Contracción y distensión asimétrica mioeléctrica (vida propia, no zoom radial)
    vec3 centerDir = normalize(pos0 + vec3(0.0001));
    vec3 tangentialDir = vec3(-centerDir.y * 0.85, centerDir.x * 0.85, sin(pos0.z * 0.4 + aPhase));

    float contraction = (dualPulse * 0.16) + cellularTremor;
    pos0 += centerDir * contraction * (1.1 + sin(aPhase * 2.5) * 0.4);
    pos0 += tangentialDir * (sin(tHero + aPhase * 2.0) * 0.08 + cellularTremor * 0.6);

    vec3 drift0 = curlOffset(pos0 * 0.22, uTime * 0.35, aPhase) * 0.2;
    pos0 += drift0;

    // 1. ACTO I / EL TRAZO: taut, harmonic drafting grid with ink wave scanlines
    float inkWave = sin(pos1.x * 0.38 - uTime * 0.85 + pos1.z * 0.28) * 0.12;
    pos1.y += inkWave;
    pos1.xz = rotate2D(sin(uTime * 0.12) * 0.12) * pos1.xz;

    // 2. ACTO II / LA COLUMNA VERTEBRAL: dense magnetic vertebral axis flexing with strength
    float spineFlex = sin(pos2.y * 0.35 + uTime * 0.55) * 0.42;
    pos2.x += spineFlex;
    float nerveFlow = mod(pos2.y - uTime * 1.1 + 8.0, 16.0) - 8.0;
    pos2.y = mix(pos2.y, nerveFlow, 0.18);
    // Magnetic rib breathing
    float magneticBreath = 1.0 + sin(uTime * 1.5 - abs(pos2.y) * 0.4) * 0.045;
    pos2.xz *= magneticBreath;

    // 3. ACTO III / RED NEURONAL ORGÁNICA Y SINAPSIS DIGITAL (ÁRBOL DE DECISIONES)
    // aBodyPart codifica la topología:
    // Parte entera = ID de rama o núcleo (0 = núcleo central, 1..16 = ramas principales, 17 = nube sináptica)
    // Parte decimal = distancia normalizada t (0.0 a 1.0) desde el núcleo hacia el extremo del axón.
    float branchId = floor(aBodyPart);
    float branchDist = fract(aBodyPart);

    // Respiración bio-orgánica de la red neuronal completa (pulsación rítmica sutil)
    vec3 neuralCore = vec3(1.2, 0.0, 0.0);
    float distToCore = length(pos3 - neuralCore);
    float neuralBreathe = 1.0 + sin(uTime * 1.5 - distToCore * 0.22) * 0.038;
    pos3 = neuralCore + (pos3 - neuralCore) * neuralBreathe;

    // Oscilación armónica viva a lo largo de las ramificaciones (red viva respirando)
    float waveFlex = sin(uTime * 2.2 + pos3.x * 0.35 + aPhase) * 0.08;
    pos3.y += waveFlex;
    pos3.z += cos(uTime * 1.9 + pos3.y * 0.4 + aPhase) * 0.07;

    // Impulsos eléctricos viajando secuencialmente por las ramificaciones
    // Transmisión centrífuga de paquetes de datos desde el núcleo hacia los bordes
    float signalSpeed = 0.65;
    float wavePos = fract(uTime * signalSpeed - branchDist * 1.35 + branchId * 0.173);
    float impulse = smoothstep(0.085, 0.0, abs(wavePos - 0.5));

    // Descarga y latido sináptico en el núcleo central de decisiones
    if (branchId < 0.5) {
      float coreFire = pow(max(0.0, sin(uTime * 3.0 + aPhase * 2.0)), 6.0);
      impulse = max(impulse, coreFire * 0.85);
    }

    // Micro-vibración bio-eléctrica de las fibras neuronales al paso del impulso
    pos3 += curlOffset(pos3 * 0.45, uTime * 0.8, aPhase) * (impulse * 0.08 + 0.012);

    // Activación del pulso sináptico cuando el morphing entra en Acto III
    float act3Active = smoothstep(1.9, 2.7, stage);
    float synapsePulse = impulse * act3Active;

    // Staggered per-particle morph progression
    float stagger = (fract(aPhase * 1.37) - 0.5) * 0.18;

    vec3 finalPos = pos0;
    if (stage <= 1.0) {
      float t = easeInOutCubic(clamp((stage + stagger * sin(stage * 3.14159)), 0.0, 1.0));
      // Flowing ink arc from heartbeat into drafting grid
      vec3 inkSwirl = curlOffset(pos0 * 0.22, uTime * 0.55, aPhase) * sin(t * 3.14159) * 1.2;
      finalPos = mix(pos0, pos1, t) + inkSwirl;
    } else if (stage <= 2.0) {
      float rawT = stage - 1.0;
      float t = easeInOutCubic(clamp((rawT + stagger * sin(rawT * 3.14159)), 0.0, 1.0));
      // Magnetic gathering from drafting grid into the spinal column
      vec3 compressionSwirl = curlOffset(pos1 * 0.25, uTime * 0.65, aPhase) * sin(t * 3.14159) * 0.95;
      finalPos = mix(pos1, pos2, t) + compressionSwirl;
    } else {
      float rawT = stage - 2.0;
      float t = easeInOutCubic(clamp((rawT + stagger * sin(rawT * 3.14159)), 0.0, 1.0));
      // Transición fluida y orgánica: la columna vertebral se abre y ramifica en la red neuronal
      vec3 synapticSwirl = curlOffset(mix(pos2, pos3, t) * 0.16, uTime * 0.5, aPhase) * sin(t * 3.14159) * 0.75;
      finalPos = mix(pos2, pos3, t) + synapticSwirl;
    }

    // =========================================================================
    // INTERSTELLAR GARGANTUA: REFINED, EASED, STYLIZED RELATIVISTIC VORTEX
    // =========================================================================
    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    vec4 clipPos = projectionMatrix * mvPosition;
    vec2 ndc = clipPos.xy / max(0.0001, clipPos.w);

    // Aspect-corrected screen-space offset from cursor
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 screenOffset = (ndc - uMouse) * vec2(aspect, 1.0);
    float dist = length(screenOffset);

    // Refined geometric radii (slimmer, highly stylized proportions)
    float rHorizon   = 0.082;   // Event Horizon: deep velvet obsidian void
    float rPhoton    = 0.128;   // Photon Sphere: whisper-thin incandescent Einstein ring
    float rInfluence = 0.62;    // Silky outer gravitational well

    float vortexIntensity = 0.0;
    float dopplerEffect = 0.0;
    float photonGlow = 0.0;
    float shadowFade = 1.0;

    if (dist < rInfluence && uMouseActive > 0.01) {
      // 1. High-order quintic easing (SmootherStep: zero 1st & 2nd derivative at limits)
      float normDist = clamp((rInfluence - dist) / (rInfluence - rPhoton), 0.0, 1.0);
      float pull = normDist * normDist * normDist * (normDist * (normDist * 6.0 - 15.0) + 10.0);
      vortexIntensity = pull * uMouseActive;

      // 2. Slow, majestic, hypnotic orbital rotation
      float baseAngle = atan(screenOffset.y, screenOffset.x);
      // Gentle differential Keplerian spin with soft dampening
      float spinSpeed = (0.09 / max(0.06, dist)) + 0.38;
      float swirlAngle = baseAngle + (spinSpeed * 0.45 + uTime * (0.42 + 0.06 / max(0.08, dist))) * uMouseActive;

      // 3. Silky organic gravitational drift (no abrupt snaps)
      float pullWeight = pow(pull, 1.6) * 0.52 * uMouseActive;
      float targetDist = mix(dist, rPhoton + (dist - rPhoton) * 0.68, pullWeight);

      // 4. Smooth harmonic gravitational lensing (continuous harmonic arch, zero discontinuous jumps)
      float diskTilt = 0.28; // ~16 deg tilt
      float diskAngle = swirlAngle - diskTilt;
      float orbitDepth = sin(diskAngle);
      // Far side deflection: continuously modulated by sin(swirlAngle) without sign jumps
      float archStrength = smoothstep(0.0, 0.85, orbitDepth) * pull * 0.24;
      float verticalArch = sin(swirlAngle) * archStrength * rPhoton;

      vec2 warpedScreen = vec2(
        cos(swirlAngle) * targetDist,
        sin(swirlAngle) * targetDist + verticalArch
      );

      // 5. Relativistic Doppler beaming (subtle, elegant luminous asymmetry)
      dopplerEffect = -sin(swirlAngle) * pull * 0.65;

      // 6. Razor-sharp, fine Gaussian photon ring
      float ringDelta = abs(targetDist - rPhoton);
      photonGlow = exp(-ringDelta * ringDelta / (2.0 * 0.00010)) * uMouseActive;

      // Reconstruct camera space coordinates
      vec2 newNDC = uMouse + (warpedScreen / vec2(aspect, 1.0));
      float camZ = -mvPosition.z;
      float targetCamX = newNDC.x * camZ / projectionMatrix[0][0];
      float targetCamY = newNDC.y * camZ / projectionMatrix[1][1];

      // Blend smoothly into the gravitational well with silky cubic easing
      float blendWeight = smoothstep(0.0, 1.0, pull * 0.88) * uMouseActive;
      mvPosition.x = mix(mvPosition.x, targetCamX, blendWeight);
      mvPosition.y = mix(mvPosition.y, targetCamY, blendWeight);

      // Gentle, velvety depth depression (-Z curvature funnel)
      mvPosition.z -= pow(pull, 1.8) * 2.6 * uMouseActive;
    }

    // 7. Event horizon: smooth opacity dissolution into the void (no flickering or popping)
    shadowFade = smoothstep(rHorizon - 0.012, rHorizon + 0.015, dist);

    gl_Position = projectionMatrix * mvPosition;

    // 8. Refined micro-pixel scale: fine, crisp architectural points
    // 8. Refined micro-pixel scale: fine, crisp architectural points
    float baseSize = aScale * (1.0 + photonGlow * 0.85 + vortexIntensity * 0.22 + uPulse * 0.2 + synapsePulse * 0.85);
    float perspectiveSize = baseSize * (24.0 / max(2.0, -mvPosition.z)) * uPixelRatio;
    gl_PointSize = clamp(perspectiveSize, 1.0, 5.8 * uPixelRatio);

    // 9. Depth, alpha and subtle organic twinkle
    float depthFade = smoothstep(-26.0, -4.0, mvPosition.z);
    float twinkle = 0.76 + 0.24 * sin(uTime * 1.8 + aPhase * 6.2831);
    vAlpha = clamp((depthFade * twinkle + photonGlow * 0.55 + max(0.0, dopplerEffect) * 0.25 + synapsePulse * 0.5) * shadowFade, 0.0, 1.0);
    vHighlight = max(photonGlow, synapsePulse * 0.85);
    vVortexGlow = vortexIntensity;
    vPhotonRing = photonGlow;
    vDoppler = dopplerEffect;
    vShadow = 1.0 - shadowFade;
    vSynapsePulse = synapsePulse;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vColorType;
  varying float vAlpha;
  varying float vHighlight;
  varying float vVortexGlow;
  varying float vPhotonRing;
  varying float vDoppler;
  varying float vShadow;
  varying float vSynapsePulse;

  void main() {
    // Crisp architectural square pixel (subtle bevel at 0.48 to prevent harsh aliasing)
    vec2 uv = abs(gl_PointCoord - vec2(0.5));
    float maxCoord = max(uv.x, uv.y);
    if (maxCoord > 0.48) discard;

    // Baseline editorial palette:
    // 0: Pure bright bone-white (#F5F3EE)
    // 1: Editorial warm ivory / silver (#B8B5AD)
    // 2: Deep slate structural pixel (#565552)
    // 3: Signature Awwwards ember orange spark (#FF4D1C)
    vec3 colWhite = vec3(0.965, 0.957, 0.937);
    vec3 colSilver = vec3(0.68, 0.67, 0.65);
    vec3 colSlate = vec3(0.34, 0.34, 0.33);
    vec3 colEmber = vec3(1.0, 0.302, 0.11);

    // Stylized, luxury Interstellar palette:
    vec3 colPhotonCore    = vec3(0.99, 0.98, 0.96);  // Pristine ivory Einstein photon ring
    vec3 colGargantuaGold = vec3(0.96, 0.82, 0.50);  // Champagne incandescent plasma
    vec3 colGargantuaAmber= vec3(0.92, 0.46, 0.14);  // Muted editorial accretion amber
    vec3 colDopplerHot    = vec3(0.90, 0.94, 1.00);  // Soft silver-blue high-energy shift
    vec3 colDopplerRed    = vec3(0.78, 0.24, 0.06);  // Subdued redshifted ember

    vec3 color = colWhite;
    float alpha = vAlpha;

    if (vColorType > 0.915) {
      color = colEmber;
      alpha = min(1.0, vAlpha * 1.25);
    } else if (vColorType > 0.62) {
      color = mix(colWhite, colEmber, vHighlight * 0.3);
      alpha = min(1.0, vAlpha * 1.08);
    } else if (vColorType > 0.28) {
      color = mix(colSilver, colWhite, vHighlight * 0.5);
      alpha = vAlpha * 0.85;
    } else {
      color = mix(colSlate, colSilver, vHighlight * 0.55);
      alpha = vAlpha * 0.58;
    }

    // Stylized Gargantua plasma with smooth easing
    if (vVortexGlow > 0.01) {
      // Smooth color transitions from amber to champagne gold to photon core
      vec3 plasma = mix(colGargantuaAmber, colGargantuaGold, smoothstep(0.1, 0.8, vVortexGlow));
      plasma = mix(plasma, colPhotonCore, vPhotonRing);

      // Relativistic Doppler beaming (delicate, elegant luminance balance)
      if (vDoppler > 0.0) {
        plasma = mix(plasma, colDopplerHot, vDoppler * 0.35);
        alpha = min(1.0, alpha * (1.0 + vDoppler * 0.35));
      } else {
        plasma = mix(plasma, colDopplerRed, (-vDoppler) * 0.4);
        alpha *= (1.0 - (-vDoppler) * 0.18);
      }

      // Smooth quintic-style blend between original particle and Gargantua plasma
      float plasmaWeight = smoothstep(0.08, 0.85, vVortexGlow);
      color = mix(color, plasma, plasmaWeight);

      // Delicate photon ring luminance highlight
      float photonBoost = vPhotonRing * 0.95 + max(0.0, vDoppler) * 0.25;
      color += photonBoost * vec3(0.28, 0.22, 0.12);
      alpha = min(1.0, alpha + photonBoost * 0.3);
    }

    // Impulsos eléctricos sinápticos incandescentes (disparos neuronales y flujo de datos vivo)
    if (vSynapsePulse > 0.01) {
      vec3 colSpark = mix(colEmber, vec3(1.0, 0.98, 0.92), vSynapsePulse * 0.65);
      color = mix(color, colSpark, vSynapsePulse * 0.85);
      alpha = min(1.0, alpha + vSynapsePulse * 0.8);
    }

    // Subtle crisp inner core luminance for micro-pixels
    float core = 1.0 - smoothstep(0.0, 0.45, maxCoord);
    color += core * (0.06 + vPhotonRing * 0.2);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function ParticleFieldCanvas({
  engineStateRef,
}: ParticleFieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 18000 : 36000;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x050505, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Build 4 distinct 3D morphological buffer states
    const posHero = new Float32Array(PARTICLE_COUNT * 3);
    const posAct1 = new Float32Array(PARTICLE_COUNT * 3);
    const posAct2 = new Float32Array(PARTICLE_COUNT * 3);
    const posAct3 = new Float32Array(PARTICLE_COUNT * 3);
    const bodyParts = new Float32Array(PARTICLE_COUNT);
    const scales = new Float32Array(PARTICLE_COUNT);
    const colorTypes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    // Dimensions for Act I 3D Cartesian Lattice
    const gridCols = isMobile ? 45 : 64;
    const gridRows = isMobile ? 25 : 32;
    const gridLayers = Math.ceil(PARTICLE_COUNT / (gridCols * gridRows));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // =========================================================
      // ESTADO 0: ACTO 0 / EL LATIDO (HERO)
      // Nube orgánica, cálida y viva que respira como un corazón.
      // Distribución esférica armónica con concentración central
      // y velo difuminado en los horizontes.
      // =========================================================
      const u = Math.random();
      const v = Math.random();
      const heroRadius = Math.pow(Math.random(), 0.72) * 14.5;
      const heroTheta = Math.random() * Math.PI * 2;
      const heroPhi = (Math.random() - 0.5) * Math.PI * 0.78;
      const heroX = heroRadius * Math.cos(heroTheta) * Math.cos(heroPhi) * 1.55;
      const heroY = 0.8 + heroRadius * Math.sin(heroPhi) * 0.95 - (u * 3.5);
      const heroZ = heroRadius * Math.sin(heroTheta) * Math.cos(heroPhi) * 0.85;

      posHero[i3] = heroX;
      posHero[i3 + 1] = heroY;
      posHero[i3 + 2] = heroZ;

      // =========================================================
      // ESTADO 1: ACTO I / EL TRAZO Y LAS TRINCHERAS (2000 — 2012)
      // Un trazo estructurado y tenso, una red armónica y pura
      // que evoca la precisión milimétrica del diseño de autor.
      // 48 estratos horizontales tensos con ondulación matemática Bézier.
      // =========================================================
      const lineIndex = i % 48;
      const pointIndex = Math.floor(i / 48);
      const totalPoints = Math.ceil(PARTICLE_COUNT / 48);
      const normX = (pointIndex / Math.max(1, totalPoints - 1) - 0.5) * 26.0;
      const normLine = (lineIndex / 47 - 0.5);
      const baseY = normLine * 11.8;
      // Tensión armónica de trazo arquitectónico
      const curveTension = Math.sin(normX * 0.28) * Math.cos(normLine * Math.PI) * 1.65;
      const zWave = Math.sin(normX * 0.35 + normLine * 3.14) * 2.2;

      posAct1[i3] = normX + (Math.random() - 0.5) * 0.08;
      posAct1[i3 + 1] = baseY + curveTension + (Math.random() - 0.5) * 0.08;
      posAct1[i3 + 2] = zWave;

      // =========================================================
      // ESTADO 2: ACTO II / LA COLUMNA VERTEBRAL (2012 — PRESENTE)
      // La red se comprime y se agrupa con fuerza en una
      // columna vertebral densa y magnética: médula central,
      // 28 vértebras articuladas y arcos de fuerza laterales.
      // =========================================================
      const isCord = i < PARTICLE_COUNT * 0.45;
      const isDisc = i < PARTICLE_COUNT * 0.80;
      const spineY = (Math.random() - 0.5) * 15.2;

      if (isCord) {
        // Médula central tensa (eje nervioso vertical de resistencia)
        const cordR = Math.pow(Math.random(), 0.75) * 0.88;
        const angle = Math.random() * Math.PI * 2;
        posAct2[i3] = Math.cos(angle) * cordR + 1.4; // Ligero offset derecho para equilibrar texto
        posAct2[i3 + 1] = spineY;
        posAct2[i3 + 2] = Math.sin(angle) * cordR;
      } else if (isDisc) {
        // 28 Discos vertebrales articulados que irradian tensión
        const discIndex = Math.floor((spineY + 7.6) / 15.2 * 28);
        const discY = (discIndex / 28 - 0.5) * 15.2;
        const angle = Math.random() * Math.PI * 2;
        const discRadius = 1.4 + Math.sin(angle * 2.0) * 0.5 + (Math.random() - 0.5) * 0.25;
        posAct2[i3] = Math.cos(angle) * discRadius + 1.4;
        posAct2[i3 + 1] = discY + (Math.random() - 0.5) * 0.18;
        posAct2[i3 + 2] = Math.sin(angle) * discRadius * 0.75;
      } else {
        // Arcos de costillas / campo de contención lateral
        const angle = (Math.random() - 0.5) * Math.PI * 0.85;
        const side = Math.random() > 0.5 ? 1 : -1;
        const ribSpan = 1.8 + Math.random() * 4.4;
        const ribY = spineY + Math.cos(ribSpan * 0.5) * 0.65;
        posAct2[i3] = 1.4 + side * ribSpan * Math.cos(angle * 0.5);
        posAct2[i3 + 1] = ribY;
        posAct2[i3 + 2] = Math.sin(angle) * 2.4;
      }

      // Per-particle visual traits
      // Varied pixel scales: mostly fine crisp squares (0.9..2.2) with occasional hero anchor pixels (2.4..3.6)
      const sizeRoll = Math.random();
      scales[i] =
        sizeRoll > 0.94
          ? 2.4 + Math.random() * 1.25
          : 0.85 + Math.random() * 1.35;

      colorTypes[i] = Math.random();
      phases[i] = Math.random() * Math.PI * 2;
    }

    // =========================================================
    // ESTADO 3: ACTO III / LA RED NEURONAL ORGÁNICA Y RAMIFICADA
    // (ÁRBOL DE DECISIONES / SINAPSIS DIGITAL VIVA)
    // - Núcleo sináptico central denso (focos neuronales interconectados)
    // - 16 ramificaciones tridimensionales en abanico (axones, dendritas,
    //   árbol de decisiones de software / IA)
    // - Nube sináptica periférica y vesículas flotantes
    // =========================================================
    const hubs = [
      { x: 1.2, y: 0.0, z: 0.0, r: 1.8 },
      { x: 1.8, y: 1.4, z: 0.5, r: 1.2 },
      { x: 0.6, y: -1.3, z: -0.4, r: 1.3 },
      { x: 1.9, y: -1.0, z: 0.6, r: 1.1 },
    ];

    const NUM_BRANCHES = 16;
    const branchConfigs = [];
    for (let b = 0; b < NUM_BRANCHES; b++) {
      const theta = (b / NUM_BRANCHES) * Math.PI * 2 + Math.sin(b * 1.7) * 0.2;
      const phi = Math.sin((b / NUM_BRANCHES) * Math.PI * 3.0) * 0.65;
      const hubIdx = b % hubs.length;
      branchConfigs.push({
        orig: hubs[hubIdx],
        dirX: Math.cos(theta) * Math.cos(phi) * 1.35,
        dirY: Math.sin(phi) * 1.1,
        dirZ: Math.sin(theta) * Math.cos(phi) * 0.85,
        length: 7.5 + (b % 5) * 1.4,
        wigglePhase: b * 1.47,
      });
    }

    const nucleusCount = Math.floor(PARTICLE_COUNT * 0.32);
    const branchCount = Math.floor(PARTICLE_COUNT * 0.52);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      if (i < nucleusCount) {
        // Núcleo sináptico central de alta densidad
        const h = hubs[i % hubs.length];
        const r = Math.pow(Math.random(), 0.65) * h.r;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posAct3[i3] = h.x + r * Math.sin(phi) * Math.cos(theta);
        posAct3[i3 + 1] = h.y + r * Math.sin(phi) * Math.sin(theta);
        posAct3[i3 + 2] = h.z + r * Math.cos(phi);
        bodyParts[i] = 0.0 + (r / h.r) * 0.15;
      } else if (i < nucleusCount + branchCount) {
        // Ramificaciones axonales / dendritas tridimensionales
        const bIdx = i % NUM_BRANCHES;
        const cfg = branchConfigs[bIdx];
        const t = Math.pow(Math.random(), 0.85); // Mayor densidad cerca del núcleo, disminuye hacia extremos

        // Bifurcación tridimensional (árbol de decisiones)
        let forkX = 0,
          forkY = 0,
          forkZ = 0;
        if (t > 0.45) {
          const forkSide = (i % 2 === 0 ? 1 : -1) * ((t - 0.45) / 0.55);
          forkX = -cfg.dirY * forkSide * 1.8;
          forkY = cfg.dirX * forkSide * 1.8;
          forkZ = Math.sin(bIdx) * forkSide * 1.2;
        }

        const curLen = t * cfg.length;
        const cx =
          cfg.orig.x +
          cfg.dirX * curLen +
          forkX +
          Math.sin(t * 4.5 + cfg.wigglePhase) * 0.65;
        const cy =
          cfg.orig.y +
          cfg.dirY * curLen +
          forkY +
          Math.cos(t * 4.0 + cfg.wigglePhase) * 0.65;
        const cz =
          cfg.orig.z +
          cfg.dirZ * curLen +
          forkZ +
          Math.sin(t * 3.5 + cfg.wigglePhase) * 0.55;

        // Grosor tubular cónico decreciente
        const radius = 0.55 * (1.0 - t * 0.8) * Math.sqrt(Math.random());
        const angle = Math.random() * Math.PI * 2;
        posAct3[i3] = cx + Math.cos(angle) * radius;
        posAct3[i3 + 1] = cy + Math.sin(angle) * radius;
        posAct3[i3 + 2] = cz + (Math.random() - 0.5) * radius * 0.7;

        // Codificación para impulsos secuenciales en shader: ID de rama + distancia t
        bodyParts[i] = bIdx + 1 + Math.min(0.99, t);
      } else {
        // Nube sináptica intersticial y vesículas de datos flotantes
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + Math.pow(Math.random(), 0.7) * 9.5;
        posAct3[i3] = 1.2 + r * Math.sin(phi) * Math.cos(theta) * 1.25;
        posAct3[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85;
        posAct3[i3 + 2] = r * Math.cos(phi) * 0.65;
        bodyParts[i] = 17.0 + Math.random() * 0.9;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(posHero, 3));
    geometry.setAttribute("aPosAct1", new THREE.BufferAttribute(posAct1, 3));
    geometry.setAttribute("aPosAct2", new THREE.BufferAttribute(posAct2, 3));
    geometry.setAttribute("aPosAct3", new THREE.BufferAttribute(posAct3, 3));
    geometry.setAttribute("aBodyPart", new THREE.BufferAttribute(bodyParts, 1));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute(
      "aColorType",
      new THREE.BufferAttribute(colorTypes, 1)
    );
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      // Start with the magnetic cavity gently positioned in lower-center like the reference image
      uMouse: { value: new THREE.Vector2(-0.08, -0.36) },
      uMouseActive: { value: 0.85 },
      uPulse: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Smooth mouse tracking with spring damping
    const targetMouse = new THREE.Vector2(-0.08, -0.36);
    let targetMouseActive = 0.85;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouse.set(nx, ny);
      targetMouseActive = 1.0;
    };

    const handlePointerLeave = () => {
      // Return softly to the signature lower-center cavity when cursor leaves window
      targetMouse.set(-0.08, -0.36);
      targetMouseActive = 0.75;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    window.addEventListener("resize", handleResize, { passive: true });

    // Animation loop with smoothed interpolation
    const clock = new THREE.Clock();
    let animationFrameId = 0;
    let smoothedMorph = 0;
    let smoothedPulse = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smoothly damp morphStage from GSAP ScrollTrigger state
      const targetMorph = engineStateRef.current.morphStage;
      smoothedMorph += (targetMorph - smoothedMorph) * 0.085;
      uniforms.uMorph.value = smoothedMorph;

      // Smoothly damp interaction pulse
      const targetPulse = engineStateRef.current.interactionPulse;
      smoothedPulse += (targetPulse - smoothedPulse) * 0.1;
      engineStateRef.current.interactionPulse *= 0.94; // Decay pulse
      uniforms.uPulse.value = smoothedPulse;

      // Silky celestial easing for black hole tracking with gentle momentum
      uniforms.uMouse.value.x +=
        (targetMouse.x - uniforms.uMouse.value.x) * 0.065;
      uniforms.uMouse.value.y +=
        (targetMouse.y - uniforms.uMouse.value.y) * 0.065;
      uniforms.uMouseActive.value +=
        (targetMouseActive - uniforms.uMouseActive.value) * 0.045;

      // Encuadre de cámara cinematográfico:
      // Mantiene un plano panorámico tridimensional (z = 14.5 a 15.0) para contemplar
      // toda la ramificación sináptica y el flujo de impulsos en el Acto III
      const act3Factor = Math.max(0.0, Math.min(1.0, (smoothedMorph - 2.0) / 1.0));
      const dollyT = act3Factor * act3Factor * (3.0 - 2.0 * act3Factor);
      const targetCamZ = THREE.MathUtils.lerp(14.5, 14.9, dollyT);
      camera.position.z += (targetCamZ - camera.position.z) * 0.055;

      // Paralaje sutil de cámara tridimensional con respuesta al cursor
      const camTargetX =
        uniforms.uMouse.value.x * 0.65 +
        (smoothedMorph > 1.2 && smoothedMorph < 2.3 ? 0.45 : 0.0);
      const camTargetY = uniforms.uMouse.value.y * 0.45;
      camera.position.x += (camTargetX - camera.position.x) * 0.05;
      camera.position.y += (camTargetY - camera.position.y) * 0.05;
      camera.lookAt(act3Factor * 0.5, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Strict cleanup to guarantee zero WebGL memory leaks
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);

      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [engineStateRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#050505]"
    />
  );
}
