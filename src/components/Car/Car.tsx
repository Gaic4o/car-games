import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useRef } from "react";
import DummyWheel from "./DummyWheel";
import DummyCarBody from "./DummyCarBody";
import { useVehicleControls } from "../../hooks/useVehicleControls";
import { useVehicleWheelConfigurations } from "../../hooks/useVehicleWheelConfigurations";
import { Group, Vector3 } from "three";
import useCameraFollower from "../../hooks/useCameraFollower";
import { useFrame } from "@react-three/fiber";

const Car = () => {
  const { cameraPivot } = useCameraFollower();
  const width: number = 0.16;
  const height: number = 0.12;
  const front: number = 0.17;
  const wheelRadius: number = 0.05;
  const mass: number = 150;
  const position: [number, number, number] = [0, 0.5, 0];
  const chassisBodyArgs: [number, number, number] = [width, height, front * 2];
  const chassisRef = useRef<Group>(null);
  const vehicleRef = useRef<Group>(null);

  const [chassisBody] = useCompoundBody(
    () => ({
      position,
      mass: mass,
      rotation: [0, Math.PI, 0],
      shapes: [
        {
          args: chassisBodyArgs,
          position: [0, 0, 0],
          type: "Box",
        },
        {
          args: [width, height, front],
          position: [0, height, 0],
          type: "Box",
        },
      ],
    }),
    chassisRef
  );
  const [wheels, wheelInfos] = useVehicleWheelConfigurations(
    width,
    height,
    front,
    wheelRadius
  );
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    vehicleRef
  );
  useVehicleControls({ vehicleApi });

  useFrame(() => {
    if (chassisBody.current) {
      const worldPosition = new Vector3();
      chassisBody.current.getWorldPosition(worldPosition);
      cameraPivot.position.lerp(worldPosition, 0.9);
    }
  });

  return (
    <group ref={vehicle}>
      <group ref={chassisBody}>
        <DummyCarBody />
      </group>
      <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
