import Image from 'next/image';
import DraggerComponent from 'src/components/ui/DraggerComponent';

const DraggerComponentDemo: React.FC = () => {
  return (
    <div className="w-80 h-80">
      <div className="relative w-full h-screen ">
        <h1 className="text-2xl font-bold mb-4">
          拖动组件
        </h1>
        <DraggerComponent className="bg-blue-100 shadow-md rounded-lg p-4">
          <p className="font-medium text-center w-40">拖我</p>
        </DraggerComponent>
      </div>
    </div>
  );
};

export default DraggerComponentDemo;