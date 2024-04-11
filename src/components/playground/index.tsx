import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useTrimesh } from "@react-three/cannon";
import { Mesh, TextureLoader } from "three";

export function PlayGround() {
  const { nodes, materials } = useGLTF(`/models/play_el.glb`);

  const matcapTexture = useMemo(() => {
    const textureLoader = new TextureLoader();
    const matcapTexture = textureLoader.load(`/images/matcap.jpg`);
    return matcapTexture;
  }, []);

  const playMesh = nodes.play as Mesh;

  const [ref] = useTrimesh(
    () => ({
      args: [
        playMesh.geometry.attributes.position.array,
        playMesh.geometry.index !== null ? playMesh.geometry.index.array : [],
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
      // @ts-ignore I don't know the type.
      ref={ref}
      geometry={playMesh.geometry}
      material={materials["Material.001"]}
    >
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}
