import React from 'react';
import DraggerComponent from 'src/components/DraggerComponent';

function Home(props: any) {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DraggerComponent/>
    </div>
  );
}

export default Home;