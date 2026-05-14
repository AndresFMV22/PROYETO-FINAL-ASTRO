/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0071e3',
        accent: '#5856d6',
        glass: 'rgba(255, 255, 255, 0.07)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-hover': 'rgba(255, 255, 255, 0.12)',
      },
      backdropBlur: {
        glass: '32px',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'orb-1': 'orbMove1 25s ease-in-out infinite',
        'orb-2': 'orbMove2 30s ease-in-out infinite',
        'orb-3': 'orbMove3 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 113, 227, 0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(88, 86, 214, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        orbMove1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4vw, -6vh) scale(1.1)' },
          '66%': { transform: 'translate(-3vw, 4vh) scale(0.9)' },
        },
        orbMove2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-5vw, 3vh) scale(1.15)' },
          '66%': { transform: 'translate(3vw, -5vh) scale(0.85)' },
        },
        orbMove3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2vw, 4vh) scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
