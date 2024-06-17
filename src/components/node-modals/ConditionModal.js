import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const ConditionModalContent = ({ node, saveScript }) => {
  const predefinedScript = '(sendEmail && !invertSendEmail) || (!sendEmail && invertSendEmail)';
  const [script, setScript] = useState(predefinedScript);

  useEffect(() => {
    if (node) {
      const initialScript = node.script || predefinedScript;
      setScript(initialScript); // Set the initial script without saving it
    }
  }, [node, predefinedScript]);

  const handleInputChange = (e) => {
    setScript(e.target.value);
  };

  const handleInsertPlaceholder = (placeholder) => {
    setScript(prevScript => `${prevScript}${placeholder}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveScript(node.id, script); // Save the script only on form submission
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formConditionScript">
          <Form.Label>Condition Script</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={script}
            onChange={handleInputChange}
            placeholder="Enter your condition script here"
          />
          <DropdownButton
            id="dropdown-basic-button"
            title="Insert Placeholder"
            className="mt-2"
          >
            <Dropdown.Item onClick={() => handleInsertPlaceholder('sendEmail')}>sendEmail</Dropdown.Item>
            <Dropdown.Item onClick={() => handleInsertPlaceholder('invertSendEmail')}>invertSendEmail</Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Confirm
        </Button>
      </Form>
    </div>
  );
};

export default ConditionModalContent;
