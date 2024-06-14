import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const ListeningModalContent = ({ node, saveApiEndpoint }) => {
  const apiEndpoints = [
    '/api/Sensor/districts/{district}/installations/{assetType}/{assetKey}/sensors/{sensorKey}:{sensorType}',
    '/api.example.com/endpoint2',
    '/api.example.com/endpoint3',
    '/api.example.com/endpoint4'
  ];

  const [apiEndpoint, setApiEndpoint] = useState(apiEndpoints[0]); // Initialize with the first endpoint
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);

  useEffect(() => {
    if (node) {
      setApiEndpoint(node.apiEndpoint || apiEndpoints[0]);
      setSelectedEndpoint(node.apiEndpoint || apiEndpoints[0]);
    }
  }, [node, apiEndpoints]);

  const handleInputChange = (e) => {
    setApiEndpoint(e.target.value);
  };

  const handleEndpointSelect = (endpoint) => {
    setApiEndpoint(endpoint);
    setSelectedEndpoint(endpoint);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveApiEndpoint(node.id, apiEndpoint);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formApiEndpoint">
          <Form.Label>API Endpoint</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter API endpoint"
            value={apiEndpoint}
            onChange={handleInputChange}
          />
          <DropdownButton
            id="dropdown-basic-button"
            title="Select another API Endpoint"
            className="mt-2"
          >
            {apiEndpoints.map((endpoint, index) => (
              <Dropdown.Item key={index} onClick={() => handleEndpointSelect(endpoint)}>
                {endpoint}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Form.Group>
        <Button variant="primary" type="submit" className="modal-save-btn">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default ListeningModalContent;
