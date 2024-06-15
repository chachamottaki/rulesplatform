import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditCanvas from '../components/EditCanvas'; // Make sure to use EditCanvas
import NodeSidebar from '../components/NodeSidebar';
import { Button, Form } from 'react-bootstrap'; // Import Form for input fields
import '../res/EditRuleComponent.css'; // Import the CSS file

const EditRuleComponent = ({ onBack, ruleChainId, initialName, initialDescription }) => {
  const [name, setName] = useState(initialName); // State for name
  const [description, setDescription] = useState(initialDescription); // State for description
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    fetchRuleChainData();
  }, []);

  const fetchRuleChainData = async () => {
    try {
      const response = await axios.get(`https://localhost:7113/api/RuleChains/${ruleChainId}`);
      const ruleChain = response.data;
      setName(ruleChain.name); // Set name
      setDescription(ruleChain.description); // Set description
      const parsedNodes = ruleChain.nodes.map(node => {
        const config = JSON.parse(node.configurationJson);
        return {
          id: node.nodeUUID,
          name: node.nodeType,
          type: node.nodeType,
          left: node.left || 0, // Default to 0 if not set
          top: node.top || 0, // Default to 0 if not set
          ruleNodeId: node.ruleNodeId, // INCLUDE THE EXISTING NODE ID
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
          <Form className="rule-details-form">
            <Form.Group controlId="ruleName">
              <Form.Label>Rule Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter rule name"
              />
            </Form.Group>
            <Form.Group controlId="ruleDescription">
              <Form.Label>Rule Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter rule description"
              />
            </Form.Group>
          </Form>
          
        </div>
        <div className="canvas-container">
          <EditCanvas
            initialNodes={nodes}
            initialConnections={connections}
            existingRuleChainId={ruleChainId}
            ruleName={name} // Pass name
            ruleDescription={description} // Pass description
          />
        </div>
      </div>
    </div>
  );
};

export default EditRuleComponent;
