"use client"
import { Avatar, AvatarImage } from "src/components/ui/avatar"
import { DraggableComponent } from "src/components/DraggableComponent"

/**
 * weixin: 天蚕土豆丝，任务： 创建一个拖动的组件，使对象可以被拖动
 */
export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DraggableComponent>
        <Avatar>
          <AvatarImage src="/assets/logo.png"></AvatarImage>
        </Avatar>
      </DraggableComponent>
    </div>
  )
}
