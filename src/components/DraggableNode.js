import React from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';
import { v4 as uuidv4 } from 'uuid';

const DraggableNode = ({ id, name, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: NodeTypes[type.toUpperCase()] || NodeTypes.DEFAULT,
    item: () => ({ id: uuidv4(), name, type }), // Always assign a new ID when dragging from sidebar
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="node" style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}>
      {name}
    </div>
  );
};

export default DraggableNode;
