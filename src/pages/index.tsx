import Link from 'next/link';
import React from 'react';

import configClient from '@/config/client';
import { useTheme } from '@/contexts/theme';

const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Link href="/">
        <a>
          <h1 style={{ color: theme.color.text }}>{configClient.title}</h1>
        </a>
      </Link>
    </div>
  );
};

export default Home;
