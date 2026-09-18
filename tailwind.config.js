/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#FAF9F5",
          100: "#F5F3EC",
          200: "#ECE8DD",
          300: "#DFD9CA",
          400: "#CFC6B2",
          surface: "#FAF8F5",
        },
        forest: {
          900: "#08261B",
          800: "#0D3829",
          700: "#134B37",
          600: "#1A6348",
          500: "#22805D",
          100: "#E3EFEA",
          50: "#F0F7F4",
        },
        terracotta: {
          900: "#7A2715",
          800: "#A33720",
          700: "#C4472C",
          600: "#D95C3F",
          500: "#E66B4E",
          100: "#FCEAE5",
          50: "#FFF5F2",
        },
        celadon: {
          50: "#F2F8F5",
          100: "#DEECE5",
          200: "#C2DED2",
          300: "#A2CEBE",
          500: "#5BA891",
        },
        ink: {
          950: "#0F1412",
          900: "#161D1A",
          800: "#222B27",
          700: "#37423D",
          500: "#5D6D65",
          400: "#86968E",
          300: "#B0BFB7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        'clay-sm': '4px 4px 10px rgba(15, 20, 18, 0.04), -4px -4px 10px rgba(255, 255, 255, 0.9), inset 1px 1px 1px rgba(255, 255, 255, 0.8)',
        'clay-card': '8px 12px 24px rgba(13, 56, 41, 0.06), -6px -6px 18px rgba(255, 255, 255, 0.95), inset 1px 1px 2px rgba(255, 255, 255, 0.9)',
        'clay-card-hover': '12px 18px 32px rgba(13, 56, 41, 0.1), -8px -8px 22px rgba(255, 255, 255, 1), inset 1px 1px 2px rgba(255, 255, 255, 0.95)',
        'clay-btn': '4px 6px 14px rgba(13, 56, 41, 0.12), -3px -3px 10px rgba(255, 255, 255, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        'clay-inset': 'inset 3px 3px 6px rgba(13, 56, 41, 0.06), inset -3px -3px 6px rgba(255, 255, 255, 0.9)',
      },
      animation: {
        "float": "float 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
