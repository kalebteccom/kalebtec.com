'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A GLSL shader grid that scrolls infinitely -- cyberpunk style
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float u_time;
uniform vec3 u_color;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 uv = vUv * 40.0; // grid density
  uv.y += u_time * 0.5; // scroll

  // Grid lines
  vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
  float line = min(grid.x, grid.y);
  float gridAlpha = 1.0 - min(line, 1.0);

  // Fade with distance (perspective fade)
  float distFade = smoothstep(1.0, 0.0, vUv.y);

  // Fade edges
  float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);

  float alpha = gridAlpha * distFade * edgeFade * 0.3;

  gl_FragColor = vec4(u_color, alpha);
}
`

export default function GridFloor() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_color: { value: new THREE.Color('#8000FF') },
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    mat.uniforms.u_time.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -3]}>
      <planeGeometry args={[20, 15, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
