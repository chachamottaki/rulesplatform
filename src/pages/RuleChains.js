import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../res/RuleChains.css'; // Import the CSS file
import CreateRuleComponent from '../components/CreateRuleComponent'; // Import the CreateRuleComponent
import EditRuleComponent from '../components/EditRuleComponent'; // Import the EditRuleComponent

const RuleChains = () => {
  const [ruleChains, setRuleChains] = useState([]);
  const [showCreateRule, setShowCreateRule] = useState(false); // State to show CreateRuleComponent
  const [showEditRule, setShowEditRule] = useState(false); // State to show EditRuleComponent
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show delete confirmation modal
  const [ruleToDelete, setRuleToDelete] = useState(null); // State to store the rule to be deleted
  const [ruleToEdit, setRuleToEdit] = useState(null); // State to store the rule to be edited

  useEffect(() => {
    fetchRuleChains();
  }, []);

  const fetchRuleChains = async () => {
    try {
      const response = await axios.get('https://localhost:7113/api/RuleChains'); // Update with your backend endpoint
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

  const handleActivateToggle = async (ruleChainId, isActive) => {
    try {
      await axios.put(`https://localhost:7113/api/RuleChains/${ruleChainId}/activate`, { isActive: !isActive });
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
      fetchRuleChains(); // Refetch the rules after deletion
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
                  onChange={() => handleActivateToggle(ruleChain.ruleChainId, ruleChain.isActive)}
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
                <button onClick={() => handleShowDeleteModal(ruleChain)} className="delete-button">
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

      {/* Delete Confirmation Modal */}
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
