// NodeSidebar.js
import React from 'react';
import DraggableNode from './DraggableNode';
import { v4 as uuidv4 } from 'uuid';

const NodeSidebar = () => {
  const nodes = [
    { name: 'Input Node', type: 'input' },
    { name: 'Output Node', type: 'output' },
    { name: 'Upload Config', type: 'upload' },
    // add more nodes
  ];

  return (
    <div className="node-sidebar">
      {nodes.map((node, index) => (
        <DraggableNode key={index} id={uuidv4()} name={node.name} type={node.type} />
      ))}
    </div>
  );
};

export default NodeSidebar;
