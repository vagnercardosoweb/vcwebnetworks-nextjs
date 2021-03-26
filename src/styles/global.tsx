import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */

    @media (min-width: 1981px) {
      font-size: 87.5%; /* 1rem = 14px */
    };
  }

  body {
    vertical-align: baseline;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #__next {
    width: 100%;
    height: 100%;
    position: relative;
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
