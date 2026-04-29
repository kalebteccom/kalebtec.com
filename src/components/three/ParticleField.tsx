'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  size?: number;
  isDark?: boolean;
}

export default function ParticleField({
  count = 200,
  radius = 6,
  size = 0.025,
  isDark = true,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const entranceProgress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const actualCount = isMobile ? Math.floor(count * 0.5) : count;

  // Generate particle positions -- some grid-aligned, some random
  const { positions, velocities, phases, colors } = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const vel = new Float32Array(actualCount * 3);
    const pha = new Float32Array(actualCount);
    const col = new Float32Array(actualCount * 3);

    // Monochrome particles — ink in light theme, paper in dark theme
    const tone = new THREE.Color(isDark ? '#f1f0e4' : '#080f11');

    const gridSpacing = 1.5;

    for (let i = 0; i < actualCount; i++) {
      // ~40% of particles snap near grid intersections
      if (i < actualCount * 0.4) {
        // Grid-aligned with slight jitter
        const gx = Math.round((Math.random() * 2 - 1) * (radius / gridSpacing)) * gridSpacing;
        const gy = Math.round((Math.random() * 2 - 1) * (radius / gridSpacing)) * gridSpacing;
        const gz = -Math.random() * radius * 0.8;

        pos[i * 3] = gx + (Math.random() - 0.5) * 0.15;
        pos[i * 3 + 1] = gy + (Math.random() - 0.5) * 0.15;
        pos[i * 3 + 2] = gz;
      } else {
        // Random distribution in a box volume
        pos[i * 3] = (Math.random() - 0.5) * radius * 2;
        pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
        pos[i * 3 + 2] = -Math.random() * radius;
      }

      // Linear/mechanical drift -- mostly along one axis
      const driftAxis = Math.floor(Math.random() * 3);
      vel[i * 3] = driftAxis === 0 ? (Math.random() - 0.5) * 0.003 : (Math.random() - 0.5) * 0.0005;
      vel[i * 3 + 1] =
        driftAxis === 1 ? (Math.random() - 0.5) * 0.003 : (Math.random() - 0.5) * 0.0005;
      vel[i * 3 + 2] =
        driftAxis === 2 ? (Math.random() - 0.5) * 0.002 : (Math.random() - 0.5) * 0.0003;

      // Random phase offset for pulse
      pha[i] = Math.random() * Math.PI * 2;

      // Single monochrome tone for all particles
      col[i * 3] = tone.r;
      col[i * 3 + 1] = tone.g;
      col[i * 3 + 2] = tone.b;
    }

    return { positions: pos, velocities: vel, phases: pha, colors: col };
  }, [actualCount, radius, isDark]);

  // Custom sizes for pulse effect
  const sizes = useMemo(() => {
    const s = new Float32Array(actualCount);
    for (let i = 0; i < actualCount; i++) {
      s[i] = size * (0.5 + Math.random() * 1.0);
    }
    return s;
  }, [actualCount, size]);

  // Sharp square particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    // Sharp square with slight inner glow
    ctx.fillStyle = 'rgba(255,255,255,0)';
    ctx.fillRect(0, 0, 32, 32);

    // Inner bright square
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(4, 4, 24, 24);

    // Slight edge glow
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillRect(2, 2, 28, 28);
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(6, 6, 20, 20);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
  }, []);

  // Always use NormalBlending — additive would tint particles
  useEffect(() => {
    if (!pointsRef.current) return;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.blending = THREE.NormalBlending;
    material.needsUpdate = true;
  }, [isDark]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute('size') as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;

    // Entrance fade
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + 0.008);
    }
    const material = pointsRef.current.material as THREE.PointsMaterial;
    // Quiet ambient texture — particles barely register
    const maxOpacity = isDark ? 0.18 : 0.22;
    material.opacity = entranceProgress.current * maxOpacity;

    // Animate positions and sizes
    for (let i = 0; i < actualCount; i++) {
      // Linear drift
      posAttr.array[i * 3] += velocities[i * 3];
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around if too far from center
      const x = posAttr.array[i * 3];
      const y = posAttr.array[i * 3 + 1];
      const z = posAttr.array[i * 3 + 2];

      if (Math.abs(x) > radius * 1.2) posAttr.array[i * 3] *= -0.5;
      if (Math.abs(y) > radius * 1.2) posAttr.array[i * 3 + 1] *= -0.5;
      if (z > 1 || z < -radius * 1.2) posAttr.array[i * 3 + 2] = -Math.random() * radius * 0.5;

      // Pulse: modulate size with step-like function for mechanical feel
      const pulse = 0.7 + 0.3 * Math.sign(Math.sin(time * 2.0 + phases[i]));
      sizeAttr.array[i] = sizes[i] * pulse;
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    // Subtle mouse parallax on the whole particle group
    const mouseX = state.pointer.x * 0.08;
    const mouseY = state.pointer.y * 0.05;
    pointsRef.current.rotation.y = mouseX * 0.3;
    pointsRef.current.rotation.x = mouseY * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={size}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        map={particleTexture}
      />
    </points>
  );
}
