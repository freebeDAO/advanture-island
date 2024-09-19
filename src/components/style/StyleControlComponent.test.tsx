import React from 'react';
import { render, screen } from '@testing-library/react';
import { Shape, TextPosition } from '../../types/styles';
import StyleControlComponent from './StyleControlComponent';

// Possible shapes for the component
const shapes = [
  'circle',
  'ellipse',
  'rectangle',
  'roundedRectangle',
  'equilateralTriangle'
];

// Possible text positions for the component
const positions = [
  'topLeft',
  'topCenter',
  'topRight',
  'centerLeft',
  'center',
  'centerRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight'
];

describe('StyleControlComponent', () => {
  const defaultProps = {
    shape: shapes[0] as Shape ,
    backgroundColor: '#ff0000',
    borderWidth: 1,
    borderColor: '#00ff00',
    text: 'Hello',
    textSize: '16',
    textColor: '#0000ff',
    textPosition: positions[4] as TextPosition,
  };

  test('renders circle correctly', () => {
    render(<StyleControlComponent {...defaultProps} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'border-radius': '50%',
      'background-color': '#ff0000',
      'border-width': '1px',
      'border-color': '#00ff00',
      'color': '#0000ff',
      'font-size': '16px',
      'justify-content': 'center',
      'align-items': 'center',
    });
  });

  test('renders ellipse correctly', () => {
    render(<StyleControlComponent {...defaultProps} shape={shapes[1] as Shape} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'border-radius': '50%',
      'background-color': '#ff0000',
      'border-width': '1px',
      'border-color': '#00ff00',
      'color': '#0000ff',
      'font-size': '16px',
      'justify-content': 'center',
      'align-items': 'center',
    });
  });

  test('renders rectangle correctly', () => {
    render(<StyleControlComponent {...defaultProps} shape={shapes[2] as Shape} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'border-radius': '0',
      'background-color': '#ff0000',
      'border-width': '1px',
      'border-color': '#00ff00',
      'color': '#0000ff',
      'font-size': '16px',
      'justify-content': 'center',
      'align-items': 'center',
    });
  });

  test('renders roundedRectangle correctly', () => {
    render(<StyleControlComponent {...defaultProps} shape={shapes[3] as Shape} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'border-radius': '20px',
      'background-color': '#ff0000',
      'border-width': '1px',
      'border-color': '#00ff00',
      'color': '#0000ff',
      'font-size': '16px',
      'justify-content': 'center',
      'align-items': 'center',
    });
  });

  test('renders equilateralTriangle correctly', () => {
    render(<StyleControlComponent {...defaultProps} shape={shapes[4] as Shape} />);
    const container = screen.getByTestId('style-control-component');
    
    const lateral = Math.round( (300 * 2) / Math.sqrt(3) / 2 );
    expect(container).toHaveStyle({
      position: 'relative',
      'width': '0',
      'height': '0',
      'borderLeft': `${lateral}px solid transparent`, 
      'borderRight': `${lateral}px solid transparent`, 
      'borderBottom': `$300px solid #ff0000`,
      
      
    });
  });


  test('renders text at topLeft position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[0] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'flex-start',
      'align-items': 'flex-start',
    });
  });

  test('renders text at topCenter position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[1] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'center',
      'align-items': 'flex-start',
    });
  });

  test('renders text at topRight position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[2] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'flex-end',
      'align-items': 'flex-start',
    });
  });

  test('renders text at centerLeft position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[3] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'flex-start',
      'align-items': 'center',
    });
  });

  test('renders text at center position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[4] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'center',
      'align-items': 'center',
    });
  });

  test('renders text at centerRight position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[5] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'flex-end',
      'align-items': 'center',
    });
  });

  test('renders text at bottomLeft position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[6] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'flex-start',
      'align-items': 'flex-end',
    });
  });

  test('renders text at bottomCenter position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[7] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'center',
      'align-items': 'flex-end',
    });
  });

  test('renders text at bottomRight position', () => {
    render(<StyleControlComponent {...defaultProps} textPosition={positions[8] as TextPosition} />);
    const container = screen.getByTestId('style-control-component');
    expect(container).toHaveStyle({
      'justify-content': 'flex-end',
      'align-items': 'flex-end',
    });
  });
});