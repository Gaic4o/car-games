import { useBox } from "@react-three/cannon";
import { Html, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";

export function Banner() {
  const texture = useTexture(`/images/banner.png`);
  const [info, setInfo] = useState(false);
  const [ref] = useBox(() => ({
    isTrigger: false,
    mass: 1,
    args: [5, 2, 2],
    position: [1, 1, -5],
    type: "Static",
    onCollide: handleCollision,
  }));

  const onHandleHistory = () => {
    const url = "https://minsu-dev.vercel.app/";
    window.open(url, "_blank");
  };

  const handleCollision = () => {
    setInfo(true);
  };

  useEffect(() => {
    let timeout: number;
    if (info) {
      timeout = setTimeout(() => setInfo(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [info]);

  return (
    <mesh ref={ref as any} castShadow onClick={onHandleHistory}>
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
