import React from 'react';
import Canvas from '../components/Canvas';
import NodeSidebar from '../components/NodeSidebar';

const CreateRule = () => {
  return (
    <div className="rulechains-container">
      <div className="nodes-sidebar-container">
        <NodeSidebar />
      </div>
      <Canvas />
    </div>
  );
};

export default CreateRule;
