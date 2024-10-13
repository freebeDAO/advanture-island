"use client";

import { useEffect, useState } from "react";
import WidgetButton from "@/components/Widget/WidgetButton";
import getProvider from "@/lib/utils/getProvider";
import { getWalletVerificationCode, walletLogin } from "@/api/login";

const PhantomWalletLogin = ({
  onLoginSuccess,
}: {
  onLoginSuccess: (token: string) => void;
}) => {
  const [provider, setProvider] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const phantomProvider = getProvider();
    setProvider(phantomProvider);
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const response = await provider.connect();
        const walletPublicKey = response.publicKey.toString();
        setWalletAddress(walletPublicKey);
        alert("Wallet connected successfully");

        // Get verification code
        const verificationCode = await getWalletVerificationCode(
          walletPublicKey
        );
        if (
          !verificationCode ||
          !verificationCode.data ||
          !verificationCode.data.verifyCode
        )
          return;

        // Sign the verification code
        const signature = await signMessage(verificationCode.data.verifyCode);
        const publicKeyHex = Buffer.from(response.publicKey.toBytes()).toString(
          "hex"
        );
        const signatureHex = Buffer.from(signature).toString("hex");

        const loginResponse = await walletLogin(
          walletPublicKey,
          signatureHex,
          publicKeyHex
        );
        if (loginResponse.code === 0) {
          localStorage.setItem("token", loginResponse.data);
          onLoginSuccess(loginResponse.data);
        } else {
          setErrorMessage("Login failed.");
        }
      } catch (err) {
        console.error("Wallet connection or signing failed:", err);
        setErrorMessage("Failed to connect or sign with Phantom Wallet.");
      }
    } else {
      setErrorMessage("Phantom Wallet is not installed.");
    }
  };

  const signMessage = async (message: string) => {
    if (!provider || !provider.publicKey) {
      throw new Error("Phantom wallet is not connected.");
    }
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage);
    return signedMessage.signature;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {walletAddress ? (
        <div className="text-slate-800 text-center">
          Connected with address {walletAddress}
        </div>
      ) : (
        <WidgetButton
          style="primary"
          onClick={connectWallet}
          className="text-base items-center mt-6 bg-gradient-to-t from-[rgba(124,58,237,0.4)] to-[rgba(124,58,237,0.8)]"
        >
          Connect to Phantom Wallet
        </WidgetButton>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default PhantomWalletLogin;
