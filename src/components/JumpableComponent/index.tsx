import { useEffect, useState } from "react"
import GlobalEvent from "src/lib/utils/globalEvent"
const globalEvent = GlobalEvent.getInstance()
const time = 5
const totalCost = 350
export const JumpableComponent: React.FC<any> = () => {
  const [position, setPosition] = useState({ top: 578, left: 0 })

  useEffect(() => {
    globalEvent.subscribe("keydown", (e: any) => {
      onKeyDown(e)
    })
  }, [])

  function onKeyDown(e: any) {
    e.preventDefault()
    switch (e.keyCode) {
      case 32:
        startMove()
        break
    }
  }

  function down(totalTime: number, coust: number) {
    const hasTime = totalTime - time - coust
    if (hasTime <= 0) {
      return
    }
    setTimeout(() => {
      // 根据自由落体公式计算移动距离
      setPosition({
        top: (10 * (coust + time) * (coust + time)) / 1000 / 2,
        left: 0,
      })
      down(totalTime, totalTime - hasTime)
    }, time)
  }

  function up(totalTime: number, coust: number) {
    const hasTime = totalTime - time - coust
    if (hasTime <= 0) {
      down(totalCost, 0)
      return
    }
    setTimeout(() => {
      // 根据自由落体公式计算移动距离
      const totalLength =
        (10 * (totalTime - time) * (totalTime - time)) / 1000 / 2
      setPosition({
        top: totalLength - (10 * (coust + time) * (coust + time)) / 1000 / 2,
        left: 0,
      })
      up(totalTime, totalTime - hasTime)
    }, time)
  }

  function startMove() {
    up(totalCost, 0)
  }

  return (
    <div
      className="absolute bg-[red] rounded-full w-[100px] h-[100px]"
      onClick={() => {
        startMove()
      }}
      style={{ top: position.top, left: position.left }}
    ></div>
  )
}
