import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';
import './NodeSidebar.css'; // Ensure this is imported for styles

const DraggableCanvasNode = ({ id, name, type, left, top, onStartConnection, onEndConnection, onDoubleClickNode, onUpdatePosition }) => {
  const validType = NodeTypes[type?.toUpperCase()] || NodeTypes.DEFAULT;
  const [{ isDragging }, drag] = useDrag({
    type: validType,
    item: { id, name, type, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => { // UPDATED
      if (!monitor.didDrop()) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          onUpdatePosition(id, left + delta.x, top + delta.y);
        }
      }
    },
  });

  const handleMouseClick = (event, connectorType) => { // UPDATED
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
    onUpdatePosition(id, left, top);
  }, [left, top]);

  return (
    <div
      ref={drag}
      className="canvas-node"
      style={{
        position: 'absolute',
        left,
        top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onDoubleClick={() => onDoubleClickNode(id)} // RETAINED
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
