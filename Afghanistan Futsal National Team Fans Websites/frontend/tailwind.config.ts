import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#020711",
          900: "#07111f",
          850: "#0b1626",
          800: "#101d30"
        },
        afghan: {
          red: "#d7193f",
          green: "#009b5a",
          gold: "#f5c542"
        }
      },
      fontFamily: {
        sans: ["Inter", "Vazirmatn", "system-ui", "sans-serif"],
        display: ["Poppins", "Vazirmatn", "system-ui", "sans-serif"],
        mono: ["Space Grotesk", "Vazirmatn", "system-ui", "sans-serif"]
      },
      boxShadow: {
        premium: "0 32px 90px rgba(0, 0, 0, 0.36)",
        lift: "0 24px 64px rgba(0, 0, 0, 0.28)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        softPulse: {
          "0%, 100%": { opacity: "0.72" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        rise: "rise 700ms ease-out both",
        softPulse: "softPulse 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
