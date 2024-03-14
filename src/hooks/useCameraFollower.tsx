import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Object3D } from "three";

const useCameraFollower = () => {
  const { scene, camera } = useThree();
  const cameraPivot = useMemo(() => new Object3D(), []);

  useEffect(() => {
    camera.position.set(1, 2, 3.5);
    camera.rotation.x = -0.5;

    cameraPivot.add(camera);
    scene.add(cameraPivot);
  }, [camera, scene]);

  return { cameraPivot };
};

export default useCameraFollower;
