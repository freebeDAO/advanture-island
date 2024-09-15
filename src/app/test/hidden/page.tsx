"use client";
import {signOut} from "next-auth/react";
import React from "react";
import { useDisconnect } from "wagmi";

const HiddenPage = () => {
    const { disconnectAsync } = useDisconnect();

    const handleSignout = async () => {
        disconnectAsync();
        signOut({callbackUrl:"/"});
    };
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-5xl tracking-tight font-extrabold text-gray-300">
                欢迎!!
            </h1>
            <p className="text-gray-500">
                能看到该页面说明已
                <span className="font-semibold text-green-400 text-xl">
          成功登录
        </span>
                !
            </p>
            <button
                className="rounded-lg py-2 px-4 mt-6 bg-red-700 hover:border hover:border-red-700 hover:bg-transparent"
                onClick={handleSignout}
            >
                退出登录
            </button>
        </div>
    );
};

export default HiddenPage;
