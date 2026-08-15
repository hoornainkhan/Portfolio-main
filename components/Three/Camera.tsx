import { PerspectiveCamera } from "@react-three/drei";

const CAMERA_POSITION: [number, number, number] = [0, 1.6, 5.2];
const CAMERA_FOV = 35;
const CAMERA_LOOK_AT: [number, number, number] = [0, 1.4, 0];

export default function Camera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={CAMERA_POSITION}
      fov={CAMERA_FOV}
      near={0.1}
      far={100}
      onUpdate={(camera) => camera.lookAt(...CAMERA_LOOK_AT)}
    />
  );
}
