import React from 'react';
import Canvas from '../components/Canvas';
import NodeSidebar from '../components/NodeSidebar';
import { Button } from 'react-bootstrap';
import '../res/CreateRuleComponent.css'; // Import the CSS file

const CreateRuleComponent = ({ onBack }) => {
  return (
    <div className="create-rule-container">
      <Button onClick={onBack} className="back-button">
        Back
      </Button>
      <div className="main-content">
        <div className="nodes-sidebar-container">
          <NodeSidebar />
        </div>
        <div className="canvas-container">
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default CreateRuleComponent;
