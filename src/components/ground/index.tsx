import { Physics } from "@react-three/cannon";
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
import { Canvas } from "@react-three/fiber";
import { Ball } from "../ball";
import { Car } from "../car";

function Trees() {
  return (
    <>
      <Tree position={[1, 0.5, -1]} />
      <Tree position={[-1, 0.5, -1]} />
      <Tree position={[3, 0.5, -1]} />
      <Tree position={[-3, 0.5, -1]} />

      <Tree position={[1, 0.5, 3]} />
      <Tree position={[-1, 0.5, 3]} />
      <Tree position={[3, 0.5, 3]} />
      <Tree position={[-3, 0.5, 3]} />
      <Ball position={[0, 0.2, 2]} />
    </>
  );
}

function BowlingPins() {
  const pinPositions = createBowlingPinPositions(4, 0.16);
  return (
    <>
      {pinPositions.map((position, index) => (
        <BowlingPin key={index} position={position} />
      ))}
    </>
  );
}

function RenderCar() {
  const isStart = useRecoilValue(isStartScene);
  return isStart ? <Car /> : null;
}

export function Ground() {
  return (
    <Canvas camera={{ position: [3, 2, 4] }}>
      <ambientLight />
      <directionalLight position={[0, 5, 5]} />
      <Physics gravity={[0, -2.6, 0]}>
        <RenderCar />
        <Floor />
        <PlayGround />
        <TextFont />
        <RoadSign />
        <Knot />
        <Banner />
        <MotionStage />
        <Trees />
        <BowlingPins />
      </Physics>
    </Canvas>
  );
}
