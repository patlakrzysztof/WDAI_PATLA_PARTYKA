import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // później łatwo zmienisz na dark
    primary: {
      main: "#2563eb", // tailwind blue-600
    },
    secondary: {
      main: "#9333ea", // purple-600
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export default theme;
