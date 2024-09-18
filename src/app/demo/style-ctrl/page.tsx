'use client'

import { useRef } from "react";
import StyleControlComponent from "src/components/StyleControlComponent";

/**
 * weixin: xuquan_2021，任务：样式控制组件
 */
export default function Home() {

  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h4 className="text-2xl font-bold pb-4">样式控制组件</h4>

      <div style={{ width: 300, minHeight: 200, margin: '0 auto' }}>
        <StyleControlComponent
          defaultForm={{
            shape: 'circle',
            bgColor: '#eee',
            // borderWidth: 2,
            // text: '1111',
            fontSize: 20,
            fontColor: '#443b3b',
          }}
        />
      </div>
    </div>
  );
}
