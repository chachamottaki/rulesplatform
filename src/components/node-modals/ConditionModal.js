import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const ConditionModalContent = ({ node, saveScript }) => {
  const predefinedScript = '(sendEmailValue && !invertSendEmail) || (!sendEmailValue && invertSendEmail)';
  const [script, setScript] = useState(predefinedScript);

  useEffect(() => {
    if (node) {
      setScript(node.script || predefinedScript);
      saveScript(node.id, node.script || predefinedScript); // Save the script from node or default predefined script
    }
  }, [node, saveScript, predefinedScript]);

  const handleInputChange = (e) => {
    setScript(e.target.value);
  };

  const handleInsertPlaceholder = (placeholder) => {
    setScript(script + placeholder);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveScript(node.id, script);
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
          />
          <DropdownButton
            id="dropdown-basic-button"
            title="Insert Placeholder"
            className="mt-2"
          >
            <Dropdown.Item onClick={() => handleInsertPlaceholder('sendEmailValue')}>sendEmailValue</Dropdown.Item>
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
