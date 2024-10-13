"use client";

import Image from "next/image";
import { useState } from "react";
import { getUserDetailsFromApi } from "src/api/user";
import PhantomWalletLogin from "src/components/PhantomWalletLogin";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState("");

  // 登录成功后获取用户详细信息
  const fetchUserDetails = async (token: string) => {
    try {
      const response = await getUserDetailsFromApi(token);
      if (response.code === 0) {
        console.log("login success", response.data);
      } else {
        setErrorMessage("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setErrorMessage("Failed to fetch user details.");
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务</h1>
        {/* 登录界面 */}
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <div className="bg-white p-6 shadow-md w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}

            {/* Phantom Wallet 登录组件 */}
            <PhantomWalletLogin onLoginSuccess={fetchUserDetails} />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/freebeDAO/advanture-island"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.yuque.com/zoeren/freebedao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          freebeDAO
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
