'use client'
import React, {useState} from 'react';
import MovableComponent from '../../components/MovableComponent';

const directionOptions = ['up', 'down', 'left', 'right'];

const MovableComponentsDemo: React.FC = () => {
    const [position, setPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const [direction, setDirection] = useState<string>('right');
    const [speed, setSpeed] = useState<number | undefined>(undefined);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        setPosition({x, y});
    };

    const handleDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(event.target.value);
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(event.target.value));
    };

    return (
        <div style={{position: 'relative', height: '100%', width: '100%'}}>
            <div>
                <label htmlFor="direction">Direction:</label>
                <select id="direction" value={direction} onChange={handleDirectionChange}>
                    {directionOptions.map((dir) => (
                        <option key={dir} value={dir}>
                            {dir}
                        </option>
                    ))}
                </select>

                <label htmlFor="speed" style={{marginLeft: '10px'}}>Speed:</label>
                <input
                    id="speed"
                    type="number"
                    min="0"
                    value={speed}
                    onChange={handleSpeedChange}
                />
            </div>
            <div style={{position: 'relative', height: '100%', width: '100%'}} onClick={handleClick}>
                <MovableComponent position={{...position}} speed={speed} direction={direction}>
                    <div style={{width: '50px', height: '50px', backgroundColor: 'red'}}></div>
                </MovableComponent>
            </div>
        </div>
    )
};

export default MovableComponentsDemo;
