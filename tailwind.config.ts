import type { Config } from 'tailwindcss'
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // ?
    extend: {card: "repeat(auto-fit, minmax(200px, 1fr))",},
  },
  plugins: [daisyui],
} satisfies Config

