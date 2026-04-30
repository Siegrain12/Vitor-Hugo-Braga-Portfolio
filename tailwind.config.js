/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Paleta de cores profissional - Purple, Cyan, Indigo
      colors: {
        'primary-purple': '#7c3aed',
        'primary-purple-light': '#a78bfa',
        'primary-cyan': '#06b6d4',
        'primary-cyan-light': '#22d3ee',
        'primary-indigo': '#4f46e5',
        'primary-indigo-light': '#818cf8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-purple-cyan': 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
        'gradient-indigo-purple': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        'gradient-cyan-indigo': 'linear-gradient(135deg, #06b6d4 0%, #4f46e5 100%)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "4rem",
          "3xl": "5rem",
        },
      },
      screens: {
        "4k": "1980px",
      },
    },
  },
  plugins: [],
}
