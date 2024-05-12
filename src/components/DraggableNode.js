import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DraggableNode = ({ id, name, type }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.NODE,
      item: { id, type },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}>
        {name}
      </div>
    );
  };
  

export default DraggableNode;
