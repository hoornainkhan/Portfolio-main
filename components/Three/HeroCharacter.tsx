'use client'
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const MODEL_URL = "/hoornain.glb";
const MODEL_SCALE = 100;



export default function HeroCharacter() {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    console.log("Available animations:", names);
     const idleAction = actions["waving"];

  if (!idleAction) return;

  idleAction.reset().fadeIn(0.5).play();

  return () => {
    idleAction.fadeOut(0.5).stop();
    };
  }, [actions, names]);

  return (
    <Center>
      <group ref={groupRef} scale={MODEL_SCALE}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

useGLTF.preload(MODEL_URL);