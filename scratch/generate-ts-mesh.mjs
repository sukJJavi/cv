import fs from 'fs';

const json = JSON.parse(fs.readFileSync('public/models/walking_human.json', 'utf8'));
const verts = json.vertices; // flat array of x, y, z

console.log('Generating src/data/humanoidMesh.ts, vert count:', verts.length / 3);

let tsContent = `// Real 3D Anatomical Humanoid Mesh Vertices for Act III\n`;
tsContent += `// Extracted directly from 3D walking model (7,434 vertices in natural forward stride)\n`;
tsContent += `export const PRELOADED_HUMANOID_VERTICES = new Float32Array([\n`;

for (let i = 0; i < verts.length; i += 3) {
  tsContent += `  ${verts[i]}, ${verts[i + 1]}, ${verts[i + 2]},\n`;
}

tsContent += `]);\n`;

fs.writeFileSync('src/data/humanoidMesh.ts', tsContent);
console.log('Saved src/data/humanoidMesh.ts, size:', tsContent.length);
