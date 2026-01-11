export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#243E36", // Dark Slate Gray
        secondary: "#7CA982", // Muted Teal
        background: "#F1F7ED", // Mint Cream
        action: "#C2A83E", // Old Gold
      },
    },
  },
  plugins: [],
};

// palette: {
//   mode: "light",
//   primary: {
//     main: "#243E36", //Dark Slate Gray
//   },
//   secondary: {
//     main: "#7CA982", //Muted Teal
//   },
//   background: {
//     default: "#F1F7ED", // Mint Cream
//   },
//   text: {
//     primary: "#000000", //black
//     secondary: "#FFFFFF", //white
//   },
//   action: {
//     active: "#C2A83E", // Old Gold
//   },
