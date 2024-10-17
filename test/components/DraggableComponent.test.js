import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import DraggableDemo from "@/test/demo/DraggableDemo";

describe("DraggableComponent", () => {
    let originalOffsetParent;

    const resizeElement = (element, size) => {
        Object.defineProperty(element, "clientWidth", {
            value: size,
            configurable: true,
        });
        Object.defineProperty(element, "clientHeight", {
            value: size,
            configurable: true,
        });
    };

    beforeAll(() => {
        originalOffsetParent = Element.prototype.offsetParent;
        Element.prototype.offsetParent = {
            getBoundingClientRect: () => ({ left: 0, top: 0 }),
        };
        resizeElement(HTMLElement.prototype, 500);
    });

    afterAll(() => {
        Element.prototype.offsetParent = originalOffsetParent;
    });
    it("渲染成功", () => {
        const container = render(<DraggableDemo />);
        expect(container.baseElement).toBeInTheDocument();
    });

    //   it('框内拖拽', async () => {

    //     const { container,getByTestId } = render(<DraggableDemo  />);
    //     const draggableElement = getByTestId('draggable-div');
    //     console.log(document.getElementById('draggable-div'));
    //     console.log(document.querySelector('[data-testid="draggable-div"]'));
    //     resizeElement(draggableElement,50);

    //     const initialPosition = { clientX: -10, clientY: -10 }; // 初始鼠标位置
    //     // 模拟mousemove事件，移动到新位置
    //     const newLeft = 20; // 新的x坐标
    //     const newTop = 30; // 新的y坐标
    //     const moveEvent = { clientX: initialPosition.clientX + newLeft, clientY: initialPosition.clientY + newTop };
    //     // 模拟mousedown事件触发拖动开始
    //     fireEvent.mouseDown(draggableElement,initialPosition);

    //     fireEvent.mouseMove(document, moveEvent);
    //     fireEvent.mouseUp(document);
    //     // console.log(draggableElement.style);
    //     expect(draggableElement.style.left).toBe(`${newLeft}px`);
    //     expect(draggableElement.style.top).toBe(`${newTop}px`);
    //   });

    //   it('框外拖拽', () => {
    //     const { getByTestId } = render(<DraggableDemo />);
    //     const draggableElement = getByTestId('draggable-div');
    //     resizeElement(draggableElement,50);
    //     const initialPosition = { clientX: -10, clientY: -10 };
    // // 模拟mousemove事件，移动到新位置
    //     const newLeft = 100; // 新的x坐标
    //     const newTop = 100; // 新的y坐标
    //     const moveEvent1 = { clientX: initialPosition.clientX + newLeft, clientY: initialPosition.clientY + newTop };
    //     fireEvent.mouseDown(draggableElement, initialPosition);
    //     //移动2次
    //     fireEvent.mouseMove(document, moveEvent1);
    //     expect(draggableElement.style.left).toBe(`${newLeft}px`);
    //     expect(draggableElement.style.top).toBe(`${newTop}px`);
    //     // 尝试将元素拖出边界
    //     const moveEvent2 = { clientX: 600, clientY: 600 }; // 这会导致超出边界
    //     fireEvent.mouseMove(document, moveEvent2);
    //     // console.log(draggableElement.style);
    //     // 验证元素的位置没有超出允许范围
    //     expect(parseInt(draggableElement.style.left)).toBeLessThanOrEqual(500); // 假设容器宽度为500px
    //     expect(parseInt(draggableElement.style.top)).toBeLessThanOrEqual(500); // 假设容器高度为500px
    //   });
});
