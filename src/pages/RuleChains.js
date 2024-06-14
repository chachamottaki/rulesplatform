import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Canvas from '../components/Canvas';
import '../res/RuleChains.css'; // Import the CSS file

const RuleChains = () => {
  const [ruleChains, setRuleChains] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);

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
    setShowCanvas(true);
  };

  const handleActivateToggle = async (ruleChainId, isActive) => {
    try {
      await axios.put(`https://localhost:7113/api/RuleChains/${ruleChainId}/activate`, { isActive: !isActive });
      fetchRuleChains();
    } catch (error) {
      console.error('Error updating rule chain status:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (ruleChainId) => {
    try {
      await axios.delete(`https://localhost:7113/api/RuleChains/${ruleChainId}`);
      fetchRuleChains();
    } catch (error) {
      console.error('Error deleting rule chain:', error.response ? error.response.data : error.message);
    }
  };

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
            <tr key={ruleChain.id}>
              <td>
                <input
                  type="checkbox"
                  checked={ruleChain.isActive}
                  onChange={() => handleActivateToggle(ruleChain.id, ruleChain.isActive)}
                />
              </td>
              <td>{ruleChain.name}</td>
              <td>{ruleChain.description}</td>
              <td>{ruleChain.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => setShowCanvas(true)} className="edit-button">
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(ruleChain.id)} className="delete-button">
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
      {showCanvas && <Canvas />}
    </div>
  );
};

export default RuleChains;
