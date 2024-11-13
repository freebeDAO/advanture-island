import { useEffect, useRef, useState } from "react"
type ShapeItem = {
  shape: string
  height: number
  borderRadius?: string
}
const padding = 10

export const StyleControlComponent: React.FC<any> = (props) => {
  const { children, config, baseWidth = 100 } = props
  const [pointList, setPointList] = useState([])
  const [preStyle, setPreStyle] = useState({})
  const content = useRef()
  useEffect(() => {
    setStyle()
  }, [config.shape])

  function setStyle() {
    const childDom = content.current?.children[0]
    if (childDom?.style) {
      childDom.style.display = "flex"
      const mergeStyle = { ...config, ...getComponentStyle() }
      const keys = Object.keys(mergeStyle)
      const tempPreStyle = {}
      backDefault(childDom)
      // console.log(keys, childDom.style, "keys")
      keys.forEach((item: any) => {
        if (childDom.style.hasOwnProperty(item)) {
          Object.assign(tempPreStyle, { [item]: childDom.style[item] })
          childDom.style[item] = mergeStyle[item]
        }
      })
      setPreStyle(tempPreStyle)
      console.log(tempPreStyle, "tempPreStyle")
      if (config.shape === "equilateralTriangle") {
        childDom.style.borderWidth = ""
        childDom.style.borderColor = ""
        setEquilateralTriangle()
      }
    }
  }

  function backDefault(childDom: any) {
    const keys = Object.keys(preStyle)
    // console.log(keys, "key")
    keys.forEach((item: any) => {
      // childDom.style[item] = preStyle[item]
      childDom.style[item] = ""
    })
  }

  function setEquilateralTriangle() {
    const borderWidth = parseInt(config.borderWidth)
    const poin0 = { x: baseWidth / 2 + padding, y: padding - borderWidth }
    const poin1 = {
      x: baseWidth + padding + (borderWidth * Math.sqrt(3)) / 2,
      y: padding + baseWidth + borderWidth / 2,
    }
    const poin2 = {
      x: padding - (borderWidth * Math.sqrt(3)) / 2,
      y: padding + baseWidth + borderWidth / 2,
    }
    setPointList([poin0, poin1, poin2])
  }

  // 设置形状
  function getComponentStyle() {
    const shapeStyle = [
      { shape: "circle", height: baseWidth, borderRadius: "50%" },
      {
        shape: "oval",
        height: (baseWidth * 3) / 4,
        borderRadius: "50%",
      },
      { shape: "rectangle", height: baseWidth / 2 },
      {
        shape: "roundedRectangle",
        height: baseWidth / 2,
        borderRadius: "10px",
      },
      { shape: "equilateralTriangle", height: baseWidth },
    ]
    const shape: ShapeItem = shapeStyle.find((item) => {
      return item.shape === config.shape
    })
    return {
      width: `${baseWidth}px`,
      height: `${shape.height}px`,
      borderRadius: shape.borderRadius,
      clipPath:
        config.shape === "equilateralTriangle"
          ? `polygon(${
              baseWidth / 2
            }px 0px, ${baseWidth}px ${baseWidth}px,0 ${baseWidth}px)`
          : undefined,
    }
  }

  return (
    <div className="relative" style={{ padding: `${padding}px` }} ref={content}>
      {children}
      {config.shape === "equilateralTriangle" && (
        <svg className="absolute z-[1] top-0 left-0" height="400" width="400">
          <line
            x1={pointList[0]?.x}
            y1={pointList[0]?.y}
            x2={pointList[1]?.x}
            y2={pointList[1]?.y}
            style={{
              stroke: config.borderColor,
              strokeWidth: parseInt(config.borderWidth) + "",
            }}
          />
          <line
            x1={pointList[1]?.x}
            y1={pointList[1]?.y}
            x2={pointList[2]?.x}
            y2={pointList[2]?.y}
            style={{
              stroke: config.borderColor,
              strokeWidth: parseInt(config.borderWidth) + "",
            }}
          />
          <line
            x1={pointList[2]?.x}
            y1={pointList[2]?.y}
            x2={pointList[0]?.x}
            y2={pointList[0]?.y}
            style={{
              stroke: config.borderColor,
              strokeWidth: parseInt(config.borderWidth) + "",
            }}
          />
        </svg>
      )}
    </div>
  )
}
