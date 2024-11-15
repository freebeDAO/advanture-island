import React from 'react';

interface UseDraggableProps {
    items: string[];
    onItemsChange: (items: string[]) => void;
}

const DraggableComponent = ({ items, onItemsChange }: UseDraggableProps) => {
    const [source, setSource] = React.useState<number | null>(null);
    const [target, setTarget] = React.useState<number | null>(null);

    const onDragStart = (id: number) => (e: React.DragEvent) => {
        if (items[id]) {
            setSource(id);
        } else {
            e.preventDefault();
        }
    };

    const onDragOver = (id: number) => (e: React.DragEvent) => {
        e.preventDefault();
        setTarget(id);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setTarget(null);
    };

    const onDrop = () => {
        setSource(null);
        setTarget(null);
        if (target !== null && source !== null) {
            const newItems = [...items];
            newItems[target] = items[source];
            newItems[source] = '';
            onItemsChange(newItems);
        }
    };

    const onDragEnd = () => {
        setSource(null);
        setTarget(null);
    };

    return {
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onDragEnd,
        source,
        target,
    };
};

export default DraggableComponent;
