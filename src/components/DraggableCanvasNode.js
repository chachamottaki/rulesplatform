import React from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';
import './NodeSidebar.css'; // Ensure this is imported for styles

const DraggableCanvasNode = ({ id, name, type, left, top, onStartConnection, onEndConnection, onDoubleClickNode }) => {
  const validType = NodeTypes[type?.toUpperCase()] || NodeTypes.DEFAULT;
  const [{ isDragging }, drag] = useDrag({
    type: validType,
    item: { id, name, type, left, top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="node"
      style={{
        position: 'absolute',
        left,
        top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onDoubleClick={() => onDoubleClickNode(id)}
    >
      <div
        className="connector-point left"
        onMouseDown={() => onStartConnection(id)}
      />
      {name}
      <div
        className="connector-point right"
        onMouseDown={() => onEndConnection(id)}
      />
    </div>
  );
};

export default DraggableCanvasNode;
