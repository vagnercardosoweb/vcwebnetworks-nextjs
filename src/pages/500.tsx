import React from 'react';

const ServerError: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Server error.</h1>
    </div>
  );
};

export default ServerError;
