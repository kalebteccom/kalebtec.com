'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Monochrome 2-stop gradient — quiet ambient texture only.
// Light theme: cream → soft cream. Dark theme: ink → soft ink.
const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_isDark;

varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float time = u_time * 0.08;

  // Soft, slow noise field
  float n1 = snoise(uv * 1.6 + time * 0.4);
  float n2 = snoise(uv * 2.2 - time * 0.3 + 10.0);
  float blend = smoothstep(-0.3, 0.6, n1 * 0.6 + n2 * 0.3);

  // Gentle mouse warp
  float mouseDist = length(uv - u_mouse);
  float mouseInfluence = smoothstep(0.55, 0.0, mouseDist) * 0.18;
  blend += mouseInfluence;

  // --- LIGHT (cream paper) with soft brand-purple wash ---
  vec3 lightBase = vec3(0.898, 0.894, 0.847);   // #e5e4d8 paper
  vec3 lightLift = vec3(0.945, 0.941, 0.894);   // #f1f0e4 paper-soft
  vec3 lightAccent = vec3(0.85, 0.78, 0.95);    // soft lavender wash
  vec3 lightColor = mix(lightBase, lightLift, blend * 0.5);
  // Add a chromatic wash blob — visible but not loud
  float warmBlob = smoothstep(0.55, 0.0, length(uv - vec2(0.7, 0.55))) * 0.38;
  lightColor = mix(lightColor, lightAccent, warmBlob * blend);

  // --- DARK (ink) with deep brand-purple glow ---
  vec3 darkBase = vec3(0.031, 0.059, 0.067);    // #080f11 ink
  vec3 darkLift = vec3(0.082, 0.106, 0.125);    // #151b20 ink-soft
  vec3 darkAccent = vec3(0.30, 0.10, 0.55);     // deep violet
  vec3 darkColor = mix(darkBase, darkLift, blend * 0.55);
  // Glow blob in dark theme
  float deepBlob = smoothstep(0.5, 0.0, length(uv - vec2(0.7, 0.55))) * 0.45;
  darkColor = mix(darkColor, darkAccent, deepBlob * blend);

  vec3 color = mix(lightColor, darkColor, u_isDark);

  // Subtle vignette
  float vignetteDist = length(uv - 0.5) * 2.0;
  float vignette = mix(
    smoothstep(2.0, 0.4, vignetteDist) * 0.1 + 0.9,
    smoothstep(1.6, 0.4, vignetteDist) * 0.4 + 0.6,
    u_isDark
  );
  color *= vignette;

  // Whisper of grain for paper feel
  float grain = snoise(uv * 240.0 + u_time * 0.4) * 0.006;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
`;

interface MeshGradientProps {
  isDark: boolean;
}

export default function MeshGradient({ isDark }: MeshGradientProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetIsDark = useRef(isDark ? 1.0 : 0.0);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1920, 1080) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_isDark: { value: isDark ? 1.0 : 0.0 },
    }),
    [],
  );

  targetIsDark.current = isDark ? 1.0 : 0.0;

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.u_time.value = state.clock.elapsedTime;

    const current = material.uniforms.u_isDark.value;
    material.uniforms.u_isDark.value += (targetIsDark.current - current) * 0.04;

    const target = new THREE.Vector2((state.pointer.x + 1) * 0.5, (state.pointer.y + 1) * 0.5);
    material.uniforms.u_mouse.value.lerp(target, 0.02);

    material.uniforms.u_resolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
  });

  return (
    <mesh ref={meshRef} renderOrder={-1000}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
