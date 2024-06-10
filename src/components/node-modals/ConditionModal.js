import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ConditionModalContent = ({ node }) => {
  const [script, setScript] = useState('');

  useEffect(() => {
    if (node) {
      setScript(node.script || '');
    }
  }, [node]);

  const handleInputChange = (e) => {
    setScript(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the script here, for now we just log it
    console.log('C# Script:', script);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formScript">
          <Form.Label>Enter Condition</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="C# script"
            value={script}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default ConditionModalContent;
