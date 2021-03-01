module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    'inline-react-svg',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragmaFrag: 'React.Fragment',
      },
    ],
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
};
