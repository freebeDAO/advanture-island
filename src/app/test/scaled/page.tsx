import ScaledComponent from "src/components/scaledComponent/ScaledComponent";

export default function Page() {
    return <div className={'w-full h-[100vh] flex justify-center items-center'}>
        <ScaledComponent step={0.2} minScale={0.1} maxScale={6}>
            <div className={'w-32 h-32 rounded-full bg-green-500 flex items-center justify-center'}>
                滚动鼠标缩放
            </div>
        </ScaledComponent>
    </div>
}