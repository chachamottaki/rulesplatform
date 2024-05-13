// NodeSidebar.js
import React from 'react';
import DraggableNode from './DraggableNode';

const nodes = [
  { id: 1, name: 'Input Node', type: 'input' },
  { id: 2, name: 'Output Node', type: 'output' },
  
];

const NodeSidebar = () => {
  return (
    <div className="node-sidebar">
      {nodes.map(node => (
        <DraggableNode key={node.id} id={node.id} name={node.name} type={node.type} />
      ))}
    </div>
  );
};

export default NodeSidebar;
