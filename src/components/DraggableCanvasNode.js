import React from 'react';
import { useDrag } from 'react-dnd';
import { NodeTypes } from './NodeTypes';

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
    <div ref={drag} className="node" style={{
      position: 'absolute',
      left,
      top,
      width: '150px',
      height: '50px',
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '5px',
    }}
    onDoubleClick={() => onDoubleClickNode(id)}
    >
      <div
        onMouseDown={() => onStartConnection(id)}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '10px',
          height: '10px',
          backgroundColor: 'blue',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
      {name}
      <div
        onMouseDown={() => onEndConnection(id)}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default DraggableCanvasNode;
