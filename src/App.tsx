import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Floor from "./components/Floor";
import Car from "./components/Car/Car";
import { BowlingPin } from "./components/bowlingPin/BowlingPin";
import { createBowlingPinPositions } from "./utils/index";
import { Tree } from "./components/tree";
import { Ball } from "./components/ball";
import { isStartScene } from "./utils/atom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { RoadSign } from "./components/roadSign";
import { Banner } from "./components/banner";
import { MotionStage } from "./components/motionStage";
import { PlayGround } from "./components/playground";
import { Knot } from "./components/knot";
import TextFont from "./components/textFont";

function App() {
  const isStart = useRecoilValue(isStartScene);

  useEffect(() => {
    console.log(isStart);
  }, [isStart]);

  const pinPositions = createBowlingPinPositions(4, 0.16);

  return (
    <Canvas camera={{ position: [3, 2, 4] }}>
      <ambientLight />
      <directionalLight position={[0, 5, 5]} />
      <Physics gravity={[0, -2.6, 0]}>
        <Debug>
          {isStart && <Car />}
          <Floor />
          <PlayGround />
          <TextFont />
          <RoadSign />
          <Knot
            args={[0.6, 0.07]}
            position={[-6, 1.5, 0.3]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <Banner />
          <MotionStage />
          <Tree position={[1, 0.5, -1]} />
          <Tree position={[-1, 0.5, -1]} />
          <Tree position={[3, 0.5, -1]} />
          <Tree position={[-3, 0.5, -1]} />

          <Tree position={[1, 0.5, 3]} />
          <Tree position={[-1, 0.5, 3]} />
          <Tree position={[3, 0.5, 3]} />
          <Tree position={[-3, 0.5, 3]} />
          <Ball position={[0, 0.2, 2]} />

          {pinPositions.map((position, index) => (
            <BowlingPin key={index} position={position} />
          ))}
        </Debug>
      </Physics>
    </Canvas>
  );
}

export default App;
