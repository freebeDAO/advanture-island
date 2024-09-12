'use client'

import {PropsWithChildren, useState, WheelEventHandler} from "react";

interface ScaledProps extends PropsWithChildren {
    initialScale?: number // 初始缩放倍率
    step?: number // 缩放倍率
    onWheel?: (scale: number) => void // 监听缩放的回调函数
    minScale?: number // 最小的缩放比例(防止缩来看不到)
    maxScale?: number // 最大的缩放比例
}

export default function ScaledComponent(props: ScaledProps) {
    const {
        children,
        initialScale = 1,
        step = 0.1,
        onWheel,
        minScale = 0.1,
        maxScale = 6
    } = props

    const [scale, setScale] = useState(initialScale)

    const handleWheel: WheelEventHandler = (e) => {
        if (e.deltaY > 0) {
            setScale((v) => {
                if (v + step > maxScale || v + step === maxScale) {
                    return maxScale
                }
                return v + step
            })
        } else {
            setScale((v) => {
                if (v - step < minScale || v - step === minScale) {
                    return minScale
                }
                return v - step
            })
        }
        if (onWheel) onWheel(scale)
    }

    return <div className={'inline-block'} onWheel={handleWheel} style={{transform: `scale(${scale})`}}>
        {children}
    </div>
}
