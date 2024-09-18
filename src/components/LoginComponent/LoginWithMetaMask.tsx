"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginWithMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  
  // 检查 MetaMask 是否已安装
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.log('MetaMask is not installed!');
    }
  }, []);

  // MetaMask 登录
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }
      const accounts = await window.ethereum?.request?.({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      console.log('Connected account:', accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // 提交用户信息到后端
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/user', {
        address: account,
        nickname: nickname,
        avatar: avatar
      });
      console.log('User created/updated:', response.data);
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login with MetaMask</h1>

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            连接 MetaMask
          </button>
        ) : (
          <div>
            <p className="text-center text-gray-700 mb-4">已链接钱包: <span className="max-w-full whitespace-normal overflow-wrap break-words font-semibold">{account}</span></p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your nickname/请输入用户名"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter avatar URL/请输入头像链接"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
            >
              提交保存
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginWithMetaMask;
