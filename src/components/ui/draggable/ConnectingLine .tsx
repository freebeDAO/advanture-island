
interface ConnectingLineProps {
    start: {x: number, y: number}
    end: {x: number, y: number}
}

const ConnectingLine:React.FC<ConnectingLineProps> = ({start, end}) => {
    const midX = (start.x + end.x) / 2;

    const path = `M ${start.x} ${start.y} 
                  L ${midX} ${start.y} 
                  L ${midX} ${end.y} 
                  L ${end.x} ${end.y}`;
  
    return (
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 10 10"
            refX="1" refY="5"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black"/>
          </marker>
        </defs>
        <path
          d={path}
          fill="none"
          stroke="black"
          strokeWidth="2"
          markerEnd="url(#triangle)"
        />
      </svg>
    );

}

export default ConnectingLine;