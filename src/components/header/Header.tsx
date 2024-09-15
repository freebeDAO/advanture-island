'use client'

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useDisconnect} from "wagmi";
import {DefaultSession} from "next-auth";

// 拓展Session
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            avatar: string
            nickName: string
        } & DefaultSession['user']
    }
}

export default function Header() {
    const {data} = useSession()
    const {disconnectAsync} = useDisconnect();

    const handleSignout = async () => {
        disconnectAsync();
        signOut({callbackUrl: "/"});
    };

    return <>
    {data ?
        <div>
            <div className={'flex items-center bg-gray-500 rounded'}>
                <img className={'w-8 h-8'} src={data?.user?.avatar} alt=""/>
                <span>{data?.user?.nickName}</span>
            </div>
            <button
                className="rounded-lg py-2 px-4 mt-6 bg-red-700 hover:border hover:border-red-700 hover:bg-transparent"
                    onClick={handleSignout}
                >
                    退出登录
                </button>
        </div>
        : <Link href={'/test/auth'}>
    <button
        className="bg-green-500 border-4 border-green-400 hover:border-green-800 hover:bg-transparent mt-5 rounded-lg py-2 px-4">去登录
    </button>
    </Link>
}
</>
}
