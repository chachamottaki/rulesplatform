import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';

const CreateEmailModalContent = ({ node, saveEmailDetails }) => {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (node) {
      setRecipient(node.recipient || '');
      setSender(node.sender || '');
      setSubject(node.subject || '');
      setContent(node.content || '');
    }
  }, [node]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'recipient':
        setRecipient(value);
        break;
      case 'sender':
        setSender(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'content':
        setContent(value);
        break;
      default:
        break;
    }
  };

  const handleInsertPlaceholder = (placeholder, field) => {
    if (field === 'recipient') {
      setRecipient(recipient + placeholder);
    } else {
      setContent(content + placeholder);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmailDetails(node.id, { recipient, sender, subject, content });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRecipient">
          <Form.Label>Recipient (To:)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipient email or use placeholder"
            name="recipient"
            value={recipient}
            onChange={handleInputChange}
          />
          <Dropdown className="mt-2 mb-4"> {/* Added mb-4 class for margin-bottom */}
            <Dropdown.Toggle variant="secondary">
              Insert Default
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleInsertPlaceholder('{{recipientEmail}}', 'recipient')}>Recipient Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="formSender" className="mb-2"> {/* Added mb-4 class for margin-bottom */}
          <Form.Label>Sender (From:)</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter sender email"
            name="sender"
            value={sender}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formSubject" className="mb-2"> {/* Added mb-4 class for margin-bottom */}
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email subject"
            name="subject"
            value={subject}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter email content"
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="secondary">
              Insert Placeholder
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleInsertPlaceholder('{{assetKey}}')}>Asset Key</Dropdown.Item>
              <Dropdown.Item onClick={() => handleInsertPlaceholder('{{AlarmID}}')}>Alarm ID</Dropdown.Item>
              <Dropdown.Item onClick={() => handleInsertPlaceholder('{{DeviceID}}')}>Device ID</Dropdown.Item>
              <Dropdown.Item onClick={() => handleInsertPlaceholder('{{shortDescription}}')}>Short Description</Dropdown.Item>
              <Dropdown.Item onClick={() => handleInsertPlaceholder('{{longDescription}}')}>Long Description</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Button variant="primary" type="submit" className="modal-save-btn">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default CreateEmailModalContent;
