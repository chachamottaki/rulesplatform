// src/components/Canvas.js

import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { placeNode } from '../redux/actions/nodeActions';  // Ensure you import placeNode

const Canvas = () => {
  const nodes = useSelector(state => state.canvas.nodes);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: 'NODE',
    drop: (item, monitor) => {
      console.log('Drop event triggered');
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const canvasElement = document.querySelector('.canvas');
        const rect = canvasElement.getBoundingClientRect();

        // Calculating the relative position and logging it
        const newX = clientOffset.x - rect.left;
        const newY = clientOffset.y - rect.top;
        console.log(`Placing node at: x=${newX}, y=${newY}`);  // Log new position

        dispatch(placeNode(item.id, { x: newX, y: newY }));  // Dispatch placeNode instead of moveNode
      }
    }
  });

  return (
    <div ref={drop} className="canvas" style={{ height: '100vh', width: '100vw', position: 'relative', border: '1px solid black' }}>
      {nodes.map(node => (
        <div key={node.id} style={{ position: 'absolute', left: node.x, top: node.y }}>
          {node.name}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
