"use client"
import { JumpableComponent } from "src/components/JumpableComponent"

/**
 * weixin: 天蚕土豆丝，任务： 创建一个拖动的组件，使对象可以被拖动
 */
export default function Home() {
  return (
    <div className="flex justify-center pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative">
        <JumpableComponent />
      </div>
    </div>
  )
}
