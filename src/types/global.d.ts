/* eslint-disable @typescript-eslint/no-explicit-any */
interface EthereumProvider {
    isMetaMask?: boolean;
    request?: (args: { method: string; params?: Array<any> }) => Promise<any>;
  }
  
  interface Window {
    ethereum?: EthereumProvider;
  }
  