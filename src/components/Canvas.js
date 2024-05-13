import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { NodeTypes } from './NodeTypes';
import DraggableCanvasNode from './DraggableCanvasNode';

const Canvas = () => {
  const [nodes, setNodes] = useState([]);

  const [, drop] = useDrop({
    accept: Object.values(NodeTypes), // Accept all node types
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
        <DraggableCanvasNode key={index} {...node} />
      ))}
    </div>
  );
};

export default Canvas;
