// src/api/login.ts
import { apiRequest } from "src/lib/utils/api";

// Phantom Wallet 登录
export const walletLogin = async (
  walletAddress: string,
  signatureHex: string,
  publicKeyHex: string
) => {
  try {
    const response = await apiRequest("/api/v1/user/wallet/login", "POST", {
      wallet: walletAddress,
      signature: signatureHex,
      publicKey: publicKeyHex,
    });
    return response;
  } catch (error) {
    console.error("Error logging in with wallet:", error);
    throw error;
  }
};

// 获取钱包登录验证码
export const getWalletVerificationCode: any = async (walletAddress: string) => {
  try {
    const response = await apiRequest(
      "/api/v1/user/wallet/verifyCode",
      "POST",
      {
        wallet: walletAddress,
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching verification code:", error);
    throw error;
  }
};
