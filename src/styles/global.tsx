import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
    height: 100%;

    @media (min-width: 1981px) {
      font-size: 80%;
    };
  }

  body {
    height: auto;
    vertical-align: baseline;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }

  body, #root {
    min-height: 100vh;
    position: relative;
  }

  #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }

  a {
    text-decoration: none;
    background: none;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    cursor: pointer;
    border: 0;
    transition: 180ms ease-in-out;
  }

  button {
    cursor: pointer;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    list-style: none;
    text-align: left;
    padding: 0;
  }

  ${({ theme }) => css`
    body,
    input,
    button {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.xsmall};
    }
  `}
`;
