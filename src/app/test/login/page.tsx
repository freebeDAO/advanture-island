'use client';
import userStore from 'src/store/user/use';
import Header from "src/components/header";

export default function Login() {
    const {
        address,
    } = userStore();

    return (
        <div className="">
            <Header/>
            {!address ? <div>未登录</div>: <div>
                已经登录
            </div>}
        </div>
    );
}
