'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { number, set } from 'zod';

const nodeId = 1;
interface MovableProps {
    children?: React.ReactNode;
    parentRef?: React.RefObject<HTMLDivElement>;
    width?:number;
    height?:number;
    defaultSpeed?:number;
}
const defaultProps: Partial<MovableProps> = {
    width: 50,
    height: 50,
    defaultSpeed: 50,
};





const MovableComponent =  forwardRef((props: MovableProps,moveOutRef) => {
    const { children, parentRef, width, height,defaultSpeed} = { ...defaultProps, ...props }; 
    
    let isMovable = false;
    // 定义一个状态用于存储定时器ID
    const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);
    const offset = useRef({ x: 0, y: 0 });
    const [speed, setSpeed] = useState(defaultSpeed);
    let speedRef = useRef();
    speedRef.current = speed;
    // if(!moveRef) moveRef = useRef(null);
    const moveRef = useRef(null);
    // const moveRef = useRef({clientWidth:width,clientHeight:height});
    const getXY = () => {
        return {
            x:moveRef.current.style.left?parseInt(moveRef.current.style.left.replace('px', '')):0,
            y:moveRef.current.style.top?parseInt(moveRef.current.style.top.replace('px', '')):0
        };
    }
  

    const changeSpeed = (newSpeed: number) => {
        setSpeed(newSpeed);
        speedRef.current = newSpeed;
    }
    const changeXY = (x: number, y: number) => {
        // console.log(moveRef.current.style);
        moveRef.current.style.left = `${x}px`;
        moveRef.current.style.top = `${y}px`;
    }

    function limitPoint(newX:number,newY:number){
        let {minX,minY,maxX,maxY} = { 
            minX: 0, 
            minY: 0, 
            maxX: parentRef.current.clientWidth - moveRef.current.clientWidth, 
            maxY: parentRef.current.clientHeight - moveRef.current.clientHeight
        };     
        newX = Math.max(newX,minX);
        newX = Math.min(newX,maxX)
        newY = Math.max(newY,minY);
        newY = Math.min(newY,maxY);
        return {newX,newY};
    }
    function limitTargetPoint(dX: number, dY: number, newX:number,newY:number, target:{newLeft:number,newTop:number}){
        let {minX,minY,maxX,maxY} = { 
            minX: 0, 
            minY: 0, 
            maxX: parentRef.current.clientWidth - moveRef.current.clientWidth, 
            maxY: parentRef.current.clientHeight - moveRef.current.clientHeight
        };     
        if (target){
            if(dX>0) maxX = target.newLeft;
            if(dY>0) maxY = target.newTop;
            if(dX<0) minX = target.newLeft;
            if(dY<0) minY = target.newTop;
        }
        newX = Math.max(newX,minX);
        newX = Math.min(newX,maxX)
        newY = Math.max(newY,minY);
        newY = Math.min(newY,maxY);
        return {newX,newY};
    }
    //dX,dY用-1,0,1标识方向
    // -1,0表示左
    // 1,0表示右
    // 0,-1表示上
    // 0,1表示下
    const move = (dX: number, dY: number, target:{newLeft:number,newTop:number},isAuto?:boolean) => {
        // const x = moveRef.current.style.left?parseInt(moveRef.current.style.left.replace('px', '')):0;
        // const y = moveRef.current.style.top?parseInt(moveRef.current.style.top.replace('px', '')):0;
        const {x,y} = getXY();
        // console.log(`speed:${speedRef.current}`);
        let {ratioX,ratioY} = {ratioX:1.00,ratioY:1.00}
        let speed =  parseInt(speedRef.current);
        if(target){
            let xLength = Math.max(1, Math.abs(target.newLeft - x));
            let yLength = Math.max(1, Math.abs(target.newTop - y));
            if(xLength>yLength){
                ratioX = xLength/yLength;
                if(ratioX>speed){
                    ratioX = speed;
                    ratioY = speed/ratioX;
                }
            }else{
                ratioY = yLength/xLength;
                if(ratioY>100){
                    ratioY = 100;
                    ratioX = 100/ratioY;
                }
            }
        }
        let newX,newY;
        if(target || isAuto){
            newX = (speed/10) * dX * ratioX + x;
            newY = (speed/10) * dY * ratioY + y;
        }else{
            newX = (speed) * dX * ratioX + x;
            newY = (speed) * dY * ratioY + y;
        }
        
        if(parentRef){
            //限制不出边界
            let result;
            if(target){
                result = limitTargetPoint(dX,dY,newX,newY,target);
            }else{
                result = limitPoint(newX,newY);
            }
            newX = result.newX;
            newY = result.newY;
        }           
        if (newX >= 0 && newY >= 0 ) {
            moveRef.current.style.left = `${newX}px`;
            moveRef.current.style.top = `${newY}px`;
        }
        if(target!=null && target.newLeft == newX && target.newTop == newY){
            // console.log(`${target.newLeft},${target.newTop}`);
            // console.log(`${newX},${newY}`);
            return true;
        }
        if(isAuto){
            if((newX == 0 && newY == 0) || (newX == 0 && newY == parentRef.current.clientHeight - moveRef.current.clientHeight) ||
                (newX == parentRef.current.clientWidth - moveRef.current.clientWidth && newY == parentRef.current.clientHeight - moveRef.current.clientHeight) || (newY == 0 && newX == parentRef.current.clientWidth - moveRef.current.clientWidth)){
                    return true;
                }
        }
        return false;
    }

    function moveToPoint(target:{newLeft:number,newTop:number}){
        // console.log(`${target.newLeft },${target.newTop}`);
        const {x,y} = getXY();
        let speed = parseInt(speedRef.current);
        if(speed>0){
            let id = setInterval(()=>{
                let dX,dY;
                if(target.newLeft > x){
                    dX = 1;
                }else if(target.newLeft == x){
                    dX = 0;
                }else{
                    dX = -1;
                }
                if(target.newTop > y){
                    dY = 1;
                }else if(target.newTop == y){
                    dY = 0;
                }else{
                    dY = -1;
                }
                let isOver = move(dX,dY,target);
                // console.log(`${isOver}`);
                if(isOver){
                    clearInterval(id);
                    setTimerId(null);
                    // setIsMovable(false);
                    isMovable = false;
                }
            }, parseInt(100/speed)); 
            setTimerId(id);
        }        
    }
    const autoMove = (dX: number, dY: number) =>{
        if(dX==0 && dY==0){
            return;
        }
        // console.log(`autoMove:${dX},${dY}`);
        const {x,y} = getXY();
        let speed = parseInt(speedRef.current);
        if(speed>0){
            let id = setInterval(()=>{
                let isOver = move(dX,dY,null,true);
                if(isOver){
                    clearInterval(id);
                    setTimerId(null);
                    isMovable = false;
                }
            }, parseInt(100/speed)); 
            setTimerId(id);
        }        
    }
    function handleKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowUp':
                move(0,-1,null);
                break;
            case 'ArrowDown':
                move(0,1,null);
                break;
            case 'ArrowLeft':
                move(-1,0,null);
                break;
            case 'ArrowRight':
                move(1,0,null);
                break;
            default:
         }
    }
    function handleMouseClick(e: MouseEvent){
        if(!isMovable){
            offset.current.x =  e.clientX - parentRef.current?.offsetLeft;
            offset.current.y =  e.clientY - parentRef.current?.offsetTop;
            let moveToLeft = offset.current.x - parseInt(width/2);
            let moveToTop = offset.current.y - parseInt(height/2);
            let limit = limitPoint(moveToLeft,moveToTop);
            moveToLeft = limit.newX;
            moveToTop = limit.newY;
            isMovable = true;
            moveToPoint({newLeft:moveToLeft,newTop:moveToTop});
        };
    }
        
      
    useEffect(() => {
        // changeXY(initX,initY);
        //案件移动
        document.addEventListener('keydown', handleKeyDown);
        // document.addEventListener('keyup', handleKeyUp);
        if(parentRef){
            parentRef.current.addEventListener('click', handleMouseClick);
        }else{
            document.addEventListener('click', handleMouseClick);
        }
        return () => {
            // window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('keydown', handleKeyDown);
            // document.removeEventListener('keyup', handleKeyUp);
            if(!parentRef){
                document.removeEventListener('click', handleMouseClick);
            }
        };
    }, []);
    useImperativeHandle(moveOutRef, () => ({
        getXY: ()=>getXY(),
        changeSpeed: (newSpeed:number)=>changeSpeed(newSpeed),
        changeXY: (x:number,y:number)=>changeXY(x,y),
        autoMove: (dX:number,dY:number)=>autoMove(dX,dY)
    }));
    return (
        <>
        <div ref={moveRef}
        style={{position: 'relative', width: `${width}px`,height: `${height}px`}}>
            {children}
        </div>
        </>
    );
});

export default MovableComponent;
