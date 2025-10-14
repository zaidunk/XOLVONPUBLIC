/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-primary': 'var(--border-primary)',
        'nav-bg': 'var(--nav-bg)',
        'nav-border': 'var(--nav-border)',
        'nav-text': 'var(--nav-text)',
        'nav-icon-bg': 'var(--nav-icon-bg)',
        'nav-icon-border': 'var(--nav-icon-border)',
      },
    },
  },
  plugins: [],
}
