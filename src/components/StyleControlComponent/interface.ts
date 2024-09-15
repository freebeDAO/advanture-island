export type Shape = 'circle' | 'ellipse' | 'rectangle' | 'rounded-rectangle' | 'triangle';

export type TextPosition = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';

export interface IControlData {
  shape: Shape,
  backgroundColor: string,
  borderWidth: number,
  borderColor: string,
  content: string,
  fontSize: number,
  color: string,
  textPosition: TextPosition,
}
