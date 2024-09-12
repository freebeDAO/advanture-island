import { Shape } from ".";

export function getTextSize(
  {
    shape,
    borderWidth,
    borderRadius
  } : {
    shape: Shape;
    borderWidth: number;
    borderRadius: number;
  }
): { width: string; height: string; top?: string } {
  let width: number;
  let height: number;
  let top: number | undefined = undefined;

  // 由于svg是用viewbox实现的自适应，所以borderWidth需要进行等比例换算
  switch (shape) {
    case 'circle':
      {
        width = 70 * (200 - borderWidth * 3) / 200;
        height = width;
      }
      break;
    case 'ellipse':
      {
        width = 64 * (200 - borderWidth * 3) / 200;
        height = 60 * (200 - borderWidth * 3) / 200;
      }
      break;
    case 'rect':
      width = 100 * (200 - borderWidth * 2 - borderRadius / 1.5) / 200;
      height = 70 * (200 - borderWidth * 3 - borderRadius / 1.5) / 200;
      break;
    case 'triangle':
      width = 49 * (200 - borderWidth * 4) / 200;
      height = width;
      top = 50 + 25 * (200 - borderWidth * 3) / 200
      break;
  }
  return {
    width: `${width}%`,
    height: `${height}%`,
    top: `${top}%`
  }
}
