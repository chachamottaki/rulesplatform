import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

// Draggable component for nodes on the canvas
const DraggableCanvasNode = ({ id, name, type, left, top }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NODE,
    item: { id, name, type, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{
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

const Canvas = () => {
  const [nodes, setNodes] = useState([]);

  const [, drop] = useDrop({
    accept: ItemTypes.NODE,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round((item.left || 0) + delta.x);
      const top = Math.round((item.top || 0) + delta.y);

      // Update existing nodes or add new ones
      setNodes(oldNodes => {
        const existingNode = oldNodes.find(node => node.id === item.id);
        if (existingNode) {
          return oldNodes.map(node =>
            node.id === item.id ? { ...node, left, top } : node
          );
        } else {
          return [...oldNodes, { ...item, left, top }];
        }
      });
    },
  });

  return (
    <div ref={drop} style={{ width: '100%', height: '500px', position: 'relative', border: '1px solid black' }}>
      {nodes.map((node, index) => (
        <DraggableCanvasNode key={index} {...node} />
      ))}
    </div>
  );
};

export default Canvas;
