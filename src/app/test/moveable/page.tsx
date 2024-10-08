'use client'

import { useState } from "react";
import MovableComponent from "src/components/ui/MovableComponent";

const MoveableDemo = () => {
    const [nodes, setNodes] = useState([
        { id: '1', x: 300, y: 200 },
        { id: '3', x: 400, y: 300 },
    ]);

    return (
        <div 
            className="relative w-screen h-screen"
        >
            {
                nodes.map(node => (
                    <MovableComponent
                        key={node.id}
                        id={node.id}
                        initialX={node.x}
                        initialY={node.y}
                        containerWidth={1000}
                        containerHeight={800}
                    />
                ))
            }
            
        </div>
    )
}

export default MoveableDemo;