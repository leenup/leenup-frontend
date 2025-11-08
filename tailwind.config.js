import plugin from 'tailwindcss/plugin'
import tokens from './design-tokens.json' assert { type: 'json' }

const { colors, radii, shadows, fontFamily, gradients, typography } = tokens

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
  ],
}
