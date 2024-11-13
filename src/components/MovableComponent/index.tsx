import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import GlobalEvent from "src/lib/utils/globalEvent"
const globalEvent = GlobalEvent.getInstance()
const baseWidth = 80
// const speed = 2 // 值越大，每次移动距离越远
const time = 5 // 值越大，移动抖动越大

const MovableComponent = React.forwardRef<any>((props, ref) => {
  const { speed = 2, autoDirection = "down" } = props.config
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const currentWs = useRef<any>()
  const flag = useRef<boolean>(true)
  const interval = useRef<any>()

  useImperativeHandle(ref, () => ({
    runMove: (x, y) => {
      clearInterval(interval.current)
      const ciclePoint = {
        x: position.x + baseWidth / 2,
        y: position.y + baseWidth / 2,
      }
      const totalLength = Math.sqrt(
        (x - ciclePoint.x) * (x - ciclePoint.x) +
          (y - ciclePoint.y) * (y - ciclePoint.y)
      )
      const totalTime = totalLength / speed
      const xspeed = (x - ciclePoint.x) / totalTime
      const yspeed = (y - ciclePoint.y) / totalTime
      totalTimeMove(totalTime, xspeed, yspeed)
    },
  }))

  function totalTimeMove(totalTime, xspeed, yspeed) {
    setTimeout(() => {
      setPosition((cur) => {
        return {
          y: cur.y + yspeed * time,
          x: cur.x + xspeed * time,
        }
      })
      if (totalTime - time >= 0) {
        totalTimeMove(totalTime - time, xspeed, yspeed)
      }
    }, time)
  }

  useEffect(() => {
    if (!flag.current) return
    flag.current = false
    createWs()
    autoMove()
    globalEvent.subscribe("keydown", (e: any) => {
      onKeyDown(e)
    })
  }, [])

  useEffect(() => {
    writePosition()
  }, [position.x, position.y])

  function autoMove() {
    interval.current = setInterval(() => {
      move(autoDirection)
    }, time)
  }

  function writePosition() {
    if (currentWs.current.readyState === 1) {
      currentWs.current.send(
        JSON.stringify({
          x: Number(position.x.toFixed(2)),
          y: Number(position.y.toFixed(2)),
        })
      )
    }
  }

  function move(direction: string) {
    console.log(position.y, position.x, direction)
    switch (direction) {
      case "up":
        setPosition((cur) => {
          return {
            y: cur.y - speed * time,
            x: cur.x,
          }
        })
        break
      case "down":
        setPosition((cur) => {
          console.log(cur, "cur")
          return {
            y: cur.y + speed * time,
            x: cur.x,
          }
        })
        break
      case "right":
        setPosition((cur) => {
          console.log(cur, "cur")
          return {
            y: cur.y,
            x: cur.x + speed * time,
          }
        })

        break
      case "left":
        setPosition((cur) => {
          console.log(cur, "cur")
          return {
            y: cur.y,
            x: cur.x - speed * time,
          }
        })

        break
    }
  }

  function onKeyDown(e: any) {
    clearInterval(interval.current)
    switch (e.keyCode) {
      case 38:
        move("up")
        break
      case 40:
        move("down")
        break
      case 39:
        move("right")
        break
      case 37:
        move("left")
        break
    }
  }

  function createWs() {
    const ws = new WebSocket("ws://localhost:8081")
    currentWs.current = ws
    ws.onopen = function () {
      // console.log("Connected to the server")
      // ws.send(JSON.stringify({ x: position.x, y: position.y }))
    }

    ws.onmessage = function (event) {
      console.log("来自服务器的消息 ", event.data)
    }

    ws.onclose = function () {
      console.log("服务器断开连接")
    }

    ws.onerror = function (error) {
      console.error("WebSocket error:", error)
    }
  }

  return (
    <div
      className="absolute rounded-full bg-[red]"
      style={{
        top: position.y,
        left: position.x,
        width: `${baseWidth}px`,
        height: `${baseWidth}px`,
      }}
    ></div>
  )
})
MovableComponent.displayName = "MovableComponent"
export { MovableComponent }
