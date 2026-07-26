import type { Config } from 'tailwindcss';

/**
 * Pegaris design system.
 * A restrained luxury palette: near-black surfaces, deep crimson accent, white detail.
 * Motion and radii are tuned for a premium, understated feel.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        surface: {
          DEFAULT: '#0d0d0d',
          raised: '#111111',
          overlay: '#151515',
        },
        crimson: {
          DEFAULT: '#B00020',
          soft: '#d11a3a',
          deep: '#7a0016',
        },
        speed: '#B00020',
        balance: '#f5f5f5',
        control: '#2b6fff',
        ink: {
          DEFAULT: '#f5f5f5',
          muted: '#a1a1a1',
          faint: '#6b6b6b',
        },
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest2: '0.35em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(0,0,0,0.7)',
        glow: '0 0 60px -10px rgba(176,0,32,0.35)',
        card: '0 10px 40px -15px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(600px circle at 50% 20%, rgba(176,0,32,0.12), transparent 70%)',
        'crimson-gradient':
          'linear-gradient(135deg, #B00020 0%, #7a0016 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
