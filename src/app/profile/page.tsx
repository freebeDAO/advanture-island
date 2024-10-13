"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserDetailsFromApi } from "src/api/user";

interface UserProfile {
  nickname: string;
  avatar: string;
  address: string;
}

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 获取存储的 JWT token
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Token is missing, redirecting to login.");
          router.push("/login"); // 如果 token 不存在，跳转到登录页
          return;
        }

        // 调用后端 API 获取用户信息
        const response = await getUserDetailsFromApi(token);
        if (response.code === 0) {
          setUserData(response.data);
        } else {
          setErrorMessage("Failed to fetch profile data.");
        }
      } catch (error) {
        setErrorMessage("Error fetching profile.");
      }
    };

    fetchUserProfile();
  }, [router]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="bg-white p-6 shadow-md w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-8">
          {userData.nickname}'s Profile
        </h2>
        <img
          src={userData.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-xl">Wallet Address: {userData.address}</p>
      </div>
    </div>
  );
}
