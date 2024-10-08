'use client'

import DraggableComponent from "src/components/ui/draggable/DraggableComponent";

const Home = () => {
    return <DraggableComponent initialPosition={{ x: 120, y: 120 }}><div className="w-24 h-24 bg-red-500">拖动我试试</div></DraggableComponent>
}

export default Home;