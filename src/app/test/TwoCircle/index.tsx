"use client"
import { useEffect, useRef, useState } from "react"
import { DraggableComponent } from "src/components/DraggableComponent"

/**
 * weixin: 天蚕土豆丝，任务：实现两个圆之间的连接
 */

const circleWidth = 200

export default function Home() {
  const leftCircleRef = useRef()
  const rightCircleRef = useRef()
  const baseCoordinate = { x: 400, y: 200 }
  const [p1, setP1] = useState({ x: 300, y: 200 })
  const [p2, setP2] = useState({ x: 500, y: 200 })

  useEffect(() => {
    getLeftCoordinate()
    getRightCoordinate
  }, [])

  function getLeftCoordinate() {
    getCoordinate(leftCircleRef, setP1)
  }

  function getRightCoordinate() {
    getCoordinate(rightCircleRef, setP2, true)
  }

  function getCoordinate(ref: any, setP: any, isRight?: boolean) {
    const position = ref.current?.getPosition()
    if (isRight) {
      position.left = position.left + 400
    }
    const ciclePostion = {
      x: position.left + circleWidth / 2,
      y: position.top + circleWidth / 2,
    }

    const cicleToTarget = Math.sqrt(
      (baseCoordinate.x - ciclePostion.x) *
        (baseCoordinate.x - ciclePostion.x) +
        (baseCoordinate.y - ciclePostion.y) *
          (baseCoordinate.y - ciclePostion.y)
    )
    const xLength = !isRight
      ? baseCoordinate.x - position.left - circleWidth / 2
      : position.left - baseCoordinate.x + circleWidth / 2
    const yLength = baseCoordinate.y - position.top - circleWidth / 2
    // 左圆
    // (x-ciclePostion.x)/xLength = (circleWidth/2)/ cicleToTarget
    // (y-ciclePostion.y)/yLength = (circleWidth/2)/ cicleToTarget
    // 右圆
    // (ciclePostion.x -x)/xLength = (circleWidth/2)/ cicleToTarget
    // (y-ciclePostion.y)/yLength = (circleWidth/2)/ cicleToTarget
    let x
    if (!isRight) {
      x = (circleWidth / 2 / cicleToTarget) * xLength + ciclePostion.x
    } else {
      x = ciclePostion.x - (circleWidth / 2 / cicleToTarget) * xLength
    }
    const y = (circleWidth / 2 / cicleToTarget) * yLength + ciclePostion.y
    setP({ x, y })
  }
  return (
    <div className="flex space-x-2 justify-center">
      <div className="relative flex">
        <DraggableComponent ref={leftCircleRef} onMove={getLeftCoordinate}>
          <div
            className="rounded-full border-[2px] border-red-600"
            style={{ width: `${circleWidth}px`, height: `${circleWidth}px` }}
          ></div>
        </DraggableComponent>
        <DraggableComponent ref={rightCircleRef} onMove={getRightCoordinate}>
          <div
            className="rounded-full border-[2px] border-red-600"
            style={{ width: `${circleWidth}px`, height: `${circleWidth}px` }}
          ></div>
        </DraggableComponent>
        <svg className="absolute z-[-1]" height="400" width="808">
          <line
            x1={p1.x}
            y1={p1.y}
            x2={baseCoordinate.x}
            y2={baseCoordinate.y}
            style={{ stroke: "rgb(0,0,0)", strokeWidth: "1" }}
          />
          <line
            x1={p2.x}
            y1={p2.y}
            x2={baseCoordinate.x}
            y2={baseCoordinate.y}
            style={{ stroke: "rgb(0,0,0)", strokeWidth: "1" }}
          />
          <line
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            style={{ stroke: "rgb(0,0,0)", strokeWidth: "1" }}
          />
        </svg>
      </div>
    </div>
  )
}
