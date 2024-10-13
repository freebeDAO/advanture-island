// src/lib/session.ts
import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password:
    process.env.SESSION_PASSWORD ||
    "complex_password_at_least_32_characters_long",
  cookieName: "my-app-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // 确保在生产环境中使用 HTTPS
  },
};

// 声明会话中保存的数据类型
declare module "iron-session" {
  interface IronSessionData {
    walletVerificationCodes?: { [key: string]: string };
    userId?: number;
  }
}
