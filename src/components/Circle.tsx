'use client'

import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

function Box() {
    const ref = useRef(null)

    const [,drag] = useDrag({
        type: 'box',
        item: {
            color: 'blue'
        }
    })

    drag(ref)

    return <div className='w-8 h-8 bg-blue-500 cursor-pointer rounded-full' ref={ref}></div>
}

function Container() {
    const ref = useRef(null);

    const [,drop] = useDrop(() => {
        return {
            accept: 'box',
            drop(item) {
                console.log(item);
            }
        }
    });
    drop(ref);

    return <div className='w-56 h-56 border-2' ref={ref}></div>
}

export default function Circle(){
    return <div>
        <Container></Container>
        <Box></Box>
    </div>
}