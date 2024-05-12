// NodeSidebar.js
import React from 'react';
import Node from './Node';

const nodes = [
  { id: 1, name: 'Input Node', type: 'input' },
  { id: 2, name: 'Output Node', type: 'output' },
  // add more nodes here 
];

const NodeSidebar = () => {
  return (
    <div style={{ width: '200px', height: '100vh', overflowY: 'auto', backgroundColor: '#f4f4f4', padding: '10px', borderRight: '1px solid #ddd' }}>
      {nodes.map(node => (
        <Node key={node.id} id={node.id} name={node.name} type={node.type} />
      ))}
    </div>
  );
};

export default NodeSidebar;
