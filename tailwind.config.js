/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
    './src/component/**/*.{js,jsx,ts,tsx}',
  ],
  // Safelist some classes while debugging missing utilities
  safelist: [
    'bg-red-400',
    'bg-blue-600',
    'bg-blue-700',
    'hover:bg-blue-700',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
