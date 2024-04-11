import { Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useSetRecoilState } from "recoil";
import { isStartScene } from "../../utils/atom";

interface TextProps {
  text: string;
  position: [number, number, number];
}

const fontStyle = {
  font: "/fonts/NotoSans.json",
  size: 0.12,
  letterSpacing: 0.03,
  height: 0.01,
  fontSize: 1,
};

const CustomText3D: React.FC<TextProps> = ({ text, position }) => (
  <Text3D position={position} {...fontStyle}>
    {text}
    <meshBasicMaterial color={"#000"} />
  </Text3D>
);

export function TextFont() {
  const setStart = useSetRecoilState(isStartScene);

  const controlInstructions: TextProps[] = [
    { text: "플레이 조작 방법", position: [0, 0, 0] },
    { text: "↑", position: [0.5, -0.4, 0] },
    { text: "←↓→", position: [0.3, -0.6, 0] },
  ];
  return (
    <motion.group
      onAnimationComplete={() => setStart(true)}
      animate={{ y: [-2, 0], scale: [0, 1] }}
      transition={{ delay: 1.5, duration: 0.3 }}
      position={[0.3, 0, 1]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {controlInstructions.map((instruction) => (
        <CustomText3D key={instruction.text} {...instruction} />
      ))}
    </motion.group>
  );
}
