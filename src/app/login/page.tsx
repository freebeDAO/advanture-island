"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { ethers } from 'ethers';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleWalletLogin = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setError('请安装一个支持 Ethereum 的钱包，比如 MetaMask。');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // 请求后端生成 nonce
      const nonceResponse = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
      });

      if (!nonceResponse.ok) {
        const errorData = await nonceResponse.json();
        setError(errorData.error || '获取随机数失败');
        return;
      }

      const { nonce } = await nonceResponse.json();
      if (!nonce) {
        setError('无法获取随机数，请稍后重试。');
        return;
      }

      // 用户签名 nonce
      const signature = await signer.signMessage(nonce);

      // 发送登录请求
      const result = await signIn('credentials', {
        redirect: false,
        address,
        signature,
        nonce,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }

    } catch (err) {
      console.error(err);
      setError('登录过程中出现错误。');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">通过钱包登录</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleWalletLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          使用钱包登录
        </button>
      </div>
    </div>
  );
}
