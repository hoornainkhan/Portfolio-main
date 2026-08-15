"use client";

import { useGLTF, Center } from "@react-three/drei";

interface StaticModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
   rotation?: [number, number, number];
  // If true (default) the model is centered using <Center /> from drei.
  // Set to false when you need to position the model by its local origin.
  center?: boolean;
}

export default function StaticModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  center = true,
}: StaticModelProps) {
  const { scene } = useGLTF(url);

  if (center) {
    return (
      <Center bottom>
        <group position={position} scale={scale}  rotation={rotation}>
          <primitive object={scene} />
        </group>
      </Center>
    );
  }

  return (
    <group position={position} scale={scale}  rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}