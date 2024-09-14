import Web3 from 'web3';

const getWeb3 = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    // 使用 MetaMask 或其他兼容的浏览器扩展
    window.web3 = new Web3(window.ethereum);

    try {
      // 请求用户授权
      await window.ethereum.enable();
      // 如果需要切换到特定网络，可以在这里发起切换请求
      // const res = await window.ethereum.request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: '0x38' }], // Binance Smart Chain 的 Chain ID 是 0x38
      // });

      return { web3: window.web3, ethereum: window.ethereum };
    } catch (error) {
      console.error('User denied account access or error occurred:', error);
      return null;
    }
  } else {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
  }
};

export default getWeb3;
