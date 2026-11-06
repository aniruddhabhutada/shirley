import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shirley: {
          plum: {
            deep: "#65344F",
            rich: "#452039",
            dark: "#2E2029",
            light: "#824667",
          },
          berry: {
            vibrant: "#C84B83",
            accent: "#E25894",
            soft: "#E88DAF",
          },
          blush: {
            DEFAULT: "#F8DDE5",
            light: "#FFF2F6",
            border: "#ECC7D2",
          },
          peach: {
            DEFAULT: "#FFE0D2",
            light: "#FFF4EE",
            warm: "#F5C3AE",
          },
          lavender: {
            DEFAULT: "#C5B5F0",
            light: "#F2EEFC",
            soft: "#E3DBF8",
          },
          yellow: {
            mango: "#FFD65A",
            hover: "#F2C63E",
            light: "#FFF4D2",
          },
          blue: {
            sky: "#D5EAF5",
            light: "#F0F7FB",
          },
          cream: {
            DEFAULT: "#FFF9F5",
            card: "#FFFFFF",
            warm: "#FAF4F0",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft-plum': '0 10px 30px -10px rgba(69, 32, 57, 0.15)',
        'elevated': '0 20px 40px -15px rgba(69, 32, 57, 0.12)',
        'glow-berry': '0 0 25px rgba(200, 75, 131, 0.35)',
        'glow-yellow': '0 4px 20px rgba(255, 214, 90, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

