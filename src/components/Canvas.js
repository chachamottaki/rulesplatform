import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableCanvasNode from './DraggableCanvasNode';
import ConnectorComponent from './ConnectorComponent';
import { NodeTypes } from './NodeTypes';
import UploadSidebar from './UploadSidebar';


const Canvas = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [startNodeId, setStartNodeId] = useState(null);
  const [showUploadSidebar, setShowUploadSidebar] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null); //to have info abt node, for later when render sidebar content for example

  const [, drop] = useDrop({
    accept: Object.values(NodeTypes),
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round((item.left || 0) + delta.x);
        const top = Math.round((item.top || 0) + delta.y);

        setNodes(oldNodes => {
          const existingIndex = oldNodes.findIndex(node => node.id === item.id);
          if (existingIndex !== -1) {
            const updatedNodes = [...oldNodes];
            updatedNodes[existingIndex] = { ...item, left, top };
            return updatedNodes;
          } else {
            return [...oldNodes, { ...item, id: item.id || Math.random(), left, top }];
          }
        });
      }
    },
  });

  const startConnection = (nodeId) => {
    setConnecting(true);
    setStartNodeId(nodeId);
  };

  const endConnection = (nodeId) => {
    if (connecting && startNodeId && startNodeId !== nodeId) {
      setConnections([...connections, { startId: startNodeId, endId: nodeId }]);
      setConnecting(false);
      setStartNodeId(null);
    }
  };

  const toggleUploadSidebar = (nodeId) => {
    setSelectedNode(nodes.find(n => n.id === nodeId)); // Optional, if you need info about the node
    setShowUploadSidebar(prev => !prev);
  };

  return (
    <div ref={drop} style={{ width: '100%', height: '500px', position: 'relative', border: '1px solid black' }}>
      {connections.map((conn, index) => (
        <ConnectorComponent key={index} start={nodes.find(n => n.id === conn.startId)} end={nodes.find(n => n.id === conn.endId)} />
      ))}
      {nodes.map((node) => (
        <DraggableCanvasNode key={node.id} {...node} onStartConnection={startConnection} onEndConnection={endConnection} onDoubleClickNode={toggleUploadSidebar} />
      ))}
    {showUploadSidebar && <UploadSidebar onClose={() => setShowUploadSidebar(false)} />}
    </div>
  );
};

export default Canvas;
