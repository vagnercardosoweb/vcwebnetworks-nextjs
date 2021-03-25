module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['styled-components', { ssr: true, displayName: true }],
    'inline-react-svg',
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: 'src',
            rootPathPrefix: '@/',
          },
        ],
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            ssr: false,
            displayName: false,
          },
        ],
      ],
    },
  },
};
