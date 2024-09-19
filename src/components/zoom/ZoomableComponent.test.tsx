import { render, fireEvent, getByRole, getByAltText } from '@testing-library/react';
import ZoomableComponent from './ZoomableComponent';

describe('ZoomableComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<ZoomableComponent initialScale={1} />);
    expect(getByAltText('Landscope Image')).toBeInTheDocument();
    expect(getByText(/This is a beautiful picture./i)).toBeInTheDocument();
  });

  it('should show the scale on zommination', () => {
    const { getByRole, } = render(<ZoomableComponent initialScale={1} />);
    
    const zoomContainer = getByRole('zoom-container');
 
    expect(zoomContainer).toHaveStyle(`transform: scale(1);`);
    
  });

});