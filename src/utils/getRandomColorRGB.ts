export function getRandomColorRGB() {
  const red = Math.floor(Math.random() * 256);    // Random number between 0 and 255
  const green = Math.floor(Math.random() * 256);  // Random number between 0 and 255
  const blue = Math.floor(Math.random() * 256);   // Random number between 0 and 255

  return `rgb(${red}, ${green}, ${blue})`;
}