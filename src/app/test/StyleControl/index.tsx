"use client"
import { StyleControlComponent } from "src/components/StyleControlComponent"
import { useState } from "react"

/**
 * weixin: 天蚕土豆丝，任务：创建一个样式控制组件，可以对目标组件进行样式控制
 */
// function Fill() {
//   return <div className="w-[210px] h-[210px]">测试文字</div>
// }

export default function Home() {
  const [activeItem, setActiveItem] = useState({
    shape: "circle",
    backgroundColor: "black",
    borderWidth: "3px",
    borderColor: "yellow",
    fontSize: "12px",
    justifyContent: "flex-start",
    alignItems: "stretch",
  })

  function activeShape(type: string) {
    const shapeList = [
      {
        shape: "circle",
        backgroundColor: "black",
        borderWidth: "3px",
        borderColor: "yellow",
        fontSize: "12px",
        justifyContent: "flex-start",
        alignItems: "stretch",
      },
      {
        shape: "oval",
        backgroundColor: "yellow",
        borderWidth: "4px",
        borderColor: "black",
        fontSize: "18px",
        justifyContent: "center",
        alignItems: "center",
      },
      {
        shape: "rectangle",
        backgroundColor: "red",
        borderWidth: "5px",
        borderColor: "yellow",
        fontSize: "22px",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      },
      {
        shape: "roundedRectangle",
        backgroundColor: "green",
        borderWidth: "6px",
        borderColor: "red",
        fontSize: "26px",
      },
      {
        shape: "equilateralTriangle",
        backgroundColor: "orange",
        borderWidth: "6px",
        borderColor: "green",
        fontSize: "30px",
      },
    ]
    const item = shapeList.find((element: any) => {
      return element.shape === type
    })
    setActiveItem(item)
  }
  return (
    <div className="flex justify-center">
      <div>
        <div className="flex space-x-2">
          <div
            className="cursor-pointer text-blue-600 text-[16px]"
            onClick={() => {
              activeShape("circle")
            }}
          >
            圆
          </div>
          <div
            className="cursor-pointer text-blue-600 text-[16px]"
            onClick={() => {
              activeShape("oval")
            }}
          >
            椭圆
          </div>
          <div
            className="cursor-pointer text-blue-600 text-[16px]"
            onClick={() => {
              activeShape("rectangle")
            }}
          >
            矩形
          </div>
          <div
            className="cursor-pointer text-blue-600 text-[16px]"
            onClick={() => {
              activeShape("roundedRectangle")
            }}
          >
            圆角矩形
          </div>
          <div
            className="cursor-pointer text-blue-600 text-[16px]"
            onClick={() => {
              activeShape("equilateralTriangle")
            }}
          >
            正三角形
          </div>
        </div>
        <StyleControlComponent config={activeItem} baseWidth={200}>
          <div className="w-[210px] h-[210px]">测试文字</div>
        </StyleControlComponent>
      </div>
    </div>
  )
}
