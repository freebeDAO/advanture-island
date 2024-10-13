// src/api/user.ts
import { apiRequest } from "src/lib/utils/api";

type UserDetails = {
  id: string;
  wallet: string | null;
  name: string | null;
  avatar: string | null;
};

export enum SerializeType {
  None = "none",
  Local = "local",
}

class User {
  private userDetails: UserDetails | null = null;

  constructor() {
    this.loadUserFromLocalStorage();
  }

  // 从 localStorage 中加载用户信息
  private loadUserFromLocalStorage() {
    if (typeof window !== "undefined") {
      const userDetail = localStorage.getItem("userDetail");
      if (userDetail) {
        this.userDetails = JSON.parse(userDetail);
      }
    }
  }

  // 获取用户详情
  getUserDetails() {
    return this.userDetails;
  }

  // 设置用户详情，并根据 serializeType 决定是否序列化
  setUserDetails(
    userDetails: UserDetails,
    serializeType: SerializeType = SerializeType.None
  ) {
    this.userDetails = userDetails;
    if (serializeType === SerializeType.Local) {
      localStorage.setItem("userDetail", JSON.stringify(userDetails));
    }
  }

  // 根据 serializeType 序列化数据
  private serializeUserData(serializeType: SerializeType) {
    if (serializeType === SerializeType.Local && this.userDetails) {
      localStorage.setItem("userDetail", JSON.stringify(this.userDetails));
    }
  }
}

// 导出 User 类的实例
const user = new User();
export default user;

// 从后端 API 获取用户信息并更新
export const getUserDetailsFromApi = async (token: string) => {
  try {
    const response = await apiRequest("/api/v1/user/getDetail", "POST", null);
    if (response.code === 0) {
      user.setUserDetails(response.data, SerializeType.Local);
    }
    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
