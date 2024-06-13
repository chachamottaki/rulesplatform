import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ConditionModalContent = ({ node, saveScript }) => {
  const predefinedScript = '(sendEmailValue && !invertSendEmail) || (!sendEmailValue && invertSendEmail)';

  useEffect(() => {
    if (node) {
      saveScript(node.id, predefinedScript); // Save the predefined script immediately when the modal opens
    }
  }, [node, saveScript, predefinedScript]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No need to save again as it's already saved in useEffect
  };

  return (
    <div>
      <h2>Condition Node Configurations</h2>
      <p>Node ID: {node?.id}</p>
      <p>Node Name: {node?.name}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPredefinedCondition">
          <Form.Label>Predefined Condition</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            readOnly
            value={predefinedScript}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Confirm
        </Button>
      </Form>
    </div>
  );
};

export default ConditionModalContent;
