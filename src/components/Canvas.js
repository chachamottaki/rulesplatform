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
      // Check if the delta exists, otherwise no movement happened
      if (delta) {
        const left = Math.round((item.left || 0) + delta.x);
        const top = Math.round((item.top || 0) + delta.y);

        setNodes(oldNodes => {
          const existingIndex = oldNodes.findIndex(node => node.id === item.id);
          if (existingIndex !== -1) {
            // Node exists, update its position
            const updatedNodes = [...oldNodes];
            updatedNodes[existingIndex] = { ...item, left, top };
            return updatedNodes;
          } else {
            // New node, add it to the state
            return [...oldNodes, { ...item, left, top }];
          }
        });
      }
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
