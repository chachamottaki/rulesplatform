import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ListeningModalContent = ({ node, saveApiEndpoint }) => {
  const [apiEndpoint, setApiEndpoint] = useState('');

  useEffect(() => {
    if (node) {
      setApiEndpoint(node.apiEndpoint || '');
    }
  }, [node]);

  const handleInputChange = (e) => {
    setApiEndpoint(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveApiEndpoint(node.id, apiEndpoint);
  };

  return (
    <div>
      {/*<p>Node ID: {node?.id}</p>*/}
      <p>Node Name: {node?.name}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formApiEndpoint">
          <Form.Label>API Endpoint</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter API endpoint"
            value={apiEndpoint}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="modal-save-btn">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default ListeningModalContent;
