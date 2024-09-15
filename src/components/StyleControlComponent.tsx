'use client'


import React from 'react'

type StyleControlComponentProps  ={
    sharp: string;
    bg_color: string;
}

const StyleControlComponent: React.FC<StyleControlComponentProps> = ({ sharp, bg_color }) => {
    let height = "100px"
    let rounded=''
    switch(sharp) {
        case 'circle':
            height = "100px"
            rounded="50%"
            break
        case 'rectangle':
            height = "100px"
            rounded="0%"
            break
        case 'ellipse':
            height = "50px"
            rounded="50%"
            break
        case 'rounded-rectangle':
            rounded="10%"
            break
        case 'triangle':
            break
       

    }


if (sharp === 'triangle') {
    return (
        <div className={`w-0 h-0 
            border-l-[50px] border-l-transparent
            border-b-[75px] 
            border-r-[50px] border-r-transparent`}
            style={{
                borderBottomColor: bg_color,
            }}
            >
        </div>
    )
}

  return (
        <div className={`w-[100px] `}  
            style={{
                backgroundColor: bg_color,
                height: height,
                borderRadius: rounded
            }}>
        </div>  
       
  )
}

export default StyleControlComponent;


