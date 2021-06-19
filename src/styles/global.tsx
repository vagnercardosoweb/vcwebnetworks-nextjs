import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${({ theme }) => css`
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
      }
    }

    body {
      vertical-align: baseline;
      background: ${theme.color.background};
      color: ${theme.color.text};
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale;
    }

    html,
    body,
    #__next {
      width: 100%;
      height: 100%;
      position: relative;
    }

    body,
    input,
    button {
      font-size: 1.6rem;
      font-family: ${theme.font.family.default};
      font-weight: ${theme.font.weight.regular};
    }

    h1,
    h2,
    h3,
    strong {
      font-weight: ${theme.font.weight.bold};
    }

    h4,
    h5,
    h6 {
      font-weight: ${theme.font.weight.medium};
    }

    a {
      text-decoration: none;
      background: none;
      font-weight: ${theme.font.weight.medium};
      cursor: pointer;
      border: 0;
      transition: ${theme.transition.default};

      :hover {
        color: ${theme.color.primary};
        text-decoration: underline;
      }
    }

    button {
      border: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: ${theme.transition.default};
      cursor: pointer;
      background: none;

      :not(:disabled) {
        cursor: pointer;
      }
    }

    a,
    button {
      -webkit-tap-highlight-color: transparent;
    }

    ul {
      list-style: none;
      text-align: left;
      padding: 0;
    }

    [hidden] {
      display: none !important;
    }

    img {
      width: 100%;
      max-width: 100%;
      height: auto;
    }

    svg {
      flex-shrink: 0;
    }

    img,
    svg {
      vertical-align: middle;
    }

    #nprogress {
      .bar {
        background: ${theme.color.primary};
      }

      .peg {
        box-shadow: 0 0 10px ${theme.color.primary},
          0 0 5px ${theme.color.primary};
      }

      .spinner-icon {
        border-top-color: ${theme.color.primary};
        border-left-color: ${theme.color.primary};
      }
    }
  `}
`;
