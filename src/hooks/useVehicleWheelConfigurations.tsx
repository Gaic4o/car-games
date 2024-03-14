import { WheelInfoOptions, useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";

export const useVehicleWheelConfigurations = (
  width: number,
  height: number,
  front: number,
  radius: number
) => {
  const wheels: WheelInfoOptions[] | any = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const wheelPosition = height * 0.3;
  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 25,
    suspensionRestLength: 0.1,
    frictionSlip: 10,
    dampingRelaxation: 1,
    dampingCompression: 5,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -40,
    useCustomSlidingRotationalSpeed: true,
    sleepSpeedLimit: 0.01,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, wheelPosition, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, wheelPosition, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, wheelPosition, -front],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, wheelPosition, -front],
      isFrontWheel: false,
    },
  ];

  const wheelFunc = (): any => ({
    collisionFilterGroup: 0,
    mass: 50,
    type: "Kinematic",
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.025, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
  });

  useCompoundBody(wheelFunc, wheels[0]);
  useCompoundBody(wheelFunc, wheels[1]);
  useCompoundBody(wheelFunc, wheels[2]);
  useCompoundBody(wheelFunc, wheels[3]);

  return [wheels, wheelInfos];
};
