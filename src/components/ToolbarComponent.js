// src/components/ToolbarComponent.js

import React from 'react';
import { useDispatch } from 'react-redux';

const ToolbarComponent = ({ onSave, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const handleSave = () => {
    // Dispatch a save action or call onSave callback
    //dispatch({ type: 'SAVE_RULE_CHAIN' }); //REDUX
    console.log("Save action triggered");
    onSave();
  };

  const handleEdit = () => {
    // Dispatch an edit action or call onEdit callback
    console.log("Edit action triggered");
    onEdit();
  };

  const handleDelete = () => {
    // Dispatch a delete action or call onDelete callback
    console.log("Delete action triggered");
    onDelete();
  };

  return (
    <div className="toolbar">
      <button onClick={handleSave}>Save</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ToolbarComponent;
