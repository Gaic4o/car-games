import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import { useControls } from "leva";
import Floor from "./components/Floor";
import Car from "./components/Car/Car";

function App() {
  const bgValue = useControls({ backgroundColor: "#fff" });

  return (
    <Canvas camera={{ position: [3, 2, 4] }}>
      <color attach={"background"} args={[bgValue.backgroundColor]} />
      <ambientLight />
      <directionalLight position={[0, 5, 5]} />
      <Physics gravity={[0, -2.6, 0]}>
        <Debug>
          <Car />
          <Floor />
        </Debug>
      </Physics>
    </Canvas>
  );
}

export default App;
