import fs from 'fs';

const PARTICLE_COUNT = 36000;
const posAct3 = new Float32Array(PARTICLE_COUNT * 3);
const bodyParts = new Float32Array(PARTICLE_COUNT);

// Hubs
const hubs = [
  { x: 1.2, y: 0.0, z: 0.0, r: 1.8 },
  { x: 1.8, y: 1.4, z: 0.5, r: 1.2 },
  { x: 0.6, y: -1.3, z: -0.4, r: 1.3 },
  { x: 1.9, y: -1.0, z: 0.6, r: 1.1 }
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
    // Nucleus
    const h = hubs[i % hubs.length];
    const u = Math.random();
    const r = Math.pow(Math.random(), 0.65) * h.r;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    posAct3[i3] = h.x + r * Math.sin(phi) * Math.cos(theta);
    posAct3[i3 + 1] = h.y + r * Math.sin(phi) * Math.sin(theta);
    posAct3[i3 + 2] = h.z + r * Math.cos(phi);
    bodyParts[i] = 0.0 + (r / h.r) * 0.15;
  } else if (i < nucleusCount + branchCount) {
    // Branch
    const bIdx = i % NUM_BRANCHES;
    const cfg = branchConfigs[bIdx];
    const t = Math.pow(Math.random(), 0.85); // More density toward core, tapering out
    
    // Bifurcation fork
    let forkX = 0, forkY = 0, forkZ = 0;
    if (t > 0.45) {
      const forkSide = (i % 2 === 0 ? 1 : -1) * ((t - 0.45) / 0.55);
      forkX = -cfg.dirY * forkSide * 1.8;
      forkY = cfg.dirX * forkSide * 1.8;
      forkZ = Math.sin(bIdx) * forkSide * 1.2;
    }

    const curLen = t * cfg.length;
    const cx = cfg.orig.x + cfg.dirX * curLen + forkX + Math.sin(t * 4.5 + cfg.wigglePhase) * 0.65;
    const cy = cfg.orig.y + cfg.dirY * curLen + forkY + Math.cos(t * 4.0 + cfg.wigglePhase) * 0.65;
    const cz = cfg.orig.z + cfg.dirZ * curLen + forkZ + Math.sin(t * 3.5 + cfg.wigglePhase) * 0.55;

    // Radius thickness
    const radius = 0.55 * (1.0 - t * 0.8) * Math.sqrt(Math.random());
    const angle = Math.random() * Math.PI * 2;
    posAct3[i3] = cx + Math.cos(angle) * radius;
    posAct3[i3 + 1] = cy + Math.sin(angle) * radius;
    posAct3[i3 + 2] = cz + (Math.random() - 0.5) * radius * 0.7;

    bodyParts[i] = (bIdx + 1) + Math.min(0.99, t);
  } else {
    // Floating synaptic cloud
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.pow(Math.random(), 0.7) * 9.5;
    posAct3[i3] = 1.2 + r * Math.sin(phi) * Math.cos(theta) * 1.25;
    posAct3[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85;
    posAct3[i3 + 2] = r * Math.cos(phi) * 0.65;
    bodyParts[i] = 17.0 + Math.random() * 0.9;
  }
}

// Bounding box check
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
let minZ = Infinity, maxZ = -Infinity;
let hasNaN = false;

for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
  const x = posAct3[i], y = posAct3[i + 1], z = posAct3[i + 2];
  if (isNaN(x) || isNaN(y) || isNaN(z)) hasNaN = true;
  minX = Math.min(minX, x); maxX = Math.max(maxX, x);
  minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
}

console.log('NaN check:', hasNaN ? 'FAILED' : 'PASSED');
console.log('Bounds:', {
  x: [minX.toFixed(2), maxX.toFixed(2)],
  y: [minY.toFixed(2), maxY.toFixed(2)],
  z: [minZ.toFixed(2), maxZ.toFixed(2)],
});
