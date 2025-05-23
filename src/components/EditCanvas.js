import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import DraggableCanvasNode from './DraggableCanvasNode';
import Arrow from './Arrow';
import { NodeTypes } from './NodeTypes';
import { Modal, Button, Alert } from 'react-bootstrap';
import ListeningModalContent from './node-modals/ListeningModal';
import ConditionModalContent from './node-modals/ConditionModal';
import CreateEmailModalContent from './node-modals/CreateEmailModal';
import SendEmailModalContent from './node-modals/SendEmailModal';

const NODE_WIDTH = 150; // Define a fixed width for all nodes

const EditCanvas = ({ initialNodes, initialConnections, existingRuleChainId, ruleName, ruleDescription }) => { // ADDED ruleName and ruleDescription
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [startConnector, setStartConnector] = useState(null);
  const [currentMousePosition, setCurrentMousePosition] = useState({ x: 0, y: 0 });
  const [showListeningModal, setShowListeningModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showCreateEmailModal, setShowCreateEmailModal] = useState(false);
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message visibility

  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('Initial Nodes:', initialNodes);
    console.log('Initial Connections:', initialConnections);
    setNodes(initialNodes);
    setConnections(initialConnections);
  }, [initialNodes, initialConnections]);

  const [{ canDrop, isOver }, drop] = useDrop({
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
            updatedNodes[existingIndex] = { ...item, left, top, width: NODE_WIDTH }; // Ensure node has the fixed width
            return updatedNodes;
          } else {
            return [...oldNodes, { ...item, id: item.id || Math.random(), left, top, width: NODE_WIDTH, apiEndpoint: '', script: '', recipient: '', sender: '', subject: '', content: '' }];
          }
        });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const startConnection = (nodeId, connectorType, x, y) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setConnecting(true);
    setStartConnector({ nodeId, connectorType, x: x - canvasRect.left, y: y - canvasRect.top });
  };

  const endConnection = (nodeId, connectorType, x, y) => {
    if (connecting && startConnector.nodeId !== nodeId) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      setConnections([...connections, { start: startConnector, end: { nodeId, connectorType, x: x - canvasRect.left, y: y - canvasRect.top } }]);
      setConnecting(false);
      setStartConnector(null);
    }
  };

  const handleMouseMove = (event) => {
    if (connecting) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      setCurrentMousePosition({ x: event.clientX - canvasRect.left, y: event.clientY - canvasRect.top });
    }
  };

  const updateConnectorPosition = (nodeId, left, top) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const connectorLeft = left;
    const connectorRight = left + NODE_WIDTH; // Use the fixed node width
    const connectorTop = top + 25; // Adjust this value based on your node height

    setConnections(oldConnections => oldConnections.map(conn => {
      if (conn.start.nodeId === nodeId) {
        return {
          ...conn,
          start: {
            ...conn.start,
            x: connectorRight, // Recalculating the x position of the start connector
            y: connectorTop,   // Recalculating the y position of the start connector
          }
        };
      }
      if (conn.end.nodeId === nodeId) {
        return {
          ...conn,
          end: {
            ...conn.end,
            x: connectorLeft, // Recalculating the x position of the end connector
            y: connectorTop,  // Recalculating the y position of the end connector
          }
        };
      }
      return conn;
    }));
  };

  const toggleModal = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      switch (node.type) {
        case NodeTypes.LISTENING:
          setShowListeningModal(true);
          break;
        case NodeTypes.CONDITION:
          setShowConditionModal(true);
          break;
        case NodeTypes.CREATEMAIL:
          setShowCreateEmailModal(true);
          break;
        case NodeTypes.SENDEMAIL:
          setShowSendEmailModal(true);
          break;
        default:
          break;
      }
    }
  };

  const closeModal = () => {
    setShowListeningModal(false);
    setShowConditionModal(false);
    setShowCreateEmailModal(false);
    setShowSendEmailModal(false);
    setSelectedNode(null);
  };

  const saveApiEndpoint = (nodeId, apiEndpoint) => {
    setNodes(oldNodes => oldNodes.map(node => 
      node.id === nodeId ? { ...node, apiEndpoint } : node
    ));
  };

  const saveScript = (nodeId, script) => {
    setNodes(oldNodes => oldNodes.map(node => 
      node.id === nodeId ? { ...node, script } : node
    ));
  };

  const saveEmailDetails = (nodeId, emailDetails) => {
    setNodes(oldNodes => oldNodes.map(node => 
      node.id === nodeId ? { ...node, ...emailDetails } : node
    ));
  };

  const deleteNode = (nodeId) => {
    setNodes(oldNodes => oldNodes.filter(node => node.id !== nodeId));
    setConnections(oldConnections => oldConnections.filter(conn => conn.start.nodeId !== nodeId && conn.end.nodeId !== nodeId));
  };

  const handleSave = async () => {
    const payload = {
      ruleChainId: existingRuleChainId, // Ensure you pass the ruleChainId
      name: ruleName, // Use the ruleName from props
      description: ruleDescription, // Use the ruleDescription from props
      nodes: nodes.map(node => {
        const configuration = {
          apiEndpoint: node.apiEndpoint || "",
          script: node.script || "",
          recipient: node.recipient || "",
          sender: node.sender || "",
          subject: node.subject || "",
          content: node.content || ""
        };

        const nodeConnections = connections
          .filter(conn => conn.start.nodeId === node.id)
          .map(conn => ({
            targetNodeIndex: conn.end.nodeId // Keeping this as a string as per your last note
          }));

        return {
          ruleNodeId: node.ruleNodeId, // Use the existing ruleNodeId
          nodeUUID: node.id, // Added nodeUUID field
          nodeType: node.type,
          configurationJson: JSON.stringify(configuration),
          nodeConnections,
          ruleChainID: existingRuleChainId, // Pass the ruleChainID
          left: node.left, // Add the left position
          top: node.top // Add the top position
        };
      })
    };

    console.log('Payload:', JSON.stringify(payload, null, 2)); // Log payload for debugging

    try {
      const response = await axios.put(`https://localhost:7113/api/RuleChains/${existingRuleChainId}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Saved successfully:', response.data);
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error('Error saving rule chain:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div ref={canvasRef} onMouseMove={handleMouseMove}>
      <div ref={drop} className="canvas-area">
        {showSuccessMessage && (
          <Alert variant="success" className="success-alert" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
            Rule edited successfully!
          </Alert>
        )}
        {connections.map((conn, index) => (
          <Arrow key={index} start={{ x: nodes.find(node => node.id === conn.start.nodeId)?.left + NODE_WIDTH, y: nodes.find(node => node.id === conn.start.nodeId)?.top + 25 }} end={{ x: nodes.find(node => node.id === conn.end.nodeId)?.left, y: nodes.find(node => node.id === conn.end.nodeId)?.top + 25 }} />
        ))}
        {connecting && startConnector && (
          <Arrow start={{ x: startConnector.x, y: startConnector.y }} end={currentMousePosition} />
        )}
        {nodes.map((node) => (
          <DraggableCanvasNode
            key={node.id}
            {...node}
            onStartConnection={startConnection}
            onEndConnection={endConnection}
            onDoubleClickNode={toggleModal}
            onUpdatePosition={updateConnectorPosition} // Propagate position updates
            onDeleteNode={deleteNode} // Add delete functionality
            width={NODE_WIDTH} // Ensure node has the fixed width
          />
        ))}
        <Button onClick={handleSave} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          Save Edited Rule Chain
        </Button>
      </div>
      
      <Modal show={showListeningModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Listening Node Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListeningModalContent node={selectedNode} saveApiEndpoint={saveApiEndpoint} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConditionModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Condition Node Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ConditionModalContent node={selectedNode} saveScript={saveScript} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateEmailModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Email Node Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEmailModalContent node={selectedNode} saveEmailDetails={saveEmailDetails} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSendEmailModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Send Email Node Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SendEmailModalContent node={selectedNode} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditCanvas;
