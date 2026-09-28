import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E11D2E",
          "red-dark": "#B8121F",
          blue: "#003DA5",
          "blue-dark": "#002A73",
          "blue-soft": "#E8EEF9",
        },
        ink: {
          DEFAULT: "#0B0F1A",
          soft: "#3A4152",
          muted: "#5F6778",
        },
        mist: {
          DEFAULT: "#F5F6F8",
          dark: "#E4E7EC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,15,26,.04), 0 10px 30px -12px rgba(11,15,26,.12)",
        "card-hover": "0 2px 4px rgba(11,15,26,.06), 0 28px 56px -16px rgba(11,15,26,.28)",
        glass: "0 30px 80px -20px rgba(0,0,0,.5)",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "pulse-ring": "pulseRing 2s cubic-bezier(0.22,1,0.36,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
