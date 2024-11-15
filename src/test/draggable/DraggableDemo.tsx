"use client"

import React from 'react';
import styled from 'styled-components';
import './App.css';
import DraggableComponent from '../../components/draggable/DraggableComponent';

const Wrapper = styled.div`
    height: 60vh;
    width: 70vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    place-items: center;
`;

const PlaceHolder = styled.div`
    border: .7rem dashed hsl(192, 100%, 50%);
    padding: .7rem;
    &.highlight {
        background-color: rgba(255,255,255, .7);
        border: .7rem dashed hsl(32, 100%, 50%);
    }
`;

const ItemContainer = styled.div`
    border: .3rem dotted hsl(128, 100%, 50%);
    padding: .1rem;
    width: 7rem;
    height: 7rem;
    line-height: 7rem;
    &.current {
        border: .3rem dotted red;
    }
`;

const Card = styled.div`
    font-size: 4rem;
    background-color: hsl(168, 80%, 80%);
    color: hsl(30, 90%, 50%);
    font-weight: bold;
    &.current {
        background-color: hsl(168, 60%, 90%);
        color: white;
    }
`;

const INIT_ITEMS: string[] = [
    '🦴','👀','','👁',
    '','🐞','🐳','',
    '❄️','','🐼','',
];

export default function Demo() {
    const [items, setItems] = React.useState<string[]>(INIT_ITEMS);

    const {
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onDragEnd,
        source,
        target
    } = DraggableComponent({
        items,
        onItemsChange: setItems
    });

    return (
        <Wrapper>
            {items.map((x, index) => (
                <PlaceHolder key={index}
                    className={target === index ? 'highlight' : ''}
                    onDragOver={!x ? onDragOver(index) : undefined}
                    onDragLeave={onDragLeave}
                >
                    <ItemContainer
                        className={source === index ? 'current' : ''}
                        draggable={!!x}
                        onDragStart={onDragStart(index)}
                        onDrop={onDrop}
                        onDragEnd={onDragEnd}
                    >
                        <Card>{x}</Card>
                    </ItemContainer>
                </PlaceHolder>
            ))}
        </Wrapper>
    );
}
