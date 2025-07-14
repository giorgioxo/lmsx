/** @type {import('tailwindcss').Config} */

// Admin panel ფერები
const colors = {
  primary: '#1A73E8', // ლურჯი მთავარი ფერი
  secondary: '#F3F3F3', // ღია ნაცრისფერი
  accent: '#FF5722', // აქცენტის ფერი
  dark: '#222222', // მუქი ტექსტისთვის
  light: '#FFFFFF', // თეთრი
};

// custom breakpoints
const screens = {
  desktop: '1900px',
  laptop: '1024px',
  tablet: '700px',
  mobile: '340px',
};

// custom spacing
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

// custom font sizes
const fontSize = {
  sm: ['12px', { lineHeight: '16px' }],
  base: ['14px', { lineHeight: '20px' }],
  lg: ['18px', { lineHeight: '24px' }],
  xl: ['24px', { lineHeight: '32px' }],
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
        bold: '700',
      },
    },
  },
  plugins: [],
};
