import { useTrimesh } from "@react-three/cannon";
import { useMemo } from "react";
import { TextureLoader, TorusGeometry } from "three";

export function Knot() {
  const args: [number, number, number?, number?, number?] = [0.6, 0.07];
  const geometry = useMemo(() => new TorusGeometry(...args), args);

  const matcapTexture = useMemo(() => {
    const textureLoader = new TextureLoader();
    return textureLoader.load(`/images/matcap.jpg`);
  }, []);

  const physicsProps = useMemo(
    () => ({
      args: [geometry.attributes.position.array, geometry.index!.array],
      material: "ring",
      position: [-6, 1.5, 0.3],
      rotation: [0, Math.PI / 2, 0],
    }),
    [geometry]
  );
  // @ts-ignore I don't know the type.
  const [ref] = useTrimesh(() => physicsProps);

  return (
    // @ts-ignore I don't know the type.
    <mesh ref={ref} castShadow>
      <torusGeometry args={args} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}
