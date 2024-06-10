import React from 'react';

const CreateEmailModalContent = ({ node }) => {
  return (
    <div>
      <p>Node ID: {node?.id}</p>
      <p>Node Name: {node?.name}</p>
      {/* Add your configuration options here */}
    </div>
  );
};

export default CreateEmailModalContent;
