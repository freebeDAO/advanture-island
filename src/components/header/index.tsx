'use client';
import React, {useMemo, useEffect} from "react";
import userStore from 'src/store/user/use';
import './index.css';
import {accountsChanged, Ethereum} from "src/lib/tools/ethereum";

export default function Header() {
    const {address, handleSetAddress, loginOut, username, avatar} = userStore();

    async function switchToBEP20() {
        const chainIdBEP20 = '0x1';// '0x38';
        try {
            // 检查当前选中的网络
            const currentChainId = await Ethereum({method: 'eth_chainId'});

            if (currentChainId !== chainIdBEP20) {
                // 请求切换到 Binance Smart Chain 主网
                await Ethereum({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: chainIdBEP20}],
                });
            } else {
                console.log('已经在主网');
            }
        } catch (switchError) {
            // 此处处理错误，例如用户拒绝切换网络
            console.error(switchError);
        }
    }

    const listenAccountsChanged = () => {
        accountsChanged((add) => {
            if (add !== address && address) {
                console.log('listenAccountsChanged')
                handleSetAddress();
            }
        });
    };
    const init = async () => {
        await switchToBEP20();
        await handleSetAddress();
    }

    useEffect(() => {
        listenAccountsChanged();
        init();
    }, []);


    // const getAccount = useMemo(() => {
    //     const pre = address.substring(0, 6);
    //     const sub = address.substring(address.length - 4, address.length);
    //     return pre + '...' + sub;  // 返回一个函数
    // }, [address])
    return (
        <div className="nav-header">
            {!address ?
                <button className="btn" onClick={handleSetAddress}>连接钱包</button> :
                <>
                    <div className="account">
                        <img className="avatar" src={avatar || '/assets/logo.png'}></img>
                        {username}
                        <div className="spot"/>
                    </div>
                    <button className='login-out' onClick={loginOut}>登出</button>
                </>
            }
        </div>
    )
}
