import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';  // 从 next/image 导入 Image 组件

interface Ethereum {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, callback: (...args: unknown[]) => void) => void;
}

const Login: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      verifyToken(token).then((isValid) => {
        if (isValid) {
          setIsLoggedIn(true);
          const userInfo = decodeToken(token);
          setAccount(userInfo.publicAddress);
          setAvatar(userInfo.avatar);
          setUsername(userInfo.username);
        } else {
          localStorage.removeItem('jwt');
        }
      });
    }
  }, []);


  const handleLogin = async () => {
    const { ethereum } = window as unknown as { ethereum?: Ethereum };

    if (!ethereum) {
      alert('MetaMask 未安装！');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    try {
      setLoading(true);
      setError(null);

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[];
      setAccount(accounts[0]);

      const user = await fetchUser(accounts[0]);
      const signedUser = user || await createUser(accounts[0]);

      const message = `I am signing my one-time nonce: ${signedUser.nonce}`;
      const signature = await signer.signMessage(message);

      const token = await authenticateUser(accounts[0], signature);
      console.log('JWT:', token);

      // 将 JWT 存储在 localStorage 中
      localStorage.setItem('jwt', token);

      // 验证 token 并更新状态
      const isValid = await verifyToken(token);
      if (isValid) {
        setIsLoggedIn(true);
        setAccount(signedUser.publicAddress);
        setAvatar(signedUser.avatar);
        setUsername(signedUser.username);
      }

    } catch (error) {
      console.error(error);
      setError('登录过程中发生错误。');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setAccount(null);
    setAvatar(null);
    setUsername(null);
  };

  const fetchUser = async (publicAddress: string) => {
    const response = await fetch(`/api/login/users?publicAddress=${publicAddress}`);
    const user = await response.json();
    return user.length ? user[0] : null;
  };

  const createUser = async (publicAddress: string) => {
    const avatarUrl = prompt('请输入您的头像 URL:');
    const username = prompt('请输入您的用户名:');
    const response = await fetch('/api/login/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicAddress, avatar: avatarUrl, username })
    });
    return await response.json();
  };

  const authenticateUser = async (publicAddress: string, signature: string) => {
    const response = await fetch('/api/login/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicAddress, signature })
    });
    const authData = await response.json();
    if (!response.ok) throw new Error(authData.error || '认证失败');
    return authData.token;
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const result = await response.json();
      return response.ok && result.isValid;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  const decodeToken = (token: string) => {
    // 这里我们假设 JWT 的 payload 是 base64 编码的 JSON 对象
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div>
      <button onClick={isLoggedIn ? handleLogout : handleLogin} disabled={loading}>
        {loading ? '加载中...' : isLoggedIn ? '退出登录' : '使用 MetaMask 登录'}
      </button>
      {account && <p>已连接账户: {account}</p>}
      {avatar && (
        <Image
          src={avatar}
          alt="头像"
          width={50}
          height={50}
        />
      )}
      {username && <p>用户名: {username}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
