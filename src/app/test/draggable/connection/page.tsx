'use client'

import { useRef, useState } from "react";
import DraggableComponent from "src/components/ui/draggable/DraggableComponent";
import ConnectingLine from "src/components/ui/draggable/ConnectingLine ";


const Home = () => {
    const componentRef = useRef(null);
    const [positions, setPositions] = useState({
        component1: { x: 100, y: 100 },
        component2: { x: 300, y: 300 }
    });

    const handlePositionChange = (id: string, newPosition: { x: number; y: number }) => {
        setPositions(prevPositions => ({
            ...prevPositions,
            [id]: newPosition
        }));
    };

    return  (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <DraggableComponent 
                id="component1" 
                initialPosition={positions.component1} 
                onPositionChange={handlePositionChange} 
            >
                <div className="w-24 h-24 border-2 border-black rounded-full"></div>
            </DraggableComponent>
            <DraggableComponent 
                id="component2" 
                initialPosition={positions.component2} 
                onPositionChange={handlePositionChange} 
            >
                <div className="w-24 h-24 border-2 border-black rounded-full"></div>
            </DraggableComponent>
            <ConnectingLine 
                start={{ x: positions.component1.x + 50, y: positions.component1.y + 50 }}
                end={{ x: positions.component2.x + 50, y: positions.component2.y + 50 }}
            />
        </div>
    );
}

export default Home;