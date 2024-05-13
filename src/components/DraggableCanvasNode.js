import React from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';

const DraggableCanvasNode = ({ id, name, type, left, top }) => {
  const validType = NodeTypes[type?.toUpperCase()] || NodeTypes.DEFAULT; // Ensuring type is valid
  const [{ isDragging }, drag] = useDrag({
    type: validType,  // Use validated type
    item: { id, name, type, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="node" style={{
      position: 'absolute',
      left,
      top,
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move'
    }}>
      {name}
    </div>
  );
};

export default DraggableCanvasNode;
