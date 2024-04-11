import { usePlane } from "@react-three/cannon";
import { useRef } from "react";

export function Floor() {
  const meshRef = useRef(null);

  usePlane(
    () => ({
      args: [15, 15],
      mass: 1,
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
    }),
    meshRef
  );

  return (
    <mesh ref={meshRef} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
}
