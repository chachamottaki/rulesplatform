import React from 'react';
import Canvas from '../components/Canvas';
import NodeSidebar from '../components/NodeSidebar';

const RuleChains = () => {
  return (
    <div className="rulechains-container">
      <div className="nodes-sidebar-container">
        <NodeSidebar />
      </div>
      <div className="canvas-container">
        <Canvas />
      </div>
    </div>
  );
};

export default RuleChains;
