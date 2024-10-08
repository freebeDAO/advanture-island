'use client'
import { useWeb3React } from '@web3-react/core'
import { metaMask } from 'src/lib/connectors'
import { useEffect, useState } from 'react'

export function WalletLoginComponent() {
  const { account, isActive, connector } = useWeb3React()
  const [error, setError] = useState<Error | undefined>(undefined)
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  const connect = async () => {
    try {
      await metaMask.activate()
      setError(undefined)
    } catch (error) {
      console.error('Failed to connect', error)
      setError(error instanceof Error ? error : new Error('An unknown error occurred'))
    }
  }

  const disconnect = () => {
    if (connector?.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }

  useEffect(() => {
    if (account) {
      // 用户已登录，调用后端API保存用户信息
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: account }),
      })
        .then(response => response.json())
        .then(data => {
          setNickname(data.nickname || '');
          setAvatarUrl(data.avatar_url || '');
        })
        .catch(error => {
          console.error('Error:', error);
          setError(new Error('Failed to save user information'));
        });
    }
  }, [account]);

  if (isActive) 
    return (
      <div className="bg-white shadow rounded-lg p-6 max-w-sm mx-auto">
        <p className="text-gray-700 mb-4">Connected with <span className="font-bold">{account?.slice(0, 6)}...{account?.slice(-4)}</span></p>
        {nickname && <p>Welcome, {nickname}!</p>}
        {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full mx-auto mt-2"/>}
        <button
          onClick={disconnect}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Disconnect
        </button>
      </div>
    )
  else
    return (
      <div className="bg-white shadow rounded-lg p-6 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Connect Wallet</h2>
        <div className="space-y-4">
          <button
            onClick={connect}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <img src="/assets/metamask-logo.svg" alt="MetaMask" className="w-6 h-6 mr-2" />
            MetaMask
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    )
}

export default WalletLoginComponent;