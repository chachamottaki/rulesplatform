// src/components/nodes/Node.js

import React from 'react';
import { useDrag } from 'react-dnd';

const Node = ({ id, name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NODE',
    item: { id, type, name },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {name}
    </div>
  );
};

export default Node;
