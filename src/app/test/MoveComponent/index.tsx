'use client';

import React from 'react';
import MoveComponent from 'src/components/MoveComponent';

function Home(props: any) {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MoveComponent step={10} />
    </div>
  );
}

export default Home;