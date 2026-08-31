const AMBIENT_INTENSITY = 0.6;
const DIRECTIONAL_INTENSITY = 1.2;
const HEMISPHERE_INTENSITY = 0.5;

const DIRECTIONAL_POSITION: [number, number, number] = [4, 6, 3];
const DIRECTIONAL_TARGET: [number, number, number] = [0, 1.4, 0];

export default function Lights() {
  return (
    <>
      <ambientLight intensity={AMBIENT_INTENSITY} />

      <directionalLight
        position={DIRECTIONAL_POSITION}
        intensity={DIRECTIONAL_INTENSITY}
        target-position={DIRECTIONAL_TARGET}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      <hemisphereLight
        intensity={HEMISPHERE_INTENSITY}
        color="#ffffff"
        groundColor="#d9c9a3"
      />
    </>
  );
}