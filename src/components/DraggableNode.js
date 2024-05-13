import React from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';

const DraggableNode = ({ id, name, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: NodeTypes[type.toUpperCase()] || NodeTypes.DEFAULT,  // Using node type from NodeTypes
    item: { id, name, type },
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
