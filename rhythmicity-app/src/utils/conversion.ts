export const secondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  seconds = (seconds % 60) / 100;
  return `${minutes}:${seconds.toFixed(2).slice(2, 4)}`;
};

export const msToMinutes = (ms: number): string => {
  const seconds = ms / 1000
  return secondsToMinutes(seconds)
}