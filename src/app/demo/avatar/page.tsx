'use client'

import {Avatar, AvatarImage} from 'src/components/ui/avatar';

/**
 * weixin: godisdog007，任务：测试任务
 */
export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
	  <Avatar>
		<AvatarImage src="/assets/logo.png"></AvatarImage>
	  </Avatar>
    </div>
  );
}
