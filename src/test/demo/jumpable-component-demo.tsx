import JumpableComponent from "src/components/ui/jumpable-component";

// Test Demo
const JumpableComponentDemo = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">任务一：可跳动的小球</h1>
        <p className="mb-4">点击空格或者鼠标单机可跳动</p>
        <div className="flex flex-col items-center justify-bottom h-screen bg-gray-100" >
            <JumpableComponent />
        </div>
      </div>
    );
  };
  
  export default JumpableComponentDemo;