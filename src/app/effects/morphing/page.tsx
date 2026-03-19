"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import Link from "next/link";

// Generate positions for different geometries
function generatePositions(type: string, count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  switch (type) {
    case "sphere": {
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 2;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      break;
    }
    case "cube": {
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      break;
    }
    case "torus": {
      const R = 2, r = 0.7;
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        positions[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        positions[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
        positions[i * 3 + 2] = r * Math.sin(v);
      }
      break;
    }
    case "spiral": {
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 8;
        const radius = t * 2.5;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (t - 0.5) * 4;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      break;
    }
  }
  return positions;
}

const SHAPES = ["sphere", "cube", "torus", "spiral"] as const;
const SHAPE_LABELS: Record<string, string> = {
  sphere: "🔵 Sphere",
  cube: "🟧 Cube", 
  torus: "🟣 Torus",
  spiral: "🌀 Spiral",
};
const PARTICLE_COUNT = 5000;

function MorphingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [currentShape, setCurrentShape] = useState(0);
  const isAnimating = useRef(false);

  // Pre-generate all shape positions
  const shapePositions = useMemo(() => 
    SHAPES.map(shape => generatePositions(shape, PARTICLE_COUNT)),
  []);

  // Working positions (mutable, used for animation)
  const currentPositions = useMemo(() => {
    return new Float32Array(shapePositions[0]);
  }, [shapePositions]);

  // Colors
  const colors = useMemo(() => {
    const c = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      new THREE.Color("#818cf8"), // indigo
      new THREE.Color("#34d399"), // emerald
      new THREE.Color("#f472b6"), // pink
      new THREE.Color("#fbbf24"), // amber
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      c[i * 3] = color.r;
      c[i * 3 + 1] = color.g;
      c[i * 3 + 2] = color.b;
    }
    return c;
  }, []);

  // Morph to next shape
  const morphTo = (targetIdx: number) => {
    if (isAnimating.current || targetIdx === currentShape) return;
    isAnimating.current = true;

    const target = shapePositions[targetIdx];
    const obj = { t: 0 };
    const startPositions = new Float32Array(currentPositions);

    gsap.to(obj, {
      t: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
          currentPositions[i] = startPositions[i] + (target[i] - startPositions[i]) * obj.t;
        }
        if (pointsRef.current) {
          pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
      },
      onComplete: () => {
        setCurrentShape(targetIdx);
        isAnimating.current = false;
      },
    });
  };

  // Auto-rotate
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
    }
  });

  // Expose morphTo to parent
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__morphTo = morphTo;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function MorphingPage() {
  const [currentShape, setCurrentShape] = useState(0);

  const handleMorph = (idx: number) => {
    const morphTo = (window as unknown as Record<string, unknown>).__morphTo as ((n: number) => void) | undefined;
    if (morphTo) {
      morphTo(idx);
      setCurrentShape(idx);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800/60">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Back</Link>
        <h1 className="text-lg font-bold">🔮 3D Morphing</h1>
        <div className="w-16" />
      </header>

      {/* Canvas */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <MorphingParticles />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>

        {/* Shape buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {SHAPES.map((shape, idx) => (
            <button
              key={shape}
              onClick={() => handleMorph(idx)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentShape === idx
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {SHAPE_LABELS[shape]}
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="absolute top-4 right-4 text-xs text-gray-500">
          Drag to rotate • {PARTICLE_COUNT.toLocaleString()} particles
        </div>
      </div>
    </div>
  );
}
