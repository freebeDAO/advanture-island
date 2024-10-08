'use client'
import { Web3ReactProvider } from '@web3-react/core'
import { metaMask, hooks } from 'src/lib/connectors'


export function Web3ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider connectors={[[metaMask, hooks]]}>
      {children}
    </Web3ReactProvider>
  )
}