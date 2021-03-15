export default {
  mode: 'light',
  colors: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    error: '#F44336',
    success: '#20C05C',
    texts: '#030517',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#7B7373',
  },
  font: {
    family:
      "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    weight: {
      thin: 100,
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
} as const;
