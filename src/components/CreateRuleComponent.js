import React, { useState } from 'react';
import Canvas from '../components/Canvas';
import NodeSidebar from '../components/NodeSidebar';
import { Button, Form } from 'react-bootstrap';
import '../res/styles/CreateRuleComponent.css'; // Import the CSS file

const CreateRuleComponent = ({ onBack }) => {
  const [name, setName] = useState(""); // State for name
  const [description, setDescription] = useState(""); // State for description

  return (
    <div className="create-rule-container">
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
          <Canvas ruleName={name} ruleDescription={description} />
        </div>
      </div>
    </div>
  );
};

export default CreateRuleComponent;
