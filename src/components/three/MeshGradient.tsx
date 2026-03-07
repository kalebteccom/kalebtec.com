'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_isDark;

varying vec2 vUv;

// Simplex noise functions for smooth organic movement
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
  float time = u_time * 0.15;

  // Multiple octaves of noise for organic movement
  float n1 = snoise(uv * 2.0 + time * 0.5);
  float n2 = snoise(uv * 3.0 - time * 0.3 + 10.0);
  float n3 = snoise(uv * 1.5 + time * 0.2 + vec2(n1, n2) * 0.3);
  float n4 = snoise(uv * 4.0 - time * 0.4 + 20.0);

  // Mouse influence -- subtle warp
  vec2 mouseOffset = (u_mouse - 0.5) * 0.1;
  float mouseDist = length(uv - u_mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;

  // Create flowing gradient regions
  float blend1 = smoothstep(-0.3, 0.6, n1 + n3 * 0.5 + mouseInfluence);
  float blend2 = smoothstep(-0.2, 0.7, n2 + n4 * 0.3);
  float blend3 = smoothstep(-0.4, 0.5, n3);

  // --- DARK MODE palette ---
  vec3 deepBlack = vec3(0.035, 0.035, 0.06);
  vec3 darkPurple = vec3(0.15, 0.0, 0.35);
  vec3 brandPurple = vec3(0.5, 0.0, 1.0);
  vec3 cyan = vec3(0.0, 0.8, 0.9);
  vec3 magenta = vec3(0.6, 0.0, 0.5);
  vec3 darkCyan = vec3(0.0, 0.15, 0.2);

  vec3 darkColor = deepBlack;
  darkColor = mix(darkColor, darkPurple, blend1 * 0.7);
  darkColor = mix(darkColor, brandPurple, blend1 * blend2 * 0.3);
  darkColor = mix(darkColor, darkCyan, blend2 * (1.0 - blend1) * 0.5);
  darkColor = mix(darkColor, cyan, blend2 * blend3 * 0.15);
  darkColor = mix(darkColor, magenta, blend3 * (1.0 - blend2) * 0.2);

  // --- LIGHT MODE palette — harsh daylight neon, cool gray base ---
  vec3 lightBase = vec3(0.875, 0.878, 0.918);        // #dfe0ea — cool steel
  vec3 lightWash = vec3(0.84, 0.84, 0.90);           // darker steel for depth
  vec3 lightPurple = vec3(0.55, 0.25, 0.95);         // vivid purple burn-in
  vec3 lightCyan = vec3(0.2, 0.75, 0.82);            // electric teal
  vec3 lightViolet = vec3(0.65, 0.45, 0.88);         // mid violet
  vec3 lightMagenta = vec3(0.7, 0.3, 0.65);          // hot magenta

  vec3 lightColor = lightBase;
  lightColor = mix(lightColor, lightWash, blend1 * 0.35);
  lightColor = mix(lightColor, lightViolet, blend1 * blend2 * 0.3);
  lightColor = mix(lightColor, lightPurple, blend2 * blend3 * 0.2);
  lightColor = mix(lightColor, lightCyan, blend2 * (1.0 - blend1) * 0.25);
  lightColor = mix(lightColor, lightMagenta, blend3 * (1.0 - blend2) * 0.15);

  // --- MIX based on theme ---
  vec3 color = mix(lightColor, darkColor, u_isDark);

  // Add subtle vignette — strong in dark mode, minimal in light mode
  float vignetteDist = length(uv - 0.5) * 2.0;
  float darkVignette = smoothstep(1.5, 0.5, vignetteDist) * 0.8 + 0.2;
  float lightVignette = smoothstep(1.8, 0.3, vignetteDist) * 0.15 + 0.85;
  float vignette = mix(lightVignette, darkVignette, u_isDark);
  color *= vignette;

  // Subtle scanline effect (reduced in light mode)
  float scanlineStrength = mix(0.01, 0.02, u_isDark);
  float scanline = sin(uv.y * u_resolution.y * 1.5) * scanlineStrength + 1.0;
  color *= scanline;

  // Very subtle noise grain for texture (reduced in light mode)
  float grainStrength = mix(0.008, 0.015, u_isDark);
  float grain = snoise(uv * 200.0 + u_time) * grainStrength;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
`

interface MeshGradientProps {
  isDark: boolean
}

export default function MeshGradient({ isDark }: MeshGradientProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetIsDark = useRef(isDark ? 1.0 : 0.0)

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1920, 1080) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_isDark: { value: isDark ? 1.0 : 0.0 },
  }), [])

  // Update target when prop changes
  targetIsDark.current = isDark ? 1.0 : 0.0

  useFrame((state) => {
    if (!meshRef.current) return
    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.u_time.value = state.clock.elapsedTime

    // Smooth transition between themes
    const current = material.uniforms.u_isDark.value
    material.uniforms.u_isDark.value += (targetIsDark.current - current) * 0.04

    // Smooth mouse tracking
    const target = new THREE.Vector2(
      (state.pointer.x + 1) * 0.5,
      (state.pointer.y + 1) * 0.5
    )
    material.uniforms.u_mouse.value.lerp(target, 0.02)

    // Update resolution
    material.uniforms.u_resolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr
    )
  })

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
  )
}
