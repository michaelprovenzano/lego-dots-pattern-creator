export function getRandom(arr) {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
}

export function rgbToHex(r, g, b) {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
