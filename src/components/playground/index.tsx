import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useTrimesh } from "@react-three/cannon";
import { TextureLoader } from "three";

export function PlayGround() {
  const { nodes, materials } = useGLTF(`/models/play_el.glb`);

  const matcapTexture = useMemo(() => {
    const textureLoader = new TextureLoader();
    const matcapTexture = textureLoader.load(`/images/matcap.jpg`);
    return matcapTexture;
  }, []);

  const [ref] = useTrimesh(
    () => ({
      args: [
        nodes.play.geometry.attributes.position.array,
        nodes.play.geometry.index.array,
      ],
      type: "Static",
      rotation: [0, Math.PI / 2, 0],
      position: [-4, 0, 0.5],
    }),
    useRef(null)
  );

  return (
    <mesh
      castShadow
      ref={ref}
      geometry={nodes.play.geometry}
      material={materials["Material.001"]}
    >
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}
