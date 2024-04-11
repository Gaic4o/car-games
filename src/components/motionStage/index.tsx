import { useBox } from "@react-three/cannon";
import { Html, useGLTF, useTexture } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import { stage1 } from "../../utils/atom";
import Picture from "../picture";
import { useEffect, useState } from "react";

useGLTF.preload(`/popup.glb`);

export const MotionStage = () => {
  const [info, setInfo] = useState(false);
  const texture = useTexture(`images/github.png`);
  const [ref] = useBox(() => ({
    args: [1, 1, 0.3],
    position: [-3, 0.55, -4],
    onCollide: handleCollision,
    type: "Static",
    mass: 5,
  }));

  const onHandleHistory = () => {
    const url = "https://github.com/Gaic4o";
    window.open(url, "_blank");
  };

  const handleCollision = (e: any) => {
    console.log(e, "이벤트");
    if (e.collisionFilters.bodyFilterGroup === 5) {
      setInfo(true);
    }
  };

  useEffect(() => {
    let timeout: number;
    if (info) {
      timeout = setTimeout(() => setInfo(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [info]);

  const { nodes, materials } = useGLTF(`/models/popup.glb`);

  return (
    <group ref={ref} scale={0.3} onClick={onHandleHistory}>
      <mesh
        castShadow
        geometry={nodes.body.geometry}
        material={materials.Material}
        position={[0.004, 0.15, 0.065]}
        scale={[1.957, -1.036, 0.135]}
      />
      <Picture nodes={nodes} texture={texture} />

      {info ? (
        <Html center>
          <div className="information">클릭해보세요.</div>
        </Html>
      ) : null}
    </group>
  );
};
