import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { BoxProps, useBox } from "@react-three/cannon";

type GLTFResult = GLTF & {
  nodes: {
    mesh1890306098: THREE.Mesh;
    mesh1890306098_1: THREE.Mesh;
  };
  materials: {
    mat8: THREE.MeshStandardMaterial;
    mat21: THREE.MeshStandardMaterial;
  };
};

useGLTF.preload("/BowlingPin.glb");

export function BowlingPin(props: BoxProps) {
  const { nodes, materials } = useGLTF("models/BowlingPin.glb") as GLTFResult;

  const [ref] = useBox(
    () => ({
      mass: 1,
      args: [0.1, 0.3, 0.1],
      type: "Dynamic",
      ...props,
    }),
    useRef(null)
  );

  return (
    <group
      ref={ref as React.MutableRefObject<THREE.Group>}
      scale={[0.3, 0.3, 0.3]}
    >
      <mesh
        geometry={nodes.mesh1890306098.geometry}
        material={materials.mat8}
      />
      <mesh
        geometry={nodes.mesh1890306098_1.geometry}
        material={materials.mat21}
      />
    </group>
  );
}
