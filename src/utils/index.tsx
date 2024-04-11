export function createBowlingPinPositions(
  rowCount: number,
  spacing: number
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  let startX = (-(rowCount - 1) * spacing) / 2;
  const startZ = 0;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col <= row; col++) {
      const x = startX + col * spacing;
      const z = startZ + row * spacing;
      positions.push([x, 0.2, z]);
    }
    startX += spacing / 2;
  }

  return positions;
}
