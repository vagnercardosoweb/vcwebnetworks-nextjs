import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 120rem; // 1200px
  margin: 0 auto;
  position: relative;
  display: block;
`;

export const TitleHidden = styled.h1`
  font-size: 0;
  text-indent: -999999px;
  visibility: hidden;
`;

type AspectRatioContentProps = {
  fixHeight?: string;
  aspectRatio?: number;
};

export const AspectRatioContent = styled.div<AspectRatioContentProps>`
  ${({ fixHeight, aspectRatio = 9 / 16 }) => css`
    width: 100%;
    overflow: hidden;
    position: relative;
    display: block;

    height: ${fixHeight || 'auto'};
    padding-top: ${fixHeight ? 'auto' : `${aspectRatio * 100}%`};

    box-shadow: inset 0 0 10px 0 rgb(0, 0, 0, 0.1);
    background: #cccccc;

    img {
      object-fit: cover;
    }

    iframe,
    img,
    object,
    video {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  `}
`;

export const BoxOverlay = styled.div`
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    z-index: 1;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0),
      rgba(0, 0, 0, 0.4) 40%,
      rgba(0, 0, 0, 0.1)
    );
  }
`;
