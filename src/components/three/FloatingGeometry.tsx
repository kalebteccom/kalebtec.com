'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type GeometryType = 'box' | 'octahedron' | 'tetrahedron' | 'cross'

interface FloatingGeometryProps {
  position: [number, number, number]
  geometryType: GeometryType
  scale?: number
  rotationSpeed?: [number, number, number]
  bobSpeed?: number
  bobAmount?: number
  opacity?: number
  emissiveIntensity?: number
  color?: string
  edgeColor?: string
  edgeOpacity?: number
}

// Shared edge geometry cache keyed by geometry type
const edgeGeometryCache = new Map<string, THREE.EdgesGeometry>()

function getEdgesGeometry(type: string, baseGeometry: THREE.BufferGeometry): THREE.EdgesGeometry {
  if (!edgeGeometryCache.has(type)) {
    edgeGeometryCache.set(type, new THREE.EdgesGeometry(baseGeometry, 1))
  }
  return edgeGeometryCache.get(type)!
}

// Sub-component for single geometry with edge lines
function GeometryWithEdges({
  geometryType,
  color,
  opacity,
  emissiveIntensity,
  edgeColor,
  edgeOpacity,
}: {
  geometryType: Exclude<GeometryType, 'cross'>
  color: string
  opacity: number
  emissiveIntensity: number
  edgeColor: string
  edgeOpacity: number
}) {
  const baseGeometry = useMemo(() => {
    switch (geometryType) {
      case 'box':
        return new THREE.BoxGeometry(1, 1, 1)
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0)
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1, 0)
      default:
        return new THREE.OctahedronGeometry(1, 0)
    }
  }, [geometryType])

  const edgesGeometry = useMemo(
    () => getEdgesGeometry(geometryType, baseGeometry),
    [geometryType, baseGeometry]
  )

  return (
    <group>
      <mesh geometry={baseGeometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.7}
          metalness={0.8}
          side={THREE.FrontSide}
        />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={edgeOpacity}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}

// Cross geometry: 3 intersecting boxes
function CrossGeometry({
  color,
  opacity,
  emissiveIntensity,
  edgeColor,
  edgeOpacity,
}: {
  color: string
  opacity: number
  emissiveIntensity: number
  edgeColor: string
  edgeOpacity: number
}) {
  const armSize: [number, number, number] = [0.25, 1, 0.25]

  const boxGeom = useMemo(() => new THREE.BoxGeometry(...armSize), [])
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(boxGeom, 1), [boxGeom])

  const materialProps = useMemo(
    () => ({
      color,
      emissive: color,
      emissiveIntensity,
      transparent: true as const,
      opacity,
      roughness: 0.7,
      metalness: 0.8,
      side: THREE.FrontSide as THREE.Side,
    }),
    [color, emissiveIntensity, opacity]
  )

  const edgeMaterialProps = useMemo(
    () => ({
      color: edgeColor,
      transparent: true as const,
      opacity: edgeOpacity,
      linewidth: 1,
    }),
    [edgeColor, edgeOpacity]
  )

  return (
    <group>
      {/* Vertical arm */}
      <mesh geometry={boxGeom}>
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <lineSegments geometry={edgesGeom}>
        <lineBasicMaterial {...edgeMaterialProps} />
      </lineSegments>

      {/* Horizontal arm (X axis) */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <mesh geometry={boxGeom}>
          <meshStandardMaterial {...materialProps} />
        </mesh>
        <lineSegments geometry={edgesGeom}>
          <lineBasicMaterial {...edgeMaterialProps} />
        </lineSegments>
      </group>

      {/* Depth arm (Z axis) */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={boxGeom}>
          <meshStandardMaterial {...materialProps} />
        </mesh>
        <lineSegments geometry={edgesGeom}>
          <lineBasicMaterial {...edgeMaterialProps} />
        </lineSegments>
      </group>
    </group>
  )
}

export default function FloatingGeometry({
  position,
  geometryType,
  scale = 1,
  rotationSpeed = [0.006, 0.008, 0.004],
  bobSpeed = 1,
  bobAmount = 0.15,
  opacity = 0.7,
  emissiveIntensity = 0.4,
  color = '#8000FF',
  edgeColor = '#00ffff',
  edgeOpacity = 0.35,
}: FloatingGeometryProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [mounted, setMounted] = useState(false)
  const initialY = position[1]
  const timeOffset = useRef(Math.random() * Math.PI * 2)

  // Entrance animation state
  const entranceProgress = useRef(0)

  useFrame((state) => {
    if (!groupRef.current) return

    // Entrance animation: scale in over ~1.5 seconds
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + 0.012)
      const eased = easeOutCubic(entranceProgress.current)
      groupRef.current.scale.setScalar(scale * eased)

      if (!mounted && entranceProgress.current >= 1) {
        setMounted(true)
      }
    }

    const time = state.clock.elapsedTime

    // Rotation -- slightly faster and more mechanical
    groupRef.current.rotation.x += rotationSpeed[0]
    groupRef.current.rotation.y += rotationSpeed[1]
    groupRef.current.rotation.z += rotationSpeed[2]

    // Bobbing with sine wave
    groupRef.current.position.y =
      initialY + Math.sin(time * bobSpeed + timeOffset.current) * bobAmount

    // Subtle horizontal drift
    groupRef.current.position.x =
      position[0] + Math.sin(time * 0.3 + timeOffset.current) * 0.05

    // Mouse parallax -- gentle drift toward mouse
    const mouseX = state.pointer.x * 0.15
    const mouseY = state.pointer.y * 0.1
    groupRef.current.position.x += mouseX * (1 + position[2] * 0.1)
    groupRef.current.position.y += mouseY * (1 + position[2] * 0.1)
  })

  return (
    <group ref={groupRef} position={position} scale={0}>
      {geometryType === 'cross' ? (
        <CrossGeometry
          color={color}
          opacity={opacity}
          emissiveIntensity={emissiveIntensity}
          edgeColor={edgeColor}
          edgeOpacity={edgeOpacity}
        />
      ) : (
        <GeometryWithEdges
          geometryType={geometryType}
          color={color}
          opacity={opacity}
          emissiveIntensity={emissiveIntensity}
          edgeColor={edgeColor}
          edgeOpacity={edgeOpacity}
        />
      )}
    </group>
  )
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
