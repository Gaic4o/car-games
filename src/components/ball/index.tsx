import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { SphereProps, useSphere } from "@react-three/cannon";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    ["Icosphere_Icosphere006-Mesh"]: THREE.Mesh;
    ["Icosphere_Icosphere006-Mesh_1"]: THREE.Mesh;
  };
  materials: {
    white: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
  };
};

useGLTF.preload("/soccerBall.glb");

export function Ball(props: SphereProps) {
  const { nodes, materials } = useGLTF("models/soccerBall.glb") as GLTFResult;

  const [ref] = useSphere(
    () => ({
      args: [0.15],
      mass: 5,
      ...props,
    }),
    useRef(null)
  );

  return (
    <group ref={ref as React.MutableRefObject<THREE.Group>}>
      <group scale={0.16} position={[0, 0, 0]}>
        <mesh
          geometry={nodes["Icosphere_Icosphere006-Mesh"].geometry}
          material={materials.white}
        />
        <mesh
          geometry={nodes["Icosphere_Icosphere006-Mesh_1"].geometry}
          material={materials.black}
        />
      </group>
    </group>
  );
}
