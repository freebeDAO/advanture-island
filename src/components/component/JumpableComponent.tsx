"use client";

import React, { useState, useEffect } from "react";

const JumpableComponent: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);

  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // 阻止空格键的默认行为
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`w-20 h-20 bg-blue-500 rounded-full cursor-pointer transition-transform duration-500 ${
        isJumping ? "transform -translate-y-10" : ""
      }`}
      onClick={jump}
    />
  );
};

export default JumpableComponent;
