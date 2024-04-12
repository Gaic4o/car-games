import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";
import { motion } from "framer-motion-3d";

export function RoadSign() {
  const { nodes, materials } = useGLTF(`models/road_sign.glb`);
  const [active, setActive] = useState(false);
  const [ref] = useCylinder(
    () => ({
      args: [0.1, 0.1, 1, 8],
      type: "Static",
      mass: 1,
      position: [2, 0.46, 2.5],
      onCollide: handleCollision,
    }),
    useRef(null)
  );
  // @ts-ignore I don't know the type.
  const handleCollision = (e) => {
    if (e.collisionFilters.bodyFilterGroup === 5) {
      setActive(true);
    }
  };

  useEffect(() => {
    let time: number;
    if (active) {
      time = setTimeout(() => setActive(false), 1500);
    }
    return () => clearTimeout(time);
  }, [active]);

  return (
    // @ts-ignore I don't know the type.
    <group ref={ref}>
      <mesh
        castShadow
        position={[0, -0.45, 0]}
        scale={0.2}
        // @ts-ignore I don't know the type.
        geometry={nodes.Object_1_1.geometry}
        material={materials.Wood}
      />
      <motion.group
        scale={0.2}
        position={[0, -0.48, 0]}
        animate={active ? { rotateY: 4 } : { rotateY: -1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <mesh
          castShadow
          // @ts-ignore I don't know the type.
          geometry={nodes.Object_1.geometry}
          material={materials["WoodLight.001"]}
        />
        <mesh
          castShadow
          // @ts-ignore I don't know the type.
          geometry={nodes.Object_1_2.geometry}
          material={materials["WoodLight.002"]}
        />
        <mesh
          castShadow
          // @ts-ignore I don't know the type.
          geometry={nodes.Object_1_3.geometry}
          material={materials["WoodLight.003"]}
        />
      </motion.group>
    </group>
  );
}
