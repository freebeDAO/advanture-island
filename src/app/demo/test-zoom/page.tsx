'use client';

import ZoomableComponent from 'src/components/zoom/ZoomableComponent';

export default function TestZoomable() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ZoomableComponent initialScale={1} />
    </main>
  );
}