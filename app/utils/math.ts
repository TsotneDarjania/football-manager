export function getRandomNumber(from: number, to: number) {
  if (from > to) {
    throw new Error(
      "Invalid input parameters. The `from` parameter must be less than or equal to the `to` parameter."
    );
  }
  const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
  return randomNumber;
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) {
    throw new Error("Total cannot be zero");
  }

  return (part * total) / 100;
}

export function interpolate(parameter: number, min: number, max: number) {
  const normalizedPassDelay = (parameter - 1) / 99;

  // Calculate the interpolated value
  const interpolatedValue = min + normalizedPassDelay * (max - min);

  return interpolatedValue;
}

export function mapToPercentageInRange(
  number: number,
  min: number,
  max: number
): number {
  // Ensure the number is within the range
  if (number < min || number > max) {
    if (number < min) number = min;
    if (number > max) number = max;
  }

  // Calculate the percentage
  const percentage = (number - min) / (max - min);

  // Map the percentage to the range 0-100
  const result = Math.floor(percentage * 100);

  return result;
}

export function clamp(parameter: number, min: number, max: number) {
  const range = max - min;

  return Math.floor(((parameter - min) * 100) / range);
}

export function isInRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

export function makeNegative(number: number) {
  return number >= 0 ? -number : number;
}
