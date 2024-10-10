/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1440px",
    },
    container: {
      screens: {
        xs: "375px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1440px",
      },
    },
    extend: {
      borderColor: {
        "semi-transparent-white": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        banana: ["Onest", "sans-serif"],
      },
      maxWidth: {
        sm: `${540 / 16}rem`,
        md: `${720 / 16}rem`,
        lg: `${960 / 16}rem`,
        xl: `${1280 / 16}rem`,
        xxl: `${1280 / 16}rem`,
      },
      colors: {
        background: "#F7F9FC",
        foreground: "#3A4856",
        grey: {
          100: "#F5F5F5",
          150: "#fafafa",
          200: "#F5F5F5",
          250: "#f0f0f0",
          300: "#D9D9D9",
          350: "#bfbfbf",
          400: "#8c8c8c",
          450: "#595959",
          500: "#434343",
          550: "#262626",
          600: "#1f1f1f",
          650: "#141414",
        },
        primary: {
          DEFAULT: "#7C9CBF",
          light: "#A3B8D2",
          dark: "#5A7A9F",
          600: "#e50914",
          700: "#BF0010",
          900: "#730011",
          1000: "#4D000E",
        },
        secondary: {
          DEFAULT: "#B5D1C9",
          light: "#D0E3DE",
          dark: "#8FB3A9",
        },
        accent: {
          DEFAULT: "#F2C4CE",
          light: "#F8DBE1",
          dark: "#E7A2B1",
        },
        text: {
          dark: "#3A4856",
          light: "#7B8794",
        },
        success: {
          DEFAULT: "#9ED3AB",
          light: "#C1E5C9",
          dark: "#7AB88D",
        },
        warning: {
          DEFAULT: "#F3D8A6",
          light: "#F9E8C8",
          dark: "#E9C37F",
        },
        danger: {
          DEFAULT: "#E3A5A1",
          light: "#EFC4C1",
          dark: "#D38078",
        },
        neutral: {
          100: "#ffffff",
          700: "#8C8C8C",
        },
        border: "#E1E8EF",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        28: "28px",
        36: "36px",
        56: "56px",
      },
      lineHeight: {
        "1-21": "1.21",
        "1-43": "1.43",
        "1-5": "1.5",
        "1-63": "1.63",
        "1-86": "1.86",
      },
    },
  },
  plugins: [],
};
