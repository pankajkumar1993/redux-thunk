/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px"
    },
    container: {
      center: true,
      padding:{
        xs: "12px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "24px",
        "2xl": "24px"
      },
      screens: {
        xs: "100%",
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px"
      }
    },
    extend: {
      fontFamily:{
        fontPrimary:["'Montserrat', sans-serif"]
      }
    },
  },
  plugins: [],
}