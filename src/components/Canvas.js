import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import DraggableCanvasNode from './DraggableCanvasNode';
import Arrow from './Arrow';
import { NodeTypes } from './NodeTypes';
import { Modal, Button } from 'react-bootstrap';
import ListeningModalContent from './node-modals/ListeningModal';
import ConditionModalContent from './node-modals/ConditionModal';
import CreateEmailModalContent from './node-modals/CreateEmailModal';
import SendEmailModalContent from './node-modals/SendEmailModal';

const NODE_WIDTH = 150; // Define a fixed width for all nodes

const Canvas = () => {
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

  const canvasRef = useRef(null);

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

  return (
    <div ref={canvasRef} className="canvas-container" onMouseMove={handleMouseMove}>
      <div ref={drop} className="canvas-area">
        {connections.map((conn, index) => (
          <Arrow key={index} start={{ x: conn.start.x, y: conn.start.y }} end={{ x: conn.end.x, y: conn.end.y }} />
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
            width={NODE_WIDTH} // Ensure node has the fixed width
          />
        ))}
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

export default Canvas;
