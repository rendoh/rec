export function formatDurationTime(ms: number) {
  const duration = Math.floor(ms / 1000);
  const hours = Math.floor(duration / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = (duration % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
