import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Canvas from "./Canvas";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B4FE5",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Canvas />
    </ThemeProvider>
  );
}