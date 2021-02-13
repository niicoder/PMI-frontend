const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["HelveticaNeue", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "primary-light": "#893dff",
        primary: "#43148e",
        secondary: "#ff610f"
      },
      spacing: {
        "72": "18rem"
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")]
};
