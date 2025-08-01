/** @type {import('tailwindcss').Config} */
const colors = {
  primary: '#2F7DC2',
  secondary: '#F3F3F3',
  accent: '#FF5722',
  dark: '#222222',
  light: '#FFFFFF',
  textGray: '#29292E',
};

const screens = {
  desktop: '1900px',
  laptop: '1024px',
  tablet: '700px',
  mobile: '340px',
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '28px',
  '3xl': '32px',
};

const fontSize = {
  xs: ['10px', { lineHeight: '14px' }],
  sm: ['12px', { lineHeight: '16px' }],
  base: ['14px', { lineHeight: '20px' }],
  md: ['16px', { lineHeight: '22px' }],
  lg: ['18px', { lineHeight: '24px' }],
  xl: ['24px', { lineHeight: '32px' }],
  '2xl': ['28px', { lineHeight: '36px' }],
  '3xl': ['32px', { lineHeight: '40px' }],
};

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors,
      screens,
      spacing,
      fontSize,
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(90deg,rgba(6, 20, 48, 1) 0%, rgba(67, 229, 247, 1) 100%)',
      },
    },
  },
  plugins: [],
};
