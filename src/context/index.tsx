'use client'

import React, { ReactNode } from 'react'
import { config, projectId, metadata} from "src/config";

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'
import AuthContext from "src/context/AuthContext";

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

createWeb3Modal({
    metadata,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true
})

export default function AppKitProvider({
                                           children,
                                           initialState
                                       }: {
    children: ReactNode
    initialState?: State
}) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <AuthContext>
                    {children}
                </AuthContext>
            </QueryClientProvider>
        </WagmiProvider>
    )
}