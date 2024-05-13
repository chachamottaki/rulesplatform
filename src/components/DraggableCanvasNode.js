import React from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';
const DraggableCanvasNode = ({ id, name, type, left, top }) => {
  const validType = NodeTypes[type?.toUpperCase()] || NodeTypes.DEFAULT; // Ensuring type is valid
  const [{ isDragging }, drag] = useDrag({
    type: validType,
    item: { id, name, type, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Decide where to place handles based on the node type
  const showLeftHandle = type === 'output'; // Show on left for output type
  const showRightHandle = type === 'input' || type === 'output'; // Show on right for input and output types

  return (
    <div ref={drag} className="node" style={{
      position: 'absolute',
      left,
      top,
      width: '150px', // Define width and height to ensure consistent handle positioning
      height: '50px',
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
    }}>
      {showLeftHandle && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '10px',
            height: '10px',
            transform: 'translate(-100%, -50%)', // Position completely outside the node on the left
            backgroundColor: 'blue',
            borderRadius: '50%',
            border: '2px solid #fff', // White border to blend with the node's background
          }}
        />
      )}
      {name}
      {showRightHandle && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            width: '10px',
            height: '10px',
            transform: 'translate(100%, -50%)', // Position completely outside the node on the right
            backgroundColor: 'red',
            borderRadius: '50%',
            border: '2px solid #fff', // White border to blend with the node's background
          }}
        />
      )}
    </div>
  );
};

export default DraggableCanvasNode;

