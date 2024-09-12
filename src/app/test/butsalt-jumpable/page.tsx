import { Jumpable } from 'src/components/ui/butsalt-jumpable';

/**
 * weixin: butSalt，任务：创建一个可跳动的组件
 */
export default function Page() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex justify-center	 items-center">
      <div>
        <Jumpable />
      </div>
    </div>
  );
}
