import React from 'react';
import Link from 'next/link';
import Login from '../../components/login/Login';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Login with MetaMask</h1>
      <Login />
      <Link href="/" style={{ 
        marginTop: '20px', 
        display: 'inline-block', 
        padding: '10px 20px', 
        backgroundColor: '#0070f3', 
        color: '#fff', 
        borderRadius: '5px', 
        textDecoration: 'none',
        textAlign: 'center'
        }}>
        返回主页
      </Link>
    </div>
  );
};

export default Home;
