'use client'

import { useRef } from "react";
import ScaledComponent, { RefHandle } from "src/components/ScaledComponent";

/**
 * weixin: xuquan_2021，任务：放大缩小组件
 */
export default function Home() {

  const scaleRef = useRef<RefHandle>(null);

  const handleZoomIn = () => scaleRef.current?.onZoomIn();
  const handleZoomOut = () => scaleRef.current?.onZoomOut();
  const handleScaleMax = () => scaleRef.current?.onZoomIn(Infinity);
  const handleScaleMin = () => scaleRef.current?.onZoomOut(-Infinity);

  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h4 className="text-2xl font-bold pb-4">缩放组件</h4>

      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleZoomIn()}
        >
          放大
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleZoomOut()}
        >
          缩小
        </button>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleScaleMax()}
        >
          最大
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => handleScaleMin()}
        >
          最小
        </button>
      </div>

      <div className="flex items-center justify-center" style={{ height: 400 }}>
        <ScaledComponent ref={scaleRef}>
          <div className=" bg-gray-200" style={{ width: 200, height: 200 }}></div>
        </ScaledComponent>
      </div>
    </div>
  );
}
