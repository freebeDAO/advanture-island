import * as React from 'react';
import * as Slider from '@radix-ui/react-slider';
import './zoom-style.css'

// Define the component's props interface
interface ZoomableComponentProps {
  initialScale: number;
}

export default function ZoomableComponent({ initialScale }: ZoomableComponentProps) {
  // State management for the current zoom level
  const [scale, setScale] = React.useState(initialScale);

  // Function to handle zoom level changes
  const handleZoomChange = (value: number[]) => {
    // console.log('Zoom changed:', value[0]);

    setScale(value[0]);
  };

   // Render the component
  return (
    <div className="relative h-screen w-screen flex flex-col">
      {/* Main content area */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div
          role = "zoom-container"
          style={{ transform: `scale(${scale})` }}
          className="zoom-container flex flex-col items-center"
        >
          {/* Display the image */}
          <img
            src="/assets/landscope.jpeg"
            alt="Landscope Image"
            className="object-contain w-full max-w-[400px]"
          />
          {/* Display the text */}
          <p className="text-base mt-4">This is a beautiful picture.</p>
        </div>
      </div>
      {/* Vertical slider */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Slider.Root
          className="SliderRoot"
          defaultValue={[initialScale]}
          min={0.5}
          max={2}
          step={0.1}
          onValueChange={(value) => handleZoomChange(value)}
          orientation="vertical"
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
      </div>
    </div>
  );
}