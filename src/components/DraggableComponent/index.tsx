import React, { useImperativeHandle, useState } from "react"
const contentWidth = 400
const DraggableComponent = React.forwardRef<any>((props, ref) => {
  const { children } = props
  const [current, setCurrent] = useState({
    left: contentWidth / 4,
    top: contentWidth / 4,
  })
  const [position, setPosition] = useState({
    left: contentWidth / 4,
    top: contentWidth / 4,
  })
  const [active, setActive] = useState(false)
  useImperativeHandle(ref, () => ({
    getPosition: () => {
      return { ...position }
    },
  }))

  function mouseDown(e: any) {
    setActive(true)
    const currentX = e.clientX - position.left
    const currentY = e.clientY - position.top
    setCurrent({ left: currentX, top: currentY })
  }

  function mouseMove(e: any) {
    if (active) {
      const left = e.clientX - current.left
      const top = e.clientY - current.top
      setPosition({ left, top })
      props.onMove?.()
    }
  }

  function mouseUp(e: any) {
    setActive(false)
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: `${contentWidth}px`, height: `${contentWidth}px` }}
    >
      <div
        className="absolute"
        onMouseMove={(e) => {
          mouseMove(e)
        }}
        onMouseDown={(e) => {
          mouseDown(e)
        }}
        onMouseUp={(e) => {
          mouseUp(e)
        }}
        onDragStart={(e) => {
          e.preventDefault()
        }}
        onDragEnd={(e) => {
          e.preventDefault()
        }}
        style={{ left: `${position.left}px`, top: `${position.top}px` }}
      >
        {children}
      </div>
    </div>
  )
})
DraggableComponent.displayName = "DraggableComponent"
export { DraggableComponent }
