"use client";
import React, { useState, useEffect } from "react";
import "animate.css";

interface JumpableProps {
    children?: React.ReactNode;
}
const JumpableComponent: React.FC<JumpableProps> = (props: JumpableProps) => {
    const { children } = { ...props };
    const [isBouncing, setIsBouncing] = useState(false);
    // const style = {
    //     position: "relative",
    //     width: "200px",
    //     height: "100px",
    //     border: "1px solid black",
    //     // backgroundColor: 'red',
    // };

    const handleBounce = () => {
        setIsBouncing(true);
        setTimeout(() => {
            setIsBouncing(false);
        }, 1000);
    };
    const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            handleBounce();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);
    return (
        <>
            <div
                data-testid="jumpable-div"
                // style={style}
                className={`${isBouncing ? "animate__animated animate__bounce" : ""}`}
                onClick={handleBounce}
            >
                {children}
            </div>
        </>
    );
};

export default JumpableComponent;
