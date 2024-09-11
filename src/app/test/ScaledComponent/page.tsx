import React from 'react';
import ScaledComponent from 'src/components/ScaledComponent';

function Home(props: any) {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ScaledComponent/>
    </div>
  );
}

export default Home;