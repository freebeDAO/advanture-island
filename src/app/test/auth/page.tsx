"use client";
import {useEffect, useState} from "react";
import { SiweMessage } from "siwe";
import { polygonMumbai } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";
import { useWeb3Modal} from "@web3modal/base/utils/library/react";
import { getCsrfToken, signIn } from "next-auth/react";

const AuthPage = () => {
    const [mounted, setMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const { open } = useWeb3Modal();
    const { signMessageAsync } = useSignMessage();
    const [hasSigned, setHasSigned] = useState(false);

    const handleSign = async () => {
        if (!isConnected) open();
        try {
            const message = new SiweMessage({
                domain: window.location.host,
                uri: window.location.origin,
                version: "1",
                address: address,
                statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
                nonce: await getCsrfToken(),
                chainId: polygonMumbai.id,
            });

            const signedMessage = await signMessageAsync({
                message: message.prepareMessage(),
            });

            setHasSigned(true);

            const response = await signIn("web3", {
                message: JSON.stringify(message),
                signedMessage,
                redirect: true,
                callbackUrl: '/'
            });
            if (response?.error) {
                console.log("Error occured:", response.error);
            }

        } catch (error) {
            console.log("Error Occured", error);
        }
    };

    useEffect(() => setMounted(true), []);

    if(!mounted) return <></>

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            {!isConnected && (
                <>
                    <h2 className="text-5xl font-semibold text-gray-400">请先登录</h2>
                    <button
                        className="rounded-lg py-2 px-4 bg-blue-700 hover:border hover:border-blue-700 hover:bg-transparent"
                        onClick={() => open()}
                    >
                        连接钱包
                    </button>
                </>
            )}
            {isConnected && !hasSigned && (
                <>
                    <p className="text-xl font-semibold text-gray-400">
                        钱包地址 {address?.slice(0, 8)}...
                    </p>
                    <button
                        className="rounded-lg py-2 px-4 mt-2 bg-violet-700 hover:border hover:border-violet-700 hover:bg-transparent"
                        onClick={handleSign}
                    >
                        确认登录
                    </button>
                    <button
                        className="rounded-lg py-2 px-4 mt-2 bg-yellow-400 hover:border hover:border-orange-700 hover:bg-transparent"
                        onClick={() => open()}
                    >
                        退出连接
                    </button>
                </>
            )}
            {isConnected && hasSigned && (
                <p>身份验证中. 请稍等...</p>
            )}
        </main>
    );
};

export default AuthPage;
