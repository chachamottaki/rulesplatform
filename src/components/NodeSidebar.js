import React from 'react';
import DraggableNode from './DraggableNode';
import { v4 as uuidv4 } from 'uuid';
import '../res/styles/NodeSidebar.css'; // Import the CSS file

const NodeSidebar = () => {
  const nodes = [
    { name: 'Listen', type: 'Listening' },
    { name: 'Condition', type: 'ConditionCheck' },
    { name: 'Create e-mail', type: 'EmailCreation' },
    { name: 'Send e-mail', type: 'EmailSending' },
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
