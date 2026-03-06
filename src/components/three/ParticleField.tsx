'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  radius?: number
  color?: string
  size?: number
}

export default function ParticleField({
  count = 300,
  radius = 6,
  color = '#8000FF',
  size = 0.02,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const entranceProgress = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const actualCount = isMobile ? Math.floor(count * 0.5) : count

  // Generate particle positions in a sphere
  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(actualCount * 3)
    const vel = new Float32Array(actualCount * 3)
    const pha = new Float32Array(actualCount)

    for (let i = 0; i < actualCount; i++) {
      // Distribute in a sphere using spherical coordinates
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * Math.cbrt(Math.random()) // cube root for uniform volume distribution

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      // Random slow drift velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002

      // Random phase offset for twinkle
      pha[i] = Math.random() * Math.PI * 2
    }

    return { positions: pos, velocities: vel, phases: pha }
  }, [actualCount, radius])

  // Custom sizes for twinkle effect
  const sizes = useMemo(() => {
    const s = new Float32Array(actualCount)
    for (let i = 0; i < actualCount; i++) {
      s[i] = size * (0.5 + Math.random() * 1.0)
    }
    return s
  }, [actualCount, size])

  useFrame((state) => {
    if (!pointsRef.current) return

    const geometry = pointsRef.current.geometry
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    const sizeAttr = geometry.getAttribute('size') as THREE.BufferAttribute
    const time = state.clock.elapsedTime

    // Entrance fade
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + 0.008)
    }
    const material = pointsRef.current.material as THREE.PointsMaterial
    material.opacity = entranceProgress.current * 0.8

    // Animate positions and sizes
    for (let i = 0; i < actualCount; i++) {
      // Drift
      posAttr.array[i * 3] += velocities[i * 3]
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1]
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2]

      // Wrap around if too far from center
      const x = posAttr.array[i * 3]
      const y = posAttr.array[i * 3 + 1]
      const z = posAttr.array[i * 3 + 2]
      const dist = Math.sqrt(x * x + y * y + z * z)

      if (dist > radius * 1.2) {
        // Reset to opposite side
        posAttr.array[i * 3] *= -0.5
        posAttr.array[i * 3 + 1] *= -0.5
        posAttr.array[i * 3 + 2] *= -0.5
      }

      // Twinkle: modulate size with sine
      const twinkle = 0.6 + 0.4 * Math.sin(time * 1.5 + phases[i])
      sizeAttr.array[i] = sizes[i] * twinkle
    }

    posAttr.needsUpdate = true
    sizeAttr.needsUpdate = true

    // Subtle mouse parallax on the whole particle group
    const mouseX = state.pointer.x * 0.08
    const mouseY = state.pointer.y * 0.05
    pointsRef.current.rotation.y = mouseX * 0.3
    pointsRef.current.rotation.x = mouseY * 0.2
  })

  // Custom shader material for round, glowing particles
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.2)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={particleTexture}
      />
    </points>
  )
}
