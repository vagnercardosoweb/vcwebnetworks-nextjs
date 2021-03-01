import React from 'react';

import configClient from '@/config/client';

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>{configClient.title}</h1>
    </div>
  );
};

export default Home;
