import { Shape } from 'src/components/ui/butsalt-style-control-component';
import { DemoComponent, DemoComponentProps } from './components/demo-component';

/**
 * weixin: butSalt，任务：创建一个样式控制组件，可以对目标组件进行样式控制
 */
function createDemo(shape: Shape): DemoComponentProps {
  return {
    initialModel: {
      shape,
      backgroundColor: '#dcfce7',
      borderWidth: 4,
      borderColor: '#86efac',
      fontSize: 24,
      fontColor: '#8b5cf6',
      fontH: 'center',
      fontV: 'center',
      borderRadius: 0,
      children: 'StyleControl'
    }
  }
}

const shapeList: Shape[] = [
  'circle',
  'ellipse',
  'rect',
  'triangle'
];

const demoList: DemoComponentProps[] = shapeList.map(createDemo);

export default function Page() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] grid grid-cols-4">
      {demoList.map((demo, i) => {
        return <DemoComponent key={i} {...demo} />
      })}
    </div>
  );
}
