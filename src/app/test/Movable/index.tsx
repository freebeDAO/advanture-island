"use client"
import { useRef } from "react"
import { MovableComponent } from "src/components/MovableComponent"

/**
 * weixin: 天蚕土豆丝，任务： 创建一个可移动的组件，位置变化需要更新到数据库
 */
export default function Home() {
  const contentRef = useRef()
  const componentRef = useRef()

  function contentClick(e) {
    const rect = contentRef.current.getBoundingClientRect()
    const left = e.clientX - rect.left
    const top = e.clientY - rect.top
    componentRef.current.runMove(left, top)
  }

  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative">
        <div
          ref={contentRef}
          className="border-[1px] w-[600px] h-[600px] relative overflow-hidden"
          onClick={(e) => {
            contentClick(e)
          }}
        >
          <MovableComponent
            ref={componentRef}
            config={{ dirction: "right", speed: 2 }}
          />
        </div>
      </div>
    </div>
  )
}
