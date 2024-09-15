import ScaledComponent from "src/components/ui/scalable-component";

const ScaledComponentDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">任务二：可缩放的小球</h1>
        <p className="text-gray-100">按键 🔼 或 🔽 可缩放</p>
        <div className="flex flex-col items-center justify-bottom h-screen bg-gray-100" >
        <ScaledComponent
          width={80}
          height={80}
          scale={1}
        >
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            
          </div>
        </ScaledComponent>
        </div>
      </div>
  );
}

export default ScaledComponentDemo;
