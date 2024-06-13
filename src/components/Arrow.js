import React from 'react';

const Arrow = ({ start, end }) => {
  if (!start || !end) return null;

  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;
  const headLength = 10; // Length of the arrowhead

  const angle = Math.atan2(endY - startY, endX - startX);

  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1={endX}
        y1={endY}
        x2={endX - headLength * Math.cos(angle - Math.PI / 6)}
        y2={endY - headLength * Math.sin(angle - Math.PI / 6)}
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1={endX}
        y1={endY}
        x2={endX - headLength * Math.cos(angle + Math.PI / 6)}
        y2={endY - headLength * Math.sin(angle + Math.PI / 6)}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Arrow;
