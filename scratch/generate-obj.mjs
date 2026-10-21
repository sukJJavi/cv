import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

if (typeof self === 'undefined') {
  global.self = global;
}

const glbBuf = fs.readFileSync('public/models/Soldier.glb');
const arrayBuffer = glbBuf.buffer.slice(glbBuf.byteOffset, glbBuf.byteOffset + glbBuf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuffer, '', (gltf) => {
  const model = gltf.scene;
  const walkClip = gltf.animations.find(a => a.name === 'Walk');
  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(walkClip);
  action.play();
  
  // Set to mid-stride (0.35s)
  mixer.setTime(0.35);
  model.updateMatrixWorld(true);

  const rawVerts = [];
  const rawFaces = [];
  const v = new THREE.Vector3();

  let vertOffset = 0;
  gltf.scene.traverse((child) => {
    if (child.isSkinnedMesh) {
      const mesh = child;
      const posAttr = mesh.geometry.attributes.position;
      const indexAttr = mesh.geometry.index;
      
      const startIdx = rawVerts.length / 3;

      for (let i = 0; i < posAttr.count; i++) {
        v.fromBufferAttribute(posAttr, i);
        mesh.applyBoneTransform(i, v);
        v.applyMatrix4(mesh.matrixWorld);
        rawVerts.push(v.x, v.y, v.z);
      }

      if (indexAttr) {
        for (let i = 0; i < indexAttr.count; i += 3) {
          rawFaces.push([
            startIdx + indexAttr.getX(i) + 1,
            startIdx + indexAttr.getX(i + 1) + 1,
            startIdx + indexAttr.getX(i + 2) + 1
          ]);
        }
      } else {
        for (let i = 0; i < posAttr.count; i += 3) {
          rawFaces.push([
            startIdx + i + 1,
            startIdx + i + 2,
            startIdx + i + 3
          ]);
        }
      }
    }
  });

  // Calculate bounding box and scale to height = 2.4, Y in [-1.2, +1.2]
  let minY = Infinity, maxY = -Infinity;
  let minX = Infinity, maxX = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (let i = 0; i < rawVerts.length; i += 3) {
    const x = rawVerts[i];
    const y = rawVerts[i + 1];
    const z = rawVerts[i + 2];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }

  const rawHeight = maxY - minY;
  const targetHeight = 2.4;
  const scale = targetHeight / rawHeight;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const midZ = (minZ + maxZ) / 2;

  // Generate normalized OBJ string
  let obj = '# Real 3D Walking Humanoid Mesh for Act III\n';
  obj += `# Vertices: ${rawVerts.length / 3}, Triangles: ${rawFaces.length}\n`;

  const scaledVerts = [];
  for (let i = 0; i < rawVerts.length; i += 3) {
    const nx = (rawVerts[i] - midX) * scale;
    const ny = (rawVerts[i + 1] - midY) * scale;
    const nz = (rawVerts[i + 2] - midZ) * scale;
    scaledVerts.push(nx, ny, nz);
    obj += `v ${nx.toFixed(4)} ${ny.toFixed(4)} ${nz.toFixed(4)}\n`;
  }

  for (const f of rawFaces) {
    obj += `f ${f[0]} ${f[1]} ${f[2]}\n`;
  }

  fs.writeFileSync('public/models/walking_human.obj', obj);
  console.log('Saved public/models/walking_human.obj, size:', obj.length);

  // Also save a compact JSON with raw float array
  const jsonContent = JSON.stringify({
    vertices: scaledVerts.map(n => Math.round(n * 10000) / 10000),
    faces: rawFaces
  });
  fs.writeFileSync('public/models/walking_human.json', jsonContent);
  console.log('Saved public/models/walking_human.json, size:', jsonContent.length);
});
