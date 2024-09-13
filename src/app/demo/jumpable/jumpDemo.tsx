'use client'
import LuffyQVersion from 'src/components/JumpableComponent';
/**
 * weixin: wchen446352746，任务：测试任务 跳动组件demo
 */
const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <h1 className="text-3xl font-bold mb-6">路飞跳动</h1>
      <LuffyQVersion />
      <p className="mt-4 text-lg text-gray-700">点击路飞或按空格让他跳动！</p>
    </div>
  );
};

export default DemoPage;
