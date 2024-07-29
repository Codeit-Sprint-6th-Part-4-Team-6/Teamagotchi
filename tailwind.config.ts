import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '3xl' : ['32px', '38px'],
      '2xl' : ['24px', '28px'],
      'xl' : ['20px', '24px'],
      '2lg' : ['18px', '21px'],
      'lg' : ['16px', '19px'],
      'md' : ['14px', '17px'],
      'sm' : ['13px', '16px'],
      'xs' : ['12px', '14px']
     },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
