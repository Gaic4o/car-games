import { useEffect } from "react";
import { RaycastVehiclePublicApi } from "@react-three/cannon";
import { useKeyPress } from "./useKeyPress";

interface VehicleControlsParams {
  vehicleApi: RaycastVehiclePublicApi;
}

export const useVehicleControls = ({ vehicleApi }: VehicleControlsParams) => {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowLeftPressed = useKeyPress("ArrowLeft");
  const arrowRightPressed = useKeyPress("ArrowRight");

  useEffect(() => {
    const engineForce = arrowUpPressed ? 120 : arrowDownPressed ? -120 : 0;
    vehicleApi.applyEngineForce(engineForce, 2);
    vehicleApi.applyEngineForce(engineForce, 3);

    const steeringValue = arrowLeftPressed ? -0.1 : arrowRightPressed ? 0.1 : 0;
    const rearSteeringValue = arrowLeftPressed
      ? 0.35
      : arrowRightPressed
      ? -0.35
      : 0;
    vehicleApi.setSteeringValue(steeringValue, 0);
    vehicleApi.setSteeringValue(steeringValue, 1);
    vehicleApi.setSteeringValue(rearSteeringValue, 2);
    vehicleApi.setSteeringValue(rearSteeringValue, 3);
  }, [arrowUpPressed, arrowDownPressed, arrowLeftPressed, arrowRightPressed]);

  return {
    arrowUpPressed,
    arrowDownPressed,
    arrowLeftPressed,
    arrowRightPressed,
  };
};
