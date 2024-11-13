import { useState } from "react"

export const ScaledComponent: React.FC<any> = (props) => {
  const { children } = props
  const [scaleRate, setScaleRate] = useState<number>(1)
  function enlarge() {
    setScaleRate((val: number) => {
      if (val < 1) {
        return val + 0.25
      } else {
        return val + 1
      }
    })
  }

  function shrink() {
    setScaleRate((val: number) => {
      if (val <= 0) {
        return 0
      }
      if (val === 1) {
        return val - 0.25
      } else {
        return val - 1
      }
    })
  }

  return (
    <div className="flex">
      <div className="flex overflow-hidden w-[200px] h-[200px] mr-[5px] items-center justify-center border-[1px]">
        <div style={{ transform: `scale(${scaleRate})` }}>{children}</div>
      </div>
      <div>
        <div
          className="cursor-pointer text-blue-600 text-[16px]"
          onClick={() => {
            enlarge()
          }}
        >
          放大
        </div>
        <div
          className="cursor-pointer text-blue-600 text-[16px]"
          onClick={() => {
            shrink()
          }}
        >
          缩小
        </div>
      </div>
    </div>
  )
}
