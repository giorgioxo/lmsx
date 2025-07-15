/** @type {import('tailwindcss').Config} */

// Admin panel ფერები
const colors = {
  primary: '#2F7DC2', // ლურჯი მთავარი ფერი
  secondary: '#F3F3F3', // ღია ნაცრისფერი
  accent: '#FF5722', // აქცენტის ფერი
  dark: '#222222', // მუქი ტექსტისთვის
  light: '#FFFFFF', // თეთრი
  textGray: '#29292E',
};

const screens = {
  desktop: '1900px',
  laptop: '1024px',
  tablet: '700px',
  mobile: '340px',
};

// custom spacing — დავამატე მეტი მნიშვნელობები
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px', // ახალი
  base: '16px',
  lg: '20px', // ახალი
  xl: '24px',
  '2xl': '28px', // ახალი
  '3xl': '32px', // ახალი
};

// custom font sizes — დავამატე კიდე ზომები
const fontSize = {
  xs: ['10px', { lineHeight: '14px' }], // პატარა ტექსტი
  sm: ['12px', { lineHeight: '16px' }],
  base: ['14px', { lineHeight: '20px' }],
  md: ['16px', { lineHeight: '22px' }], // ახალი
  lg: ['18px', { lineHeight: '24px' }],
  xl: ['24px', { lineHeight: '32px' }],
  '2xl': ['28px', { lineHeight: '36px' }], // ახალი
  '3xl': ['32px', { lineHeight: '40px' }], // ახალი
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
