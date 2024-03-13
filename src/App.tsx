import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import { useControls } from "leva";
import Floor from "components/Floor";

function App() {
  const bgValue = useControls({ backgroundColor: "#fff" });

  return (
    <Canvas camera={{ position: [0, 15, 4] }}>
      <color attach={"background"} args={[bgValue.backgroundColor]} />
      <Physics>
        <Debug>
          <Floor rotation={[-Math.PI / 2, 0, 0]} />
        </Debug>
      </Physics>
    </Canvas>
  );
}

export default App;
