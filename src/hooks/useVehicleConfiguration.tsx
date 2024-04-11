const useVehicleWheelConfigurations = () => {
  const width: number = 0.16;
  const height: number = 0.12;
  const front: number = 0.17;
  const wheelRadius: number = 0.05;
  const mass: number = 150;
  const position: [number, number, number] = [0, 0.5, 0];
  const chassisBodyArgs: [number, number, number] = [width, height, front * 2];

  return {
    width,
    height,
    front,
    wheelRadius,
    mass,
    position,
    chassisBodyArgs,
  };
};

export default useVehicleWheelConfigurations;
