export function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((range + ((value - min) % range)) % range) + min;
}
