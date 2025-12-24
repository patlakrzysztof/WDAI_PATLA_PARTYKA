import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#243E36", //Dark Slate Gray
    },
    secondary: {
      main: "#7CA982", //Muted Teal
    },
    background: {
      default: "#F1F7ED", // Mint Cream
    },
    text: {
      primary: "#000000", //black
      secondary: "#FFFFFF", //white
    },
    action: {
      active: "#C2A83E", // Old Gold
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export default theme;
