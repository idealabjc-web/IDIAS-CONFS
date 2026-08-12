/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the live Exhibz theme stylesheet + Elementor global kit
        brand: {
          purple: '#3b1d82',
          purpleDark: '#241150',
          purpleDeep: '#150a30',
          purpleLight: '#5b34b8',
          violet: '#af0387',
          pink: '#ff007a',
          pinkDark: '#d20055',
          magenta: '#e7015e',
        },
        ink: {
          DEFAULT: '#1c1c24',
          soft: '#55555f',
          muted: '#8a8a96',
        },
        cream: '#faf8fd',
      },
      fontFamily: {
        display: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #3b1d82 0%, #af0387 50%, #ff007a 100%)',
        'brand-gradient-soft': 'linear-gradient(140deg, #241150 0%, #3b1d82 55%, #5b34b8 100%)',
        'brand-sheen': 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,.28) 50%, transparent 80%)',
        'grid-fade':
          'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      boxShadow: {
        glow: '0 12px 34px -12px rgba(175, 3, 135, 0.45)',
        glowLg: '0 26px 60px -16px rgba(255, 0, 122, 0.5)',
        soft: '0 4px 24px -8px rgba(59, 29, 130, 0.16)',
        lift: '0 30px 70px -24px rgba(59, 29, 130, 0.38)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
        shimmer: 'shimmer 1.6s infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        slideDown: 'slideDown .25s ease-out both',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
