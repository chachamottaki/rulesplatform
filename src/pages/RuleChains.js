// RuleChains.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../res/styles/RuleChains.css';
import CreateRuleComponent from '../components/CreateRuleComponent';
import EditRuleComponent from '../components/EditRuleComponent';
import LogsComponent from '../components/LogsComponent'; // Import the LogsComponent

const RuleChains = () => {
  const [ruleChains, setRuleChains] = useState([]);
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [showEditRule, setShowEditRule] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState(null);
  const [ruleToEdit, setRuleToEdit] = useState(null);

  useEffect(() => {
    fetchRuleChains();
  }, []);

  const fetchRuleChains = async () => {
    try {
      const response = await axios.get('https://localhost:7113/api/RuleChains');
      setRuleChains(response.data);
    } catch (error) {
      console.error('Error fetching rule chains:', error.response ? error.response.data : error.message);
    }
  };

  const handleCreateRule = () => {
    setShowCreateRule(true);
  };

  const handleBackToRuleChains = () => {
    setShowCreateRule(false);
    setShowEditRule(false);
  };

  const handleActivateToggle = async (ruleChainId) => {
    try {
      await axios.put(`https://localhost:7113/api/RuleChains/${ruleChainId}/toggle-active`);
      fetchRuleChains();
    } catch (error) {
      console.error('Error updating rule chain status:', error.response ? error.response.data : error.message);
    }
  };

  const handleShowDeleteModal = (ruleChain) => {
    setRuleToDelete(ruleChain);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRuleToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7113/api/RuleChains/${ruleToDelete.ruleChainId}`);
      handleCloseDeleteModal();
      fetchRuleChains();
    } catch (error) {
      console.error('Error deleting rule chain:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditRule = (ruleChain) => {
    setRuleToEdit(ruleChain);
    setShowEditRule(true);
  };

  if (showCreateRule) {
    return <CreateRuleComponent onBack={handleBackToRuleChains} />;
  }

  if (showEditRule) {
    return (
      <EditRuleComponent
        onBack={handleBackToRuleChains}
        ruleChainId={ruleToEdit.ruleChainId}
        initialName={ruleToEdit.name}
        initialDescription={ruleToEdit.description}
      />
    );
  }

  return (
    <div className="rule-chains-page">
      <h2>Rules</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Activate</th>
            <th>Rule Name</th>
            <th>Description</th>
            <th>Is Active</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ruleChains.map((ruleChain) => (
            <tr key={ruleChain.ruleChainId}>
              <td>
                <input
                  type="checkbox"
                  checked={ruleChain.isActive}
                  onChange={() => handleActivateToggle(ruleChain.ruleChainId)}
                />
              </td>
              <td>{ruleChain.name}</td>
              <td>{ruleChain.description}</td>
              <td>{ruleChain.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEditRule(ruleChain)} className="edit-button">
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleShowDeleteModal(ruleChain)} className="delete-button-rc">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateRule} className="create-button">
        Create Rule
      </button>

      <LogsComponent /> {/* Include the LogsComponent here */}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this rule?
          <div><strong>Name:</strong> {ruleToDelete?.name}</div>
          <div><strong>Description:</strong> {ruleToDelete?.description}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RuleChains;
