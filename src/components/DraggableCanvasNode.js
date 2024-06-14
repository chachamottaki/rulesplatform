import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';
import '../res/NodeSidebar.css'; // Ensure this is imported for styles

const NODE_WIDTH = 150; // Define a fixed width for all nodes

const DraggableCanvasNode = ({ id, name, type, left, top, onStartConnection, onEndConnection, onDoubleClickNode, onUpdatePosition }) => {
  const validType = NodeTypes[type?.toUpperCase()] || NodeTypes.DEFAULT;
  const [{ isDragging }, drag] = useDrag({
    type: validType,
    item: { id, name, type, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          onUpdatePosition(id, left + delta.x, top + delta.y); // Update node position after drag
        }
      }
    },
  });

  const handleMouseClick = (event, connectorType) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + window.scrollX;
    const centerY = rect.top + rect.height / 2 + window.scrollY;
    if (connectorType === 'right') {
      onStartConnection(id, connectorType, centerX, centerY); // Start connection on click
    } else {
      onEndConnection(id, connectorType, centerX, centerY); // End connection on click
    }
  };

  useEffect(() => {
    onUpdatePosition(id, left, top); // Update position when `left` or `top` changes
  }, [left, top]);

  return (
    <div
      ref={drag}
      className="canvas-node"
      style={{
        position: 'absolute',
        left,
        top,
        width: NODE_WIDTH, // Set the fixed width for the node
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onDoubleClick={() => onDoubleClickNode(id)}
    >
      <div className="connector-point left" onClick={(event) => handleMouseClick(event, 'left')} /> {/* UPDATED */}
      {name}
      <div
        className="connector-point right"
        onClick={(event) => handleMouseClick(event, 'right')} // UPDATED
      />
    </div>
  );
};

export default DraggableCanvasNode;
