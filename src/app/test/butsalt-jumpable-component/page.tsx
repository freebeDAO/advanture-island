import { JumpableComponent } from 'src/components/ui/butsalt-jumpable-component';

/**
 * weixin: butSalt，任务：创建一个可跳动的组件
 */
export default function Page() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex justify-center	 items-center">
      <div>
        <JumpableComponent>
          <div className="bg-cyan-500 w-[300px] h-[300px]">
            点击我!
            <br />
            或者
            <br />
            按空格
          </div>
        </JumpableComponent>
      </div>
      <div className="ml-24">
        <JumpableComponent>
          这个同理
        </JumpableComponent>
      </div>
    </div>
  );
}
