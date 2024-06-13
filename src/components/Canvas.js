import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableCanvasNode from './DraggableCanvasNode';
import ConnectorComponent from './ConnectorComponent';
import { NodeTypes } from './NodeTypes';
import { Modal, Button } from 'react-bootstrap'; // IMPORT REACT-BOOTSTRAP COMPONENTS
import ListeningModalContent from './node-modals/ListeningModal';
import ConditionModalContent from './node-modals/ConditionModal';
import CreateEmailModalContent from './node-modals/CreateEmailModal';
import SendEmailModalContent from './node-modals/SendEmailModal';

const Canvas = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [startNodeId, setStartNodeId] = useState(null);
  const [showListeningModal, setShowListeningModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false); 
  const [showCreateEmailModal, setShowCreateEmailModal] = useState(false); 
  const [showSendEmailModal, setShowSendEmailModal] = useState(false); 
  const [selectedNode, setSelectedNode] = useState(null);

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
            return [...oldNodes, { ...item, id: item.id || Math.random(), left, top, apiEndpoint: '', script: '', recipient: '', sender: '', subject: '', content: '' }];
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
    <div ref={drop} className="canvas-container">
      {connections.map((conn, index) => (
        <ConnectorComponent key={index} start={nodes.find(n => n.id === conn.startId)} end={nodes.find(n => n.id === conn.endId)} />
      ))}
      {nodes.map((node) => (
        <DraggableCanvasNode key={node.id} {...node} onStartConnection={startConnection} onEndConnection={endConnection} onDoubleClickNode={toggleModal} />
      ))}
      
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
