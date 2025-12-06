import plugin from 'tailwindcss/plugin'
import tokens from './design-tokens.json' assert { type: 'json' }

const { colors, radii, shadows, fontFamily, gradients, typography } = tokens
const textUtilities = {
  '.text-display-1': {
    fontFamily: 'var(--font-sans)',
    fontSize: '96px',
    lineHeight: '96px',
    fontWeight: '700',
  },
  '.text-display-2': {
    fontFamily: 'var(--font-sans)',
    fontSize: '60px',
    lineHeight: '64px',
    fontWeight: '700',
  },
  '.text-h1': {
    fontFamily: 'var(--font-sans)',
    fontSize: '44px',
    lineHeight: '52px',
    fontWeight: '700',
  },
  '.text-h2': {
    fontFamily: 'var(--font-sans)',
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '700',
  },
  '.text-h3': {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
  },
  '.text-body': {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '500',
  },
  '.text-body-bold': {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '700',
  },
  '.text-button': {
    fontFamily: 'var(--font-sans)',
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: '700',
  },
  '.text-small': {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
  },
  '.text-small-bold': {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '700',
  },
  '.text-tag': {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: '600',
    letterSpacing: '0.02em',
  },
  '.text-mini': {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
  },
  '.text-icon': {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  '.text-intermediate': {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: '500',
  },
  '.text-h1-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '64px',
    lineHeight: '72px',
    fontWeight: '700',
  },
  '.text-h2-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '48px',
    lineHeight: '56px',
    fontWeight: '700',
  },
  '.text-h3-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '700',
  },
  '.text-subtitle-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '600',
  },
  '.text-body-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '500',
  },
  '.text-body-desktop-bold': {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
  },
  '.text-intermediate-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '600',
  },
  '.text-button-desktop': {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    lineHeight: '28px',
    fontWeight: '700',
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors,
      borderRadius: radii,
      boxShadow: shadows,
      fontFamily,
      backgroundImage: {
        'hero-gradient': `linear-gradient(135deg, ${gradients.hero[0]} 0%, ${gradients.hero[1]} 50%, ${gradients.hero[2]} 100%)`,
      },
      container: { center: true, padding: '1rem' },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--font-sans': fontFamily.sans.join(', '),
          '--h1-size': typography.h1.size,
          '--h1-weight': typography.h1.weight,
          '--h2-size': typography.h2.size,
          '--h2-weight': typography.h2.weight,
          '--h3-size': typography.h3.size,
          '--h3-weight': typography.h3.weight,
          '--text-size': typography.text.size,
          '--text-weight': typography.text.weight,
          '--btn-size': typography.button.size,
          '--btn-weight': typography.button.weight,
          '--small-size': typography.small.size,
          '--small-weight': typography.small.weight,
        },
      })
    }),
    plugin(({ addUtilities }) => {
      addUtilities(textUtilities)
    }),
  ],
}
