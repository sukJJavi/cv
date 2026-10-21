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

  // Extract all triangles and vertices in world space
  const vertices = [];
  const indices = [];
  const v = new THREE.Vector3();

  let offset = 0;
  gltf.scene.traverse((child) => {
    if (child.isSkinnedMesh) {
      const mesh = child;
      const posAttr = mesh.geometry.attributes.position;
      const indexAttr = mesh.geometry.index;
      
      const meshStart = vertices.length / 3;

      for (let i = 0; i < posAttr.count; i++) {
        v.fromBufferAttribute(posAttr, i);
        mesh.applyBoneTransform(i, v);
        v.applyMatrix4(mesh.matrixWorld);
        vertices.push(v.x, v.y, v.z);
      }

      if (indexAttr) {
        for (let i = 0; i < indexAttr.count; i++) {
          indices.push(meshStart + indexAttr.getX(i));
        }
      } else {
        for (let i = 0; i < posAttr.count; i++) {
          indices.push(meshStart + i);
        }
      }
    }
  });

  console.log('Total vertices:', vertices.length / 3);
  console.log('Total triangles:', indices.length / 3);

  // Calculate bounding box
  let minY = Infinity, maxY = -Infinity;
  let minX = Infinity, maxX = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];
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
  const midY = (minY + maxY) / 2;
  const midX = (minX + maxX) / 2;
  const midZ = (minZ + maxZ) / 2;

  console.log('Raw Bounds:', { minX, maxX, minY, maxY, minZ, maxZ });
  console.log('Scale factor:', scale.toFixed(4));
  console.log('Centered range Y:', [-targetHeight/2, targetHeight/2]);
});
