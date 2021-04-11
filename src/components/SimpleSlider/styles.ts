import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
`;

export const Content = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const Arrow = styled.button`
  ${({ theme }) => css`
    position: absolute;
    background: transparent;
    border: none;
    font-size: 4rem;
    color: ${theme.color.white};
    font-family: ${theme.font.family.poppins};
    font-weight: ${theme.font.weight.medium};
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);
  `}
`;

export const ArrowLeft = styled(Arrow)`
  left: 2rem;
  content: '<';
`;

export const ArrowRight = styled(Arrow)`
  right: 2rem;
  content: '>';
`;

export const Count = styled.p`
  ${({ theme }) => css`
    top: 1.1rem;
    left: 2rem;
    position: absolute;
    z-index: 3;

    color: ${theme.color.white};
    font-size: 1.4rem;
    font-weight: ${theme.font.weight.medium};
    font-family: ${theme.font.family.poppins};

    letter-spacing: 0.5rem;
  `}
`;

export const FullWidth = styled.button`
  top: 1.2rem;
  right: 2rem;
  position: absolute;
  z-index: 3;
  background: transparent;
  border: none;
  cursor: pointer;
`;
