import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  presets: [require("tailwindcss-preset-px-to-rem")],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: { min: '744px' },
      lg: { min: '1200px' },
    },
    fontSize: {
      '4xl': ['40px', '48px'],
      '3xl': ['32px', '38px'],
      '2xl': ['24px', '28px'],
      'xl': ['20px', '24px'],
      '2lg': ['18px', '21px'],
      'lg': ['16px', '19px'],
      'md': ['14px', '17px'],
      'sm': ['13px', '16px'],
      'xs': ['12px', '14px'],
    },
    colors: {
      brand: {
        primary:'#FF9F0D',
        secondary: '#fd7e14',
        tertiary: '#ff922b',
        'gradient-start': '#e8590c',
        'gradient-end': '#ffd43b',
      },
      point: {
        green: '#10B981',
        purple: '#A855F7',
        blue: '#3B82F6',
        cyan: '#06B6D4',
        pink: '#EC4899',
        rose: '#F43F5E',
        red: '#DC2626',
        orange: '#F97316',
        yellow: '#EAB308',
      },
      background: {
        primary: '#111111',
        secondary: '#1A1A1A',
        tertiary: '#2e3135',
        inverse: '#FFFFFF',
      },
      interaction: {
        inactive: '#94A3B8',
        hover: '#ff922b',
        pressed: '#fd7e14',
        focus: '#e8590c',
      },
      border: {
        primary: 'rgba(248, 250, 252, 0.1)',
        white: '#ffffff'
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#6f7277',
        tertiary: '#989ca0',
        default: '#c3c7cc',
        inverse: '#FFFFFF',
        disabled: '#94A3B8',
        gray400: '#9ca3af',
        transparent: 'transparent'
      },
      status: {
        danger: '#DC2626',
      },
      icon: {
        primary: '#c3c7cc',
        inverse: '#F8FAFC',
        brand: '#10B981',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    keyframes: {
      fadeIn: {
        from: {opacity: "0", transform: "translate3d(-50%, 60px, 0)"},
        to: {opacity: "1", transform: "translate3d(-50%, 0, 0)"}
      }
    },
    animation: {
      fadeIn: "fadeIn 0.5s",
    }
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.modal': {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '48px',
          paddingRight: '48px',
          paddingTop: '48px',
          paddingBottom: '40px',
        },
        '.modal-close-icon': {
          position: 'absolute',
          right: '16px',
          top: '16px',
          marginLeft: 'auto',
          cursor: 'pointer',
        },
        '.modal-title': {
          margin: 'auto',
          marginBottom: '8px',
          color: '#F8FAFC',
          fontWeight: '500',
          fontSize: '16px',
        },
        '.modal-content': {
          margin: 'auto',
          marginBottom: '16px',
          color: '#CBD5E1',
          fontWeight: '500',
          fontSize: '14px',
          textAlign: 'center',
        }
      });
    },
    function ({ addVariant }: PluginAPI) {
      addVariant('light', ['.light &', 'html:not(.dark) &', '@media (prefers-color-scheme: light)']);
    }
  ],
  darkMode: 'selector',
};

export default config;
