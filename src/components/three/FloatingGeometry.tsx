'use client';

import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

export type GeometryType = 'box' | 'octahedron' | 'tetrahedron' | 'cross';

interface FloatingGeometryProps {
  position: [number, number, number];
  geometryType: GeometryType;
  scale?: number;
  rotationSpeed?: [number, number, number];
  bobSpeed?: number;
  bobAmount?: number;
  opacity?: number;
  emissiveIntensity?: number;
  color?: string;
  edgeColor?: string;
  edgeOpacity?: number;
  metalness?: number;
  roughness?: number;
  draggable?: boolean;
}

// Shared edge geometry cache keyed by geometry type
const edgeGeometryCache = new Map<string, THREE.EdgesGeometry>();

function getEdgesGeometry(type: string, baseGeometry: THREE.BufferGeometry): THREE.EdgesGeometry {
  if (!edgeGeometryCache.has(type)) {
    edgeGeometryCache.set(type, new THREE.EdgesGeometry(baseGeometry, 1));
  }
  return edgeGeometryCache.get(type)!;
}

// Sub-component for single geometry with edge lines
function GeometryWithEdges({
  geometryType,
  color,
  opacity,
  emissiveIntensity,
  edgeColor,
  edgeOpacity,
  metalness,
  roughness,
}: {
  geometryType: Exclude<GeometryType, 'cross'>;
  color: string;
  opacity: number;
  emissiveIntensity: number;
  edgeColor: string;
  edgeOpacity: number;
  metalness: number;
  roughness: number;
}) {
  const baseGeometry = useMemo(() => {
    switch (geometryType) {
      case 'box':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1, 0);
      default:
        return new THREE.OctahedronGeometry(1, 0);
    }
  }, [geometryType]);

  const edgesGeometry = useMemo(
    () => getEdgesGeometry(geometryType, baseGeometry),
    [geometryType, baseGeometry],
  );

  return (
    <group>
      <mesh geometry={baseGeometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={roughness}
          metalness={metalness}
          side={THREE.FrontSide}
        />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={edgeColor} transparent opacity={edgeOpacity} linewidth={1} />
      </lineSegments>
    </group>
  );
}

