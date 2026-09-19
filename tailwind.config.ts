import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forma: {
          black: '#101820',
          white: '#FFFFFF',
          purple: '#6F2DA8',
          pink: '#FF91A4',
        },
      },
    },
  },
  plugins: [],
}
export default config
