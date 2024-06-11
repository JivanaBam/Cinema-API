export const convertSecondToHourMinSecFormat = (seconds) => {
  const hour = Math.floor(seconds / 3600);

  let x = seconds % 3600;

  const min = Math.floor(x / 60);

  // let second = x % 60;

  return `${hour}hr ${min}min`;
};
