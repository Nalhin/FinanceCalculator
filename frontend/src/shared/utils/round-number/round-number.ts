export function roundNumber(number: number): number {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}
