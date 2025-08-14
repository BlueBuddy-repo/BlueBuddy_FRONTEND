export const OCEAN_STEPS = [
  { name: '대서양 (North Atlantic)',      points: [{ lat: 20, lng: -30 }] },
  { name: '태평양 (North Pacific)',       points: [{ lat: 20, lng: -150 }] },
  { name: '인도양 (North Indian Ocean)',  points: [{ lat: 15, lng: 70 }] },   // E(+)
  { name: '북극해 (Arctic Ocean)',        points: [{ lat: 75, lng: -20 }] },
]

export const clampStep = (s) => Math.max(1, Math.min(s, OCEAN_STEPS.length))

export function buildOceanMarkers(step) {
  const S = clampStep(step)
  const merged = []
  for (let i = 0; i < S; i++) {
    const ocean = OCEAN_STEPS[i]
    ocean.points.forEach(p => merged.push({ ...p, ocean: ocean.name, order: i + 1 }))
  }
  return merged
}
