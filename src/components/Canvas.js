// src/components/Canvas.js

import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { moveNode } from '../redux/actions/nodeActions';

const Canvas = () => {
  const nodes = useSelector(state => state.canvas.nodes);
  const dispatch = useDispatch();
  
  const [, drop] = useDrop({
    accept: 'NODE',
    drop: (item, monitor) => {
      const delta = monitor.getSourceClientOffset();
      if (delta) {
        dispatch(moveNode(item.id, { x: delta.x, y: delta.y }));
      }
    }
  });

  return (
    <div ref={drop} style={{ height: '100vh', width: '100vw', position: 'relative', border: '1px solid black' }}>
      {nodes.map(node => (
        <div key={node.id} style={{ position: 'absolute', left: node.x, top: node.y }}>
          {node.name}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
