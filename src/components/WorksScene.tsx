"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createSpherePoints } from "@/lib/sphere-points";

function Cloud({ count = 3500 }) {
  const [points, setPoints] = useState<Float32Array | null>(null);

  useEffect(() => {
    setPoints(createSpherePoints(count, 5));
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.08;
    ref.current.rotation.z = time * 0.04;
    const s = 1 + Math.sin(time * 0.3) * 0.1;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group>
      {points && (
        <>
          <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color="#00BFFF"
              size={0.015}
              sizeAttenuation={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              opacity={0.6}
            />
          </Points>
          {/* Second Colorful Layer */}
          <Points positions={points.slice(0, 1000 * 3)} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color="#FF00FF"
              size={0.02}
              sizeAttenuation={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              opacity={0.3}
            />
          </Points>
        </>
      )}
    </group>
  );
}

function MagneticField() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    
    useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 3.5), 0.05);
        camera.lookAt(0, 0, 0);
    });
    return null;
}

export default function WorksScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#ffffff]">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <Suspense fallback={null}>
            <fog attach="fog" args={["#ffffff", 2, 8]} />
            <Cloud count={3500} />
            <MagneticField />
            <ambientLight intensity={0.7} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff]/20 via-[#ffffff]/40 to-[#ffffff]" />
    </div>
  );
}