// Cross geometry: 3 intersecting boxes
function CrossGeometry({
  color,
  opacity,
  emissiveIntensity,
  edgeColor,
  edgeOpacity,
  metalness,
  roughness,
}: {
  color: string;
  opacity: number;
  emissiveIntensity: number;
  edgeColor: string;
  edgeOpacity: number;
  metalness: number;
  roughness: number;
}) {
  const armSize: [number, number, number] = [0.25, 1, 0.25];

  const boxGeom = useMemo(() => new THREE.BoxGeometry(...armSize), []);
  const edgesGeom = useMemo(() => new THREE.EdgesGeometry(boxGeom, 1), [boxGeom]);

  const materialProps = useMemo(
    () => ({
      color,
      emissive: color,
      emissiveIntensity,
      transparent: true as const,
      opacity,
      roughness,
      metalness,
      side: THREE.FrontSide as THREE.Side,
    }),
    [color, emissiveIntensity, opacity, roughness, metalness],
  );

  const edgeMaterialProps = useMemo(
    () => ({
      color: edgeColor,
      transparent: true as const,
      opacity: edgeOpacity,
      linewidth: 1,
    }),
    [edgeColor, edgeOpacity],
  );

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
  );
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
  metalness = 0.8,
  roughness = 0.7,
  draggable = false,
}: FloatingGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeOffset = useRef(Math.random() * Math.PI * 2);
  const { camera, gl } = useThree();

  // Entrance animation state
  const entranceProgress = useRef(0);

  // Persistent home position — updated when drag ends so geometry stays put
  const homePosition = useRef(new THREE.Vector3(position[0], position[1], position[2]));

  // All drag state lives in refs — never in React state — so window listener
  // identities are stable and never get torn down mid-drag.
  const isDraggingRef = useRef(false);
  const dragPlane = useRef(new THREE.Plane());
  const dragOffset = useRef(new THREE.Vector3());
  const dragTarget = useRef(new THREE.Vector3(position[0], position[1], position[2]));

  // Store camera/gl in refs so handlers can access them without dependencies
  const cameraRef = useRef(camera);
  const glRef = useRef(gl);
  cameraRef.current = camera;
  glRef.current = gl;

  // Glow intensity for drag feedback
  const glowIntensity = useRef(0);

  // --- Stable window handlers (zero dependencies, use only refs) ---

  const handleWindowPointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current) return;

    const canvas = glRef.current.domElement;
    const rect = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, cameraRef.current);
    const intersection = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(dragPlane.current, intersection)) {
      dragTarget.current.copy(intersection).add(dragOffset.current);
    }
  }, []); // empty deps — reads everything from refs

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current || !groupRef.current) return;

    isDraggingRef.current = false;
    homePosition.current.copy(groupRef.current.position);
    glRef.current.domElement.style.cursor = '';

    window.removeEventListener('pointermove', handleWindowPointerMove);
    window.removeEventListener('pointerdown', handleWindowRelease);
  }, [handleWindowPointerMove]); // handleWindowPointerMove is stable ([] deps)

  // Second click/pointerdown anywhere → release
  const handleWindowRelease = useCallback(
    (e: PointerEvent) => {
      // Ignore the initial pointerdown that started the drag — we skip that
      // via the setTimeout in startDrag. Any subsequent pointerdown releases.
      e.stopPropagation();
      endDrag();
    },
    [endDrag],
  );

  // Start drag — triggered by pointerDown on the hit sphere
  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!draggable || !groupRef.current) return;
      e.stopPropagation();

      // If already dragging, this click on the geometry should release
      if (isDraggingRef.current) {
        endDrag();
        return;
      }

      isDraggingRef.current = true;

      // Set up drag plane perpendicular to camera at the object's current position
      const camDir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(camDir);
      dragPlane.current.setFromNormalAndCoplanarPoint(
        camDir.negate(),
        groupRef.current.position,
      );

      // Calculate offset so geometry doesn't jump to cursor
      const canvas = glRef.current.domElement;
      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.nativeEvent.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.nativeEvent.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, cameraRef.current);
      const intersection = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(dragPlane.current, intersection)) {
        dragOffset.current.subVectors(groupRef.current.position, intersection);
      }

      // Start tracking cursor globally
      window.addEventListener('pointermove', handleWindowPointerMove);

      // Delay registering the release handler so the current pointerdown
      // event doesn't immediately trigger it
      requestAnimationFrame(() => {
        if (isDraggingRef.current) {
          window.addEventListener('pointerdown', handleWindowRelease);
        }
      });
    },
    [draggable, endDrag, handleWindowPointerMove, handleWindowRelease],
  );

  // Clean up on unmount — stable references so this only runs on unmount
  useEffect(() => {
    const moveFn = handleWindowPointerMove;
    const releaseFn = handleWindowRelease;
    return () => {
      window.removeEventListener('pointermove', moveFn);
      window.removeEventListener('pointerdown', releaseFn);
    };
  }, [handleWindowPointerMove, handleWindowRelease]);

  const handlePointerOver = useCallback(() => {
    if (draggable && !isDraggingRef.current) {
      setIsHovered(true);
      glRef.current.domElement.style.cursor = 'grab';
    }
  }, [draggable]);

  const handlePointerOut = useCallback(() => {
    if (draggable && !isDraggingRef.current) {
      setIsHovered(false);
      glRef.current.domElement.style.cursor = '';
    }
  }, [draggable]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Entrance animation: scale in over ~1.5 seconds
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + 0.012);
      const eased = easeOutCubic(entranceProgress.current);
      groupRef.current.scale.setScalar(scale * eased);

      if (!mounted && entranceProgress.current >= 1) {
        setMounted(true);
      }
    }

    const time = state.clock.elapsedTime;

    // Glow intensity — smoothly animate toward target
    const targetGlow = isDraggingRef.current ? 1 : isHovered ? 0.5 : 0;
    glowIntensity.current += (targetGlow - glowIntensity.current) * 0.08;

    if (isDraggingRef.current) {
      // While dragging: lerp toward drag target for smooth following
      groupRef.current.position.lerp(dragTarget.current, 0.25);

      // Spin faster while dragging
      groupRef.current.rotation.x += rotationSpeed[0] * 3;
      groupRef.current.rotation.y += rotationSpeed[1] * 3;
      groupRef.current.rotation.z += rotationSpeed[2] * 3;

      // Scale up slightly
      const dragScale = scale * 1.15;
      groupRef.current.scale.lerp(
        new THREE.Vector3(dragScale, dragScale, dragScale),
        0.1,
      );

      glRef.current.domElement.style.cursor = 'grabbing';
    } else {
      // Floating behavior — orbit around homePosition (persists after drag)
      const home = homePosition.current;

      const orbitX =
        home.x +
        Math.sin(time * 0.3 + timeOffset.current) * 0.05 +
        state.pointer.x * 0.15 * (1 + position[2] * 0.1);
      const orbitY =
        home.y +
        Math.sin(time * bobSpeed + timeOffset.current) * bobAmount +
        state.pointer.y * 0.1 * (1 + position[2] * 0.1);
      const orbitZ = home.z;

      // Smoothly lerp to orbit position (handles transition from drag-end)
      groupRef.current.position.x += (orbitX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (orbitY - groupRef.current.position.y) * 0.05;
      groupRef.current.position.z += (orbitZ - groupRef.current.position.z) * 0.05;

      // Normal rotation
      groupRef.current.rotation.x += rotationSpeed[0];
      groupRef.current.rotation.y += rotationSpeed[1];
      groupRef.current.rotation.z += rotationSpeed[2];

      // Return to normal scale
      groupRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.08,
      );
    }
  });

  // Compute boosted emissive for hover/drag feedback
  const boostedEmissive = emissiveIntensity + glowIntensity.current * 0.8;
  const boostedEdgeOpacity = Math.min(1, edgeOpacity + glowIntensity.current * 0.4);

  // Invisible hit sphere for easier pointer interaction
  const hitRadius = scale * 1.2;

  return (
    <group ref={groupRef} position={position} scale={0}>
      {/* Invisible hit area — only for initiating drag + hover cursor */}
      {draggable && (
        <mesh
          onPointerDown={handlePointerDown}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[hitRadius, 8, 8]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}

      {geometryType === 'cross' ? (
        <CrossGeometry
          color={color}
          opacity={opacity}
          emissiveIntensity={boostedEmissive}
          edgeColor={edgeColor}
          edgeOpacity={boostedEdgeOpacity}
          metalness={metalness}
          roughness={roughness}
        />
      ) : (
        <GeometryWithEdges
          geometryType={geometryType}
          color={color}
          opacity={opacity}
          emissiveIntensity={boostedEmissive}
          edgeColor={edgeColor}
          edgeOpacity={boostedEdgeOpacity}
          metalness={metalness}
          roughness={roughness}
        />
      )}
    </group>
  );
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
