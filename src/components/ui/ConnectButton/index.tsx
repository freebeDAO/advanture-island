'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

export const ConnectButton = () => {
  
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <RainbowConnectButton/>
    </div>);
};