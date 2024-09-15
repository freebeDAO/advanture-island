'use client';
import React,{useState, useEffect} from "react";

const JumpableComponent = () => {
    const [isJumping, setIsJumping] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                jump();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); 

    const jump = () => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => {
                setIsJumping(false);
            }, 500);
        }
    };


    return (
        <div
            className={`w-20 h-20 bg-purple-500 rounded-full cursor-pointer transition-transform duration-500 ${
                isJumping ? 'translate-y-[-50px]' : ''
          }`}
          onClick={jump}
        />

    );

}

export default JumpableComponent;