/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        'primary-light': '#a78bfa',
        accent: '#ec4899',
        'accent-light': '#f472b6',
        warm: '#f59e0b',
        glass: 'rgba(255, 255, 255, 0.06)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'glass-hover': 'rgba(255, 255, 255, 0.12)',
      },
      backdropBlur: {
        glass: '32px',
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'glow-primary': 'glowPrimary 3s ease-in-out infinite alternate',
        'glow-accent': 'glowAccent 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'drift-1': 'drift1 35s linear infinite',
        'drift-2': 'drift2 40s linear infinite',
        'drift-3': 'drift3 30s linear infinite',
        'drift-4': 'drift4 45s linear infinite',
        'drift-5': 'drift5 50s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPrimary: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)' },
          '100%': { boxShadow: '0 0 50px rgba(124, 58, 237, 0.5)' },
        },
        glowAccent: {
          '0%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' },
          '100%': { boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)' },
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
        drift1: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10vw, -5vh) rotate(90deg)' },
          '50%': { transform: 'translate(-5vw, 10vh) rotate(180deg)' },
          '75%': { transform: 'translate(8vw, -8vh) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        drift2: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-8vw, 8vh) rotate(-90deg)' },
          '50%': { transform: 'translate(12vw, -3vh) rotate(-180deg)' },
          '75%': { transform: 'translate(-6vw, 6vh) rotate(-270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(-360deg)' },
        },
        drift3: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6vw, -10vh) scale(1.2)' },
          '66%': { transform: 'translate(-10vw, 4vh) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        drift4: {
          '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(-12vw, 8vh) rotate(180deg) scale(1.3)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg) scale(1)' },
        },
        drift5: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(8vw, -6vh) scale(1.4)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
