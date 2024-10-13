"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/utils/api";
import { useRouter } from "next/navigation";

export default function SetupProfile() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!nickname || !avatar) {
      setErrorMessage("Please enter a nickname and upload an avatar.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("avatar", avatar);

      const response = await apiRequest(
        `/api/v1/user/profile`,
        "POST",
        formData,
        "multipart/form-data"
      );
      if (response.code === 0) {
        // 成功后跳转到 profile 页面
        router.push("/profile");
      } else {
        setErrorMessage("Failed to create profile.");
      }
    } catch (error) {
      setErrorMessage("Error creating profile.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="bg-white p-6 shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Set Up Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Nickname:</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>Avatar:</label>
            <input
              type="file"
              onChange={(e) =>
                setAvatar(e.target.files ? e.target.files[0] : null)
              }
              className="border p-2 w-full"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
