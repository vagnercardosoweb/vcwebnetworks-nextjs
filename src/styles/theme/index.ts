import dark from './colors/dark';
import light from './colors/light';

const theme = {
  color: light,
  colors: { light, dark },
  font: {
    family: {
      default:
        "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      poppins: "'Poppins', sans-serif",
    },
    weight: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
  },
  transition: {
    default: '180ms ease-in-out',
  },
} as const;

export default theme;
