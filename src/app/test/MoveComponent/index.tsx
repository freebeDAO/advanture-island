'use client';

import React, { SetStateAction } from 'react';
import MoveComponent from 'src/components/MoveComponent';

type ChangeValFn = (value: SetStateAction<{ x: number; y: number; }>) => void

const autoTrackChange = (changeVal: ChangeValFn, checkRun: () => boolean) => {
  setInterval(() => {
    if (checkRun()) return
    changeVal((cached) => {
      return { ...cached, y: cached.y + 5 }
    })
  }, 1000);
}

function Home(props: any) {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MoveComponent step={10} elMoveChaneg={autoTrackChange}/>
    </div>
  );
}

export default Home;