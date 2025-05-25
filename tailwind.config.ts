import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#29235c',
        secondary: '#ff5500',
        lime: '#4bffa5',
        azur: '#4d63ff',
        white: '#F9F7F0',
        black: '#150f2c'
      },
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        // Mobile
        'mobile-h1': ['44px', { fontWeight: '800' }],
        'mobile-h2': ['32px', { fontWeight: '700' }],
        'mobile-h3': ['24px', { fontWeight: '600' }],
        'mobile-body': ['16px', { fontWeight: '400' }],
        'mobile-button': ['20px', { fontWeight: '600' }],
        'mobile-small': ['14px', { fontWeight: '400' }],
        'mobile-subtitle': ['16px', { fontWeight: '600' }],
        'mobile-tag': ['12px', { fontWeight: '500' }],
        'mobile-icon': ['12px', { fontWeight: '400' }],
        'mobile-bold': ['16px', { fontWeight: '700' }],

        // Desktop
        'desktop-h1': ['64px', { fontWeight: '800' }],
        'desktop-h2': ['48px', { fontWeight: '700' }],
        'desktop-h3': ['32px', { fontWeight: '600' }],
        'desktop-subtitle': ['24px', { fontWeight: '600' }],
        'desktop-body': ['24px', { fontWeight: '400' }],
        'desktop-bold': ['24px', { fontWeight: '700' }],
        'desktop-button': ['24px', { fontWeight: '400' }],
        'desktop-small': ['20px', { fontWeight: '400' }],
        'desktop-tag': ['16px', { fontWeight: '500' }],
        'desktop-icon': ['16px', { fontWeight: '400' }]
      }
    }
  },
  plugins: []
}

export default config