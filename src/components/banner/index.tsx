import { useBox } from "@react-three/cannon";
import { Html, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";

type CollisionEventHandler = () => void;
type HistoryHandler = () => void;

export function Banner() {
  const texture = useTexture(`/images/banner.png`);
  const [info, setInfo] = useState(false);

  const onHandleHistory: HistoryHandler = () => {
    const url = "https://minsu-dev.vercel.app/";
    window.open(url, "_blank");
  };

  const handleCollision: CollisionEventHandler = () => {
    setInfo(true);
  };

  useEffect(() => {
    let timeout: number;
    if (info) {
      timeout = setTimeout(() => setInfo(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [info]);

  const [ref] = useBox(() => ({
    isTrigger: false,
    mass: 1,
    args: [5, 2, 2],
    position: [1, 1, -5],
    type: "Static",
    onCollide: handleCollision,
  }));

  return (
    // @ts-ignore I don't know the type.
    <mesh ref={ref} castShadow onClick={onHandleHistory}>
      <boxGeometry args={[5, 2, 2]} />
      <meshStandardMaterial map={texture} transparent />
      {info ? (
        <Html center>
          <div className="information">마우스로 클릭 해보세요!</div>
        </Html>
      ) : null}
    </mesh>
  );
}
