/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kid: {
          blue: "#38bdf8",
          indigo: "#6366f1",
          purple: "#a855f7",
          pink: "#ec4899",
          yellow: "#facc15",
          orange: "#fb923c",
          green: "#4ade80",
          emerald: "#10b981",
          red: "#f87171",
          softBg: "#f8fafc"
        }
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
      },
      fontFamily: {
        comic: ['"Comic Sans MS"', '"Chalkboard SE"', '"Comic Neue"', 'cursive', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        pop: 'pop 0.25s ease-out',
      }
    },
  },
  plugins: [],
}
