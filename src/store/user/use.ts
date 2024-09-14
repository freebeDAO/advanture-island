import {useSelector, useDispatch} from 'react-redux';
import {authChallenge, authVerify, authCheck, userDetail} from './api'
import React from 'react';
import slice from './slice';
import getWeb3 from '../../lib/tools/getWeb3';
import {getCookie, setCookie, deleteCookie} from "src/lib/tools/cookie";
import {userType} from "src/server/dataType/users";

const {setAddress, setUsername, setAvatar} = slice.actions;
// 获取 user
const getUser = (state) => state.user;

// hooks
export default function useUserStore() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const handleSetAddress = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const address: string = accounts[0];
            if (address) {
                const {web3} = await getWeb3();
                if (getCookie('token')) {
                    const res = await authCheck(address);
                    if (res) {
                        dispatch(setAddress(address));
                        await getUserDetail()
                        return true;
                    }
                }
                const challenge = await authChallenge(address);
                try {
                    const signature = await web3?.eth?.personal?.sign(challenge, address, '');
                    const token = await authVerify({address, signature})
                    if (token) {
                        setCookie('token', token);
                        dispatch(setAddress(address));
                        await getUserDetail()
                        return true;
                    } else {
                        loginOut()
                        return false;
                    }
                } catch (e) {
                    loginOut();
                    return false;
                }
            }
        }
    };

    const loginOut = () => {
        deleteCookie('token');
        dispatch(setAddress(''));
        dispatch(setUsername(''));
        dispatch(setAvatar(''))
    }
    const getUserDetail = async () => {
        const res: userType = await userDetail();
        if(res){
            dispatch(setUsername(res.username))
            dispatch(setAvatar(res.avatar))
        }
    }
    return {
        ...user,
        handleSetAddress,
        loginOut,
        getUserDetail
    };
}
