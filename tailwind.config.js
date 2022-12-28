/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/components/*.{js,ts,jsx,tsx}',
    './src/common/components/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      light: {
        bg: '#FFFFFF',
        'high-contrast': '#0A0A0A',
        'medium-contrast': '#5A5A5A',
        'low-contrast': '#909590'
      },
      utilities: {
        error: 'rgba(208,2,27,1)',
        'error-75': 'rgba(208,2,27,0.75)',
        success: 'rgba(1,203,52,1)',
        'success-75': 'rgba(1,203,52,0.75)'
      }
    },
    extend: {}
  },
  plugins: []
}
