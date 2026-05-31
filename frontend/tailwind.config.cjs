/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
        },
        secondary: {
          DEFAULT: '#14B8A6',
          hover: '#0F766E',
          light: '#CCFBF1',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          white: '#FFFFFF',
        },
        status: {
          success: '#22C55E',
          'success-light': '#DCFCE7',
          error: '#EF4444',
          'error-light': '#FEE2E2',
          warning: '#F59E0B',
          'warning-light': '#FEF3C7',
          info: '#3B82F6',
          'info-light': '#DBEAFE',
        },
        border: {
          DEFAULT: '#E2E8F0',
          input: '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        sm2: '0 6px 18px rgba(2,6,23,0.06)'
      },
      transitionProperty: {
        'height': 'height, max-height'
      }
    }
  },
  plugins: []
}
