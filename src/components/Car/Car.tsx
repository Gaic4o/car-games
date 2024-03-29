import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useRef } from "react";
import DummyWheel from "./DummyWheel";
import DummyCarBody from "./DummyCarBody";
import { useVehicleControls } from "../../hooks/useVehicleControls";
import { useVehicleWheelConfigurations } from "../../hooks/useVehicleWheelConfigurations";
import { Group, Vector3 } from "three";
import useCameraFollower from "../../hooks/useCameraFollower";
import { useFrame } from "@react-three/fiber";
import useVehicleConfiguration from "../../hooks/useVehicleConfiguration";

const Car = () => {
  const { cameraPivot } = useCameraFollower();
  const vehicleConfig = useVehicleConfiguration();
  const chassisRef = useRef<Group>(null);
  const vehicleRef = useRef<Group>(null);

  const [chassisBody] = useCompoundBody(
    () => ({
      position: vehicleConfig.position,
      mass: vehicleConfig.mass,
      rotation: [0, Math.PI, 0],
      shapes: [
        {
          args: vehicleConfig.chassisBodyArgs,
          position: [0, 0, 0],
          type: "Box",
        },
        {
          args: [
            vehicleConfig.width,
            vehicleConfig.height,
            vehicleConfig.front,
          ],
          position: [0, vehicleConfig.height, 0],
          type: "Box",
        },
      ],
    }),
    chassisRef
  );
  const [wheels, wheelInfos] = useVehicleWheelConfigurations(
    vehicleConfig.width,
    vehicleConfig.height,
    vehicleConfig.front,
    vehicleConfig.wheelRadius
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
      <DummyWheel wheelRef={wheels[0]} radius={vehicleConfig.wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={vehicleConfig.wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={vehicleConfig.wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={vehicleConfig.wheelRadius} />
    </group>
  );
};

export default Car;
