import React from 'react';
import Canvas from '../components/Canvas';
import NodeSidebar from '../components/NodeSidebar';

const RuleChains = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <NodeSidebar />
      <Canvas />
    </div>
  );
};

export default RuleChains;