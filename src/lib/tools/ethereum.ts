// utils/checkEthereum.ts
export function checkEthereum(): boolean {
  if (typeof window !== 'undefined' && window.ethereum) {
    return true;
  } else {
    console.log('No Ethereum provider found');
    return false;
  }
}

// method = '', params = {}
export function Ethereum(option: any): Promise<any> | undefined {
  if (checkEthereum()) {
    return new Promise((resolve, reject) => {
      window.ethereum
          .request(option)
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  }
}

// 监听账户变化
export function accountsChanged(callback: (accounts: string) => void) {
  if (checkEthereum()) {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (callback) callback(accounts[0]);
      console.log('地址已切换至:', accounts[0]);
    });
  }
}

// 监听通知
export function notification(callback: (message: any) => void) {
  if (checkEthereum()) {
    window.ethereum.on('notification', (message: any) => {
      if (callback) callback(message);
    });
  }
}
