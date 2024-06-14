import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditCanvas from '../components/EditCanvas';
import NodeSidebar from '../components/NodeSidebar';
import { Button } from 'react-bootstrap';
import '../res/EditRuleComponent.css'; // Import the CSS file

const EditRuleComponent = ({ onBack, ruleChainId }) => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    fetchRuleChainData();
  }, []);

  const fetchRuleChainData = async () => {
    try {
      const response = await axios.get(`https://localhost:7113/api/RuleChains/${ruleChainId}`);
      const ruleChain = response.data;
      const parsedNodes = ruleChain.nodes.map(node => {
        const config = JSON.parse(node.configurationJson);
        return {
          id: node.nodeUUID,
          name: node.nodeType,
          type: node.nodeType,
          left: config.left || 0, // Default to 0 if not set
          top: config.top || 0, // Default to 0 if not set
          ...config
        };
      });
      setNodes(parsedNodes);
      const parsedConnections = ruleChain.nodes.flatMap(node =>
        node.nodeConnections.map(conn => ({
          start: { nodeId: node.nodeUUID },
          end: { nodeId: conn.targetNodeIndex }
        }))
      );
      setConnections(parsedConnections);
    } catch (error) {
      console.error('Error fetching rule chain data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="edit-rule-container">
      <Button onClick={onBack} className="back-button">
        Back
      </Button>
      <div className="main-content">
        <div className="nodes-sidebar-container">
          <NodeSidebar />
        </div>
        <div className="canvas-container">
          <EditCanvas initialNodes={nodes} initialConnections={connections} />
        </div>
      </div>
    </div>
  );
};

export default EditRuleComponent;
