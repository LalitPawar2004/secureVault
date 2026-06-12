/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional slate dark-mode palette setup
        vaultDark: '#0f172a',
        vaultCard: '#1e293b',
        vaultBorder: '#334155',
      }
    },
  },
  plugins: [],
}