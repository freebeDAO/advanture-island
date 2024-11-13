"use client"
import { Avatar, AvatarImage } from "src/components/ui/avatar"
import { ScaledComponent } from "src/components/ScaledComponent"

/**
 * weixin: 天蚕土豆丝，任务： 创建一个放大缩小的组件，使目标对象可以放大缩小
 */
export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ScaledComponent>
        <Avatar>
          <AvatarImage src="/assets/logo.png"></AvatarImage>
        </Avatar>
      </ScaledComponent>
    </div>
  )
}
