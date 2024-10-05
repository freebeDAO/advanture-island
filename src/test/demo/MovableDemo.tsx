'use client'
import MovableComponent from '@/components/MovableComponent'
import { forwardRef, useEffect, useRef, useState } from 'react';
import { set } from 'zod';


interface MovableDemoProps {
    initX?: number;
    initY?: number;
    initSpeed?: number;
}
const defaultProps: Partial<MovableDemoProps> = {
    initX: 0,
    initY: 0,
    initSpeed: 50
};

const MovableDemo = forwardRef((props:MovableDemoProps, moveRef) => {
    const { initX, initY, initSpeed } = { ...defaultProps, ...props }; 
    const parentRef = useRef(null);
    let speed = Math.abs(initSpeed);
    speed = Math.min(100, speed);
    const [ratio, setValue] = useState(speed); 
    // 定义两个状态变量来保存下拉框的值
    const [horizontalValue, setDropdownValue1] = useState<number>(0);
    const [verticalValue, setDropdownValue2] = useState<number>(0);
    if(!moveRef) moveRef = useRef(null);
    useEffect(() => {
        moveRef.current.changeXY(initX, initY);
        return () => {
            
        };
    }, []);  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber;
        setValue(value);
        moveRef.current.changeSpeed(value);
    }
    const handleMoveClick = () => {
        moveRef.current.autoMove(horizontalValue, verticalValue);
      };

    return (
        <div style={{ width: '100%' }}>
            <div className="flex items-center gap-2">
            <label htmlFor="select-dropdown" className="block text-sm font-medium text-gray-700">
                调整速度：
            </label>

            <input type="range"  min={10} max={100} value={ratio} onChange={handleChange}/>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="select-dropdown" className="block text-sm font-medium text-gray-700">
                    水平方向：
                </label>
                <select value={horizontalValue} onChange={(e) => setDropdownValue1(e.target.value)}
                    className="block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value="-1">向左</option>
                    <option value="0">不移</option>
                    <option value="1">向右</option>
                </select>
                <label htmlFor="select-dropdown" className="block text-sm font-medium text-gray-700">
                    垂直方向：
                </label>
                <select value={verticalValue} onChange={(e) => setDropdownValue2(e.target.value)}
                    className="block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value="-1">向上</option>
                    <option value="0">不移</option>
                    <option value="1">向下</option>
                </select>

                <button onClick={handleMoveClick} className="mr-2" >移动</button>
    
            </div>
            
            <div style={{ width: '100%', height: '500px', border: '1px solid blue' }} ref={parentRef}>
                <MovableComponent ref={moveRef} defaultSpeed={speed} parentRef={parentRef}>
                    <div  style={{ width: '50px', height: '50px',border: '1px solid black', backgroundColor: 'red' }}></div>
                </MovableComponent>
            </div>
        </div>
        
    )
});
export default MovableDemo;