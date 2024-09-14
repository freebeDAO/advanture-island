import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {getCookie} from "src/lib/tools/cookie";
// 获取环境变量
const env = process.env.NODE_ENV as 'development' | 'production'; // 将 env 类型定义为 'development' 或 'production'
const baseURL: string = {
    development: 'http://localhost:3000',
    production: 'xxx'
}[env];

// 定义类型接口
interface RequestOptions {
    url: string;
    param?: Record<string, any>;
    errorMsg?: string;
    errorFn?: (res: AxiosResponse) => void;
}

interface CommonReqOptions extends AxiosRequestConfig {
    errorMsg?: string;
    errorFn?: (res: AxiosResponse) => void;
}

// 定义返回的数据结构
interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
}

// 通用请求方法
const commonReq = async <T>(
    option: AxiosRequestConfig,
    errorMsg: string = '',
    errorFn?: (res: AxiosResponse) => void
): Promise<T | null> => {
    try {
        const res: AxiosResponse<ApiResponse<T>> = await axios(option);

        if (res.status === 200 && res.data.success) {
            return res.data.data;
        } else {
            if (errorFn) {
                errorFn(res);
            } else {
                console.error(res.data.message || '网络错误，请稍后再试');
            }
            return null;
        }
    } catch (e: any) {
        console.error(e.message || errorMsg || '网络错误，请稍后再试');
        return null;
    }
};

// GET 请求函数
export function get<T = any>({
                                 url = '',
                                 param = {},
                                 errorMsg = '',
                                 errorFn,
                             }: RequestOptions): Promise<T | null> {
    const keys = Object.keys(param);
    if (keys.length) {
        let str = '';
        for (let i = 0; i < keys.length; i++) {
          if (param) {
            str += keys[i] + '=' + param[keys[i]] + (i !== keys.length - 1 ? '&' : '');
          }
        }
        url = `${url}?${str}`;
    }

    return commonReq<T>(
        {
            method: 'get',
            url,
            baseURL,
        },
        errorMsg,
        errorFn
    );
}

// POST 请求函数
export function post<T = any>({
                                  url = '',
                                  param = {},
                                  errorMsg = '',
                                  errorFn,
                              }: RequestOptions): Promise<T | null> {
    return commonReq<T>(
        {
            method: 'post',
            url,
            baseURL,
            data: JSON.stringify(param),
            headers: {'Content-Type': 'application/json'},
        },
        errorMsg,
        errorFn
    );
}

// 带授权的 POST 请求
export function authPost<T = any>({
                                      url = '',
                                      param = {},
                                      errorMsg = '',
                                      errorFn,
                                  }: RequestOptions): Promise<T | null> {
    return commonReq<T>(
        {
            method: 'post',
            url,
            baseURL,
            data: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`,
            },
        },
        errorMsg,
        errorFn
    );
}

// 带授权的 GET 请求
export function authGet<T = any>({
                                     url = '',
                                     param = {},
                                     errorMsg = '',
                                     errorFn,
                                 }: RequestOptions): Promise<T | null> {
    const keys = Object.keys(param);
    if (keys.length) {
        let str = '';
        for (let i = 0; i < keys.length; i++) {
          if (param) {
            str += keys[i] + '=' + param[keys[i]] + (i !== keys.length - 1 ? '&' : '');
          }
        }
        url = `${url}?${str}`;
    }

    return commonReq<T>(
        {
            method: 'get',
            url,
            baseURL,
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
            },
        },
        errorMsg,
        errorFn
    );
}
