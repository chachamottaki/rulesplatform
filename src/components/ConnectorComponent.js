import React from 'react';

const ConnectorComponent = ({ start, end }) => {
  if (!start || !end) return null;

  // Calculate start and end points considering the handles at the edges of the node
  const startX = start.left + (start.type === 'input' ? 10 : 150);  // Add half the width of the handle if it's on the left side of the node
  const startY = start.top + 25;  // Middle height of the node
  const endX = end.left + (end.type === 'output' ? 140 : 0);  // Subtract half the width of the handle if it's on the right side of the node
  const endY = end.top + 25;  // Middle height of the node

  // Calculate width and angle for the connector
  const width = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

  return (
    <div style={{
      position: 'absolute',
      left: `${startX}px`,
      top: `${startY}px`,
      width: `${width}px`,
      height: '2px',
      backgroundColor: 'black',
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 0'
    }} />
  );
};

export default ConnectorComponent;
