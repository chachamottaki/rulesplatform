import React from 'react';

const ConditionModalContent = ({ node }) => {
  return (
    <div>
      <p>Node ID: {node?.id}</p>
      <p>Node Name: {node?.name}</p>
      {/* Add your configuration options here */}
    </div>
  );
};

export default ConditionModalContent;
