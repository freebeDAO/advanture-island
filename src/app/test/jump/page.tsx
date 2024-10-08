import JumpableComponent from "src/components/ui/JumpableComponent";

const JumpDemo = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">按空格键或者点击圆形 让他跳动</h1>
        <JumpableComponent>
            <div className="w-40 h-40 bg-blue-500 rounded-full"></div>
        </JumpableComponent>
      </div>
    );
  };
  
  export default JumpDemo;