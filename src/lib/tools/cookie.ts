// Cookie 操作函数
export const setCookie = (key, value, days = 1) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // 根据指定天数设置有效期
    document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookie = (key) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, currentCookie) => {
        const [name, value] = currentCookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    return cookies[key];
};

export const deleteCookie = (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// 在页面加载时延长 Cookie 的有效期
export const extendCookieExpiration = (key, days = 1) => {
    const cookieValue = getCookie(key);
    if (cookieValue) {
        setCookie(key, cookieValue, days); // 重新设置 Cookie，有效期延长
    }
};
