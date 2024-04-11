import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { BoxProps, useBox } from "@react-three/cannon";
import { motion } from "framer-motion-3d";

type GLTFResult = GLTF & {
  nodes: {
    tree: THREE.Mesh;
  };
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial;
  };
};

useGLTF.preload("/tree.glb");

export function Tree(props: BoxProps) {
  const { nodes, materials } = useGLTF("models/tree.glb") as GLTFResult;
  const [info, setInfo] = useState(false);

  const [ref] = useBox(() => ({
    args: [0.3, 0.8, 0.3],
    type: "Static",
    onCollide: handleCollision,
    ...props,
  }));

  const handleCollision = (e: any) => {
    if (e.collisionFilters.bodyFilterGroup === 5) {
      setInfo(true);
    }
  };

  useEffect(() => {
    let timeout: number;
    if (info) {
      timeout = setTimeout(() => {
        setInfo(false);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [info]);

  return (
    <group ref={ref as React.MutableRefObject<THREE.Group>}>
      <motion.mesh
        animate={{ scale: [0, 0.2], y: [-1, 0] }}
        transition={{ delay: 1, duration: 0.3 }}
        scale={0.2}
        geometry={nodes.tree.geometry}
        material={materials["Material.003"]}
        position={[0, 0, 0]}
        rotation={[-1.555, 0, 0]}
      />
      {info ? (
        <Html center>
          <div className="information">이것은 나무입니다.</div>
        </Html>
      ) : null}
    </group>
  );
}
