import { Debug, Physics } from "@react-three/cannon";
import Car from "../Car/Car";
import { Floor } from "../floor";
import { TextFont } from "../textFont";
import { PlayGround } from "../playground";
import { RoadSign } from "../roadSign";
import { Knot } from "../knot";
import { Banner } from "../banner";
import { MotionStage } from "../motionStage";
import { Tree } from "../tree";
import { BowlingPin } from "../bowlingPin";
import { useRecoilValue } from "recoil";
import { isStartScene } from "../../utils/atom";
import { createBowlingPinPositions } from "../../utils";
import { Ball } from "../ball";
import { Canvas } from "@react-three/fiber";

export function Ground() {
  const isStart = useRecoilValue(isStartScene);

  const pinPositions = createBowlingPinPositions(4, 0.16);

  return (
    <Canvas camera={{ position: [3, 2, 4] }}>
      <ambientLight />
      <directionalLight position={[0, 5, 5]} />
      <Physics gravity={[0, -2.6, 0]}>
        {isStart && <Car />}
        <Floor />
        <PlayGround />
        <TextFont />
        <RoadSign />
        <Knot />
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
      </Physics>
    </Canvas>
  );
}
