import dark from './colors/dark';
import light from './colors/light';

const theme = {
  color: light,
  colors: { light, dark },
  font: {
    family:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    weight: {
      thin: 100,
      thinMedium: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    sizes: {
      xxsmall: '1.4rem',
      xsmall: '1.6rem',
      small: '1.8rem',
      medium: '2.2rem',
      large: '2.6rem',
      xlarge: '3.4rem',
      xxlarge: '5.2rem',
    },
  },
  spacing: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '6.0rem',
    xlarge: '6.4rem',
    xxlarge: '12.8rem',
  },
  transition: {
    default: '180ms ease-in-out',
  },
  radii: {
    default: '0.8rem',
    small: '0.4rem',
    smallTop: '0.4rem 0.4rem 0 0',
    smallBottom: '0 0 0.4rem 0.4rem',
    tiny: '0.2rem',
  },
  shadows: {
    default: '0 0.5rem 2rem rgba(0, 0, 0, 0.08)',
    flat: '0 0.2rem 0.2rem rgba(0, 0, 0, 0.08)',
  },
} as const;

export default theme;
