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

  varying float vColorType;
  varying float vAlpha;
  varying float vHighlight;
  varying float vVortexGlow;
  varying float vPhotonRing;
  varying float vDoppler;
  varying float vShadow;

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
    // State 3: Act III Orbital Singularity Core (stage 3.0)

    vec3 pos0 = position;
    vec3 pos1 = aPosAct1;
    vec3 pos2 = aPosAct2;
    vec3 pos3 = aPosAct3;

    // Dynamic life inside each state before blending
    // 0. HERO NEBULA: subtle breathing memory field
    vec3 drift0 = curlOffset(pos0 * 0.35, uTime * 0.45, aPhase) * 0.28;
    pos0 += drift0;

    // 1. ACT I LATTICE: surgical precision grid with wave scanline
    float gridWave = sin(pos1.x * 0.55 - uTime * 1.4 + pos1.z * 0.4) * 0.16;
    pos1.y += gridWave;
    pos1.xz = rotate2D(sin(uTime * 0.14) * 0.18) * pos1.xz;

    // 2. ACT II MONOLITH: dense vertical industrial slab with vertical data flux
    float monolithStream = mod(pos2.y + uTime * (0.9 + fract(aPhase) * 1.2) + 6.0, 12.0) - 6.0;
    pos2.y = mix(pos2.y, monolithStream, 0.35);
    pos2.xz = rotate2D(uTime * 0.22) * pos2.xz;
    // Subtle magnetic compression pulse
    float compress = 1.0 + sin(uTime * 2.2 - abs(pos2.y) * 0.6) * 0.04;
    pos2.xz *= compress;

    // 3. ACT III ORBITAL SINGULARITY: multi-ring gyroscope + living AI core
    float radiusXZ = length(pos3.xz);
    float orbitSpeed = (radiusXZ < 2.2) ? 1.15 : (0.55 / max(0.6, radiusXZ * 0.28));
    pos3.xz = rotate2D(uTime * orbitSpeed + aPhase * 0.25) * pos3.xz;
    pos3.yz = rotate2D(sin(uTime * 0.35) * 0.42) * pos3.yz;
    pos3 += curlOffset(pos3 * 0.5, uTime * 0.9, aPhase) * (0.12 + uPulse * 0.18);

    // Staggered per-particle morph progression
    float stagger = (fract(aPhase * 1.37) - 0.5) * 0.18;

    vec3 finalPos = pos0;
    if (stage <= 1.0) {
      float t = easeInOutCubic(clamp((stage + stagger * sin(stage * 3.14159)), 0.0, 1.0));
      // Swirl arc during transition 0 -> 1
      vec3 midSwirl = curlOffset(pos0 * 0.25, uTime * 0.8, aPhase) * sin(t * 3.14159) * 1.35;
      finalPos = mix(pos0, pos1, t) + midSwirl;
    } else if (stage <= 2.0) {
      float rawT = stage - 1.0;
      float t = easeInOutCubic(clamp((rawT + stagger * sin(rawT * 3.14159)), 0.0, 1.0));
      vec3 midSwirl = curlOffset(pos1 * 0.3, uTime * 0.9, aPhase) * sin(t * 3.14159) * 1.1;
      finalPos = mix(pos1, pos2, t) + midSwirl;
    } else {
      float rawT = stage - 2.0;
      float t = easeInOutCubic(clamp((rawT + stagger * sin(rawT * 3.14159)), 0.0, 1.0));
      // Explosive expansion from monolith into orbital singularity
      vec3 burst = normalize(pos3 + vec3(0.0001)) * sin(t * 3.14159) * 1.65;
      finalPos = mix(pos2, pos3, t) + burst;
    }

    // =========================================================================
    // INTERSTELLAR GARGANTUA: RELATIVISTIC BLACK HOLE & GRAVITATIONAL LENSING
    // =========================================================================
    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    vec4 clipPos = projectionMatrix * mvPosition;
    vec2 ndc = clipPos.xy / max(0.0001, clipPos.w);

    // Aspect-corrected screen-space offset from cursor
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 screenOffset = (ndc - uMouse) * vec2(aspect, 1.0);
    float dist = length(screenOffset);

    // Gargantua Geometric Boundaries (in screen space)
    float rHorizon   = 0.102;   // Event Horizon: absolute black shadow sphere
    float rPhoton    = 0.146;   // Photon Sphere: incandescent Einstein ring
    float rInfluence = 0.70;    // Outer gravitational suction field

    float vortexIntensity = 0.0;
    float dopplerEffect = 0.0;
    float photonGlow = 0.0;
    float shadowMask = 0.0;

    if (dist < rInfluence && uMouseActive > 0.01) {
      // Gravitational attraction strength (smooth falloff towards outer boundary)
      float pull = smoothstep(rInfluence, rPhoton, dist);
      vortexIntensity = pull * uMouseActive;

      // Base polar angle around the singularity
      float baseAngle = atan(screenOffset.y, screenOffset.x);

      // Relativistic Kerr frame-dragging differential swirl
      // Angular velocity omega increases sharply towards horizon
      float spinSpeed = (0.28 / max(0.032, dist)) + 0.95;
      float swirlAngle = baseAngle + (spinSpeed * 0.42 + uTime * (1.85 + 0.32 / max(0.045, dist))) * uMouseActive;

      // Gravitational inward pull towards the accretion disk & photon sphere
      float targetDist = dist;
      if (dist > rPhoton) {
        // Strong suction towards the photon sphere & accretion ring
        targetDist = mix(dist, rPhoton + (dist - rPhoton) * 0.46, pull * 0.74);
      } else {
        // Deflection around singularity onto the razor-sharp photon ring
        targetDist = mix(rPhoton, dist, 0.08);
      }

      // Gravitational Lensing (Interstellar Signature Arch):
      // The accretion disk is viewed at ~18 degree inclination.
      // Light from the rear of the disk (orbitDepth > 0) is bent over the top and
      // under the bottom of the black sphere, creating the iconic Interstellar dual halo!
      float diskTilt = 0.32;
      float diskAngle = swirlAngle - diskTilt;
      float orbitDepth = sin(diskAngle);

      // Arch displacement: bends far side radially outward around the event horizon
      float lensArch = (rPhoton * 1.34) * smoothstep(0.0, 1.0, orbitDepth) * pull;
      float archSign = sign(sin(swirlAngle));
      
      // Compute warped screen coordinates with gravitational lensing arch
      vec2 warpedScreen = vec2(
        cos(swirlAngle) * targetDist,
        sin(swirlAngle) * targetDist + archSign * lensArch * 0.40
      );

      // Relativistic Doppler beaming:
      // Material orbiting towards observer (-sin(swirlAngle) > 0) is boosted in brightness & blue-shifted.
      // Receding material is dimmed & red-shifted.
      dopplerEffect = -sin(swirlAngle) * pull;

      // Razor-sharp Photon Sphere Einstein Ring (Gaussian profile)
      float ringDelta = abs(targetDist - rPhoton);
      photonGlow = exp(-ringDelta * ringDelta / (2.0 * 0.00018)) * uMouseActive;

      // Reconstruct camera space position from warped screen coordinates
      vec2 newNDC = uMouse + (warpedScreen / vec2(aspect, 1.0));
      float camZ = -mvPosition.z;
      float targetCamX = newNDC.x * camZ / projectionMatrix[0][0];
      float targetCamY = newNDC.y * camZ / projectionMatrix[1][1];

      // Smoothly blend original coordinates into the gravitational well
      float blendWeight = pull * uMouseActive;
      mvPosition.x = mix(mvPosition.x, targetCamX, blendWeight);
      mvPosition.y = mix(mvPosition.y, targetCamY, blendWeight);

      // Deep spacetime curvature well (-Z funnel into screen)
      mvPosition.z -= pow(pull, 2.2) * 4.6 * uMouseActive;
    }

    // Shadow horizon exclusion: particles inside the event horizon are swallowed
    shadowMask = smoothstep(rHorizon, rHorizon - 0.016, dist) * uMouseActive;

    gl_Position = projectionMatrix * mvPosition;

    // Dynamic pixel sizing: photon ring & accretion disk particles ignite into energetic sparks
    float baseSize = aScale * (1.0 + photonGlow * 2.2 + vortexIntensity * 0.55 + max(0.0, dopplerEffect) * 0.4 + uPulse * 0.3);
    float perspectiveSize = baseSize * (26.0 / max(1.5, -mvPosition.z)) * uPixelRatio;
    gl_PointSize = clamp(perspectiveSize, 1.2, 14.0 * uPixelRatio);

    // Depth & alpha calculation
    float depthFade = smoothstep(-26.0, -4.0, mvPosition.z);
    float twinkle = 0.72 + 0.28 * sin(uTime * 2.1 + aPhase * 6.2831);
    vAlpha = clamp(depthFade * twinkle * (1.0 - shadowMask) + photonGlow * 0.85 + max(0.0, dopplerEffect) * 0.45, 0.0, 1.0);
    vHighlight = photonGlow;
    vVortexGlow = vortexIntensity;
    vPhotonRing = photonGlow;
    vDoppler = dopplerEffect;
    vShadow = shadowMask;
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

  void main() {
    // Event horizon: absolute obsidian black void (discard all particles inside the shadow)
    if (vShadow > 0.92) discard;

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

    // Interstellar Gargantua Palette:
    vec3 colPhotonCore    = vec3(1.0, 0.995, 0.97);  // Blinding white-hot Einstein photon ring
    vec3 colGargantuaGold = vec3(1.0, 0.84, 0.38);   // Incandescent molten gold plasma
    vec3 colGargantuaAmber= vec3(1.0, 0.50, 0.08);   // Fiery Interstellar accretion disk
    vec3 colDopplerHot    = vec3(0.85, 0.94, 1.0);   // Relativistic blue-white beaming (approaching)
    vec3 colDopplerRed    = vec3(0.82, 0.16, 0.02);  // Relativistic red-shifted ember (receding)

    vec3 color = colWhite;
    float alpha = vAlpha;

    if (vColorType > 0.915) {
      color = colEmber;
      alpha = min(1.0, vAlpha * 1.28);
    } else if (vColorType > 0.62) {
      color = mix(colWhite, colEmber, vHighlight * 0.35);
      alpha = min(1.0, vAlpha * 1.1);
    } else if (vColorType > 0.28) {
      color = mix(colSilver, colWhite, vHighlight * 0.65);
      alpha = vAlpha * 0.85;
    } else {
      color = mix(colSlate, colSilver, vHighlight * 0.7);
      alpha = vAlpha * 0.58;
    }

    // Interstellar Gargantua Accretion Plasma Shader
    if (vVortexGlow > 0.015) {
      // Blend from fiery amber to gold to incandescent white at the photon ring
      vec3 plasma = mix(colGargantuaAmber, colGargantuaGold, vVortexGlow * 0.75);
      plasma = mix(plasma, colPhotonCore, vPhotonRing);

      // Relativistic Doppler beaming
      if (vDoppler > 0.0) {
        plasma = mix(plasma, colDopplerHot, vDoppler * 0.45);
        alpha = min(1.0, alpha * (1.0 + vDoppler * 0.5));
      } else {
        plasma = mix(plasma, colDopplerRed, (-vDoppler) * 0.55);
        alpha *= (1.0 - (-vDoppler) * 0.25);
      }

      // Smoothly blend baseline color with Gargantua plasma
      float plasmaWeight = smoothstep(0.04, 0.82, vVortexGlow);
      color = mix(color, plasma, plasmaWeight);

      // Incandescent photon ring luminance boost
      float photonBoost = vPhotonRing * 1.6 + max(0.0, vDoppler) * 0.4;
      color += photonBoost * vec3(0.35, 0.28, 0.16);
      alpha = min(1.0, alpha + photonBoost * 0.4);
    }

    // Subtle crisp inner core luminance for larger pixels
    float core = 1.0 - smoothstep(0.0, 0.45, maxCoord);
    color += core * (0.08 + vPhotonRing * 0.35);

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
      // STATE 0: HERO — HIGH-DENSITY LIVING MEMORY NEBULA
      // Matches reference screenshot: dense suspended pixel cloud
      // with feathered top horizon below the navbar line.
      // =========================================================
      const u = Math.random();
      const v = Math.random();
      // Wide horizontal span filling viewport
      const heroX = (u - 0.5) * 29.0 + (Math.random() - 0.5) * 1.5;
      // Top horizon feathers out right around y = +5.1 (just under header line)
      const verticalBias = Math.pow(v, 0.92);
      const heroY = 5.15 - verticalBias * 12.2 + (Math.random() - 0.5) * 0.65;
      // Layered depth for parallax richness
      const heroZ = (Math.random() - 0.5) * 9.5;

      posHero[i3] = heroX;
      posHero[i3 + 1] = heroY;
      posHero[i3 + 2] = heroZ;

      // =========================================================
      // STATE 1: ACT I — SURGICAL ARCHITECTURAL 3D GRID LATTICE
      // Symbolizes classic art direction, Swiss grid & early code
      // =========================================================
      const col = i % gridCols;
      const row = Math.floor(i / gridCols) % gridRows;
      const layer = Math.floor(i / (gridCols * gridRows));

      const normX = col / (gridCols - 1) - 0.5;
      const normY = row / (gridRows - 1) - 0.5;
      const normZ = layer / Math.max(1, gridLayers - 1) - 0.5;

      // Architectural perspective horizon + structured grid nodes
      posAct1[i3] = normX * 22.0 + (Math.random() - 0.5) * 0.08;
      posAct1[i3 + 1] = normY * 11.2 + (Math.random() - 0.5) * 0.08;
      posAct1[i3 + 2] = normZ * 8.5 - 1.0;

      // =========================================================
      // STATE 2: ACT II — INDUSTRIAL MAGNETIC MONOLITH
      // Towering high-density brutalist prism / core on the right-center
      // symbolizing 1,200+ campaigns under extreme pressure
      // =========================================================
      const isCoreMonolith = i < PARTICLE_COUNT * 0.84;
      if (isCoreMonolith) {
        // Sharp rectangular monolith with stratified horizontal density bands
        const band = Math.floor(Math.random() * 28) / 28 - 0.5;
        const mX = (Math.random() - 0.5) * 5.2 + 2.2; // Offset slightly right to balance huge metrics
        const mY = band * 11.4 + (Math.random() - 0.5) * 0.28;
        const mZ = (Math.random() - 0.5) * 4.4;
        posAct2[i3] = mX;
        posAct2[i3 + 1] = mY;
        posAct2[i3 + 2] = mZ;
      } else {
        // Magnetic containment field surrounding the monolith
        const angle = Math.random() * Math.PI * 2;
        const radius = 3.8 + Math.random() * 6.5;
        posAct2[i3] = Math.cos(angle) * radius + 2.2;
        posAct2[i3 + 1] = (Math.random() - 0.5) * 11.5;
        posAct2[i3 + 2] = Math.sin(angle) * radius;
      }

      // =========================================================
      // STATE 3: ACT III — ORBITAL SINGULARITY & AI AGENT CORE
      // Multi-ring gyroscope + incandescent Fibonacci sphere core
      // symbolizing SaaS products & 6-agent AI orchestration
      // =========================================================
      const group = i % 10;
      if (group < 4) {
        // Inner incandescent spherical AI nucleus (Fibonacci / random sphere shell)
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 1.85 * Math.cbrt(0.25 + 0.75 * Math.random());
        posAct3[i3] = r * Math.sin(phi) * Math.cos(theta);
        posAct3[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posAct3[i3 + 2] = r * Math.cos(phi);
      } else if (group < 8) {
        // 4 Concentric tilted orbital rings (4 Lab products: Next3Hours, Smashzone, Motorland, Cartle)
        const ringIdx = group - 4; // 0, 1, 2, 3
        const ringRadii = [3.6, 5.2, 6.9, 8.8];
        const ringTilts = [0.32, -0.48, 0.22, -0.35];
        const r = ringRadii[ringIdx] + (Math.random() - 0.5) * 0.42;
        const theta = Math.random() * Math.PI * 2;
        const tilt = ringTilts[ringIdx];

        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        const y = (Math.random() - 0.5) * 0.25 + x * Math.sin(tilt);

        posAct3[i3] = x * Math.cos(tilt);
        posAct3[i3 + 1] = y;
        posAct3[i3 + 2] = z;
      } else {
        // Outer neural data cloud / synaptic halo
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 9.2 + Math.random() * 5.0;
        posAct3[i3] = r * Math.sin(phi) * Math.cos(theta);
        posAct3[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
        posAct3[i3 + 2] = r * Math.cos(phi);
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

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(posHero, 3));
    geometry.setAttribute("aPosAct1", new THREE.BufferAttribute(posAct1, 3));
    geometry.setAttribute("aPosAct2", new THREE.BufferAttribute(posAct2, 3));
    geometry.setAttribute("aPosAct3", new THREE.BufferAttribute(posAct3, 3));
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

      // Smoothly damp mouse position for responsive singularity tracking
      uniforms.uMouse.value.x +=
        (targetMouse.x - uniforms.uMouse.value.x) * 0.11;
      uniforms.uMouse.value.y +=
        (targetMouse.y - uniforms.uMouse.value.y) * 0.11;
      uniforms.uMouseActive.value +=
        (targetMouseActive - uniforms.uMouseActive.value) * 0.08;

      // Subtle camera parallax tied to cursor & act stage
      const camTargetX =
        uniforms.uMouse.value.x * 0.55 +
        (smoothedMorph > 1.2 && smoothedMorph < 2.4 ? 0.45 : 0.0);
      const camTargetY = uniforms.uMouse.value.y * 0.35;
      camera.position.x += (camTargetX - camera.position.x) * 0.05;
      camera.position.y += (camTargetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

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
