
const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

export const toHexColor = (color: string): string => {
  let hexColor = color.replace('#', '');

  if (hexColor.length === 6) {
    return color;
  }

  if (hexColor.length === 3) {
    hexColor = hexColor.split('').map(char => char + char).join('');
  }

  if (/^#[0-9A-F]{6}$/i.test(`#${hexColor}`)) {
    return `#${hexColor.toUpperCase()}`;
  }

  if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.test(color)) {
    const result = color.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);
    if (result) {
      const [r, g, b] = result.slice(1, 4).map(Number);
      return rgbToHex(r, g, b);
    }
  }

  if (/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/i.test(color)) {
    const result = color.match(/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/i);
    if (result) {
      const [r, g, b] = result.slice(1, 4).map(Number);
      return rgbToHex(r, g, b);
    }
  }

  if (/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i.test(color)) {
    const result = color.match(/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i);
    if (result) {
      const [h, s, l] = result.slice(1, 4).map(Number);
      const [r, g, b] = hslToRgb(h, s, l);
      return rgbToHex(r, g, b);
    }
  }

  throw new Error('Invalid color value');
}


