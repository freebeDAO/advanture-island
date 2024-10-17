import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ScaledComponent from "@/components/ScaledComponent";

describe("ScaledComponent", () => {
    it("渲染成功", () => {
        const container = render(<ScaledComponent />);
        expect(container.baseElement).toBeInTheDocument();
    });

    it("默认大小", () => {
        const { getByTestId } = render(<ScaledComponent />);
        const componentDiv = getByTestId("scaled-div");
        expect(componentDiv).toHaveStyle(`
      width: 100px;
      height: 100px;
      font-size: 18px;
    `);
    });

    it("放大尺寸", () => {
        const { getByTestId } = render(<ScaledComponent />);
        const inputRange = getByTestId("scaled-slider");
        fireEvent.change(inputRange, { target: { value: 75 } });

        const componentDiv = getByTestId("scaled-div");
        expect(componentDiv).toHaveStyle(`
      width: 150px; 
      height: 150px;
      font-size: 27px;
    `);
    });

    it("缩小尺寸", () => {
        const { getByTestId } = render(<ScaledComponent />);
        const inputRange = getByTestId("scaled-slider");
        fireEvent.change(inputRange, { target: { value: 25 } });

        const componentDiv = getByTestId("scaled-div");
        expect(componentDiv).toHaveStyle(`
      width: 50px; 
      height: 50px;
      font-size: 9px;
    `);
    });

    it("自定义内容", () => {
        const customContent = "Custom Text";
        const { getByTestId } = render(
            <ScaledComponent content={customContent} />
        );
        const componentDiv = getByTestId("scaled-div");
        expect(componentDiv).toHaveTextContent(customContent);
    });
});
