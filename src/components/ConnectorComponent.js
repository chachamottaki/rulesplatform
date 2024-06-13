import React from 'react';
import Arrow from 'react-svg-arrows';

const ConnectorComponent = ({ start, end }) => {
  if (!start || !end) return null;

  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  return (
    <Arrow
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      color="gray"
      thickness={2}
      headSize={6}
    />
  );
};

export default ConnectorComponent;
