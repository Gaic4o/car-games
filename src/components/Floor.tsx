import { Triplet } from "@react-three/cannon";
import { MeshProps } from "@react-three/fiber";

interface FloorProps extends MeshProps {
  position?: Triplet;
  rotation?: Triplet;
}

const Floor: React.FC<FloorProps> = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
};

export default Floor;
