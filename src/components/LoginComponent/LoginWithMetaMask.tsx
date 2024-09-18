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
    <div>
      <h1>Login with MetaMask</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <div>
          <p>Connected account: {account}</p>
          <div>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default LoginWithMetaMask;
