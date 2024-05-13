import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Canvas = () => {
  const [nodes, setNodes] = useState([]);

  const [, drop] = useDrop({
    accept: ItemTypes.NODE,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round((item.left || 0) + delta.x);
      const top = Math.round((item.top || 0) + delta.y);
      setNodes(oldNodes => [...oldNodes, { ...item, left, top }]);
    },
  });

  return (
    <div ref={drop} style={{ width: '100%', height: '500px', position: 'relative', border: '1px solid black' }}>
      {nodes.map((node, index) => (
        <div key={index} style={{ position: 'absolute', left: node.left, top: node.top }}>
          {node.name}  
        </div>
      ))}
    </div>
  );
};

export default Canvas;
