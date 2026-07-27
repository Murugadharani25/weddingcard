/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Storefront palette — warm, celebratory
        wine: {
          50: '#FBEEF1',
          400: '#9C3A5C',
          500: '#6B1E3C',
          600: '#551730',
          700: '#3E1123',
        },
        gold: {
          300: '#E3C878',
          400: '#C79A3D',
          500: '#AD8330',
        },
        ivory: {
          50: '#FDF6F0',
          100: '#F8ECE1',
        },
        groom: {
          400: '#3F6B45',
          500: '#2F5233',
          600: '#213B24',
        },
        ink: {
          900: '#2B1B22',
          700: '#4A3540',
          500: '#7A6570',
        },
        // Admin palette — cool, functional, deliberately contrasting
        slate: {
          950: '#0B1220',
          900: '#121A2B',
          800: '#1B2740',
          700: '#293754',
          600: '#3D4E6E',
          400: '#8493B0',
        },
        teal: {
          400: '#3FA6A0',
          500: '#2E8B85',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
