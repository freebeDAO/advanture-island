'use client'
import React, {useState} from 'react';
import MovableComponent from '../../components/MovableComponent';

const MovableComponentsDemo: React.FC = () => {
    const [position, setPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setPosition({x, y});
        console.log(x, y);
    };

    return (
        <div style={{position: 'relative', height: '100%', width: '100%'}} onClick={handleClick}>
            <MovableComponent position={{...position}}>
                <div style={{width: '50px', height: '50px', backgroundColor: 'red'}}></div>
            </MovableComponent>
        </div>
    );
};

export default MovableComponentsDemo;
