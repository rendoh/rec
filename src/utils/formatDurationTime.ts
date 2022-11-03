export function formatDurationTime(ms: number) {
  const duration = Math.floor(Math.abs(ms) / 1000);
  const hours = Math.floor(duration / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = (duration % 60).toString().padStart(2, '0');
  return `${ms < 0 ? '-' : ''}${hours}:${minutes}:${seconds}`;
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('時間が正しくフォーマットされる', () => {
    expect(formatDurationTime(0)).toBe('00:00:00');
    expect(formatDurationTime(1000)).toBe('00:00:01');
    expect(formatDurationTime(60 * 1000)).toBe('00:01:00');
    expect(formatDurationTime(60 * 60 * 1000)).toBe('01:00:00');
    expect(formatDurationTime(24 * 60 * 60 * 1000)).toBe('24:00:00');
    expect(formatDurationTime(-1000)).toBe('-00:00:01');
    expect(formatDurationTime(-60 * 1000)).toBe('-00:01:00');
    expect(formatDurationTime(-60 * 60 * 1000)).toBe('-01:00:00');
    expect(formatDurationTime(-24 * 60 * 60 * 1000)).toBe('-24:00:00');
  });
}
