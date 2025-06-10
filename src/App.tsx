import { ThemeProvider } from "styled-components";
import { Router } from './router';;
import { BrowserRouter } from "react-router-dom";

import { defaultTheme } from "./styles/theme/default";
import { GlobalsStyle } from "./styles/global";



export function App() {

  return (
    
    <ThemeProvider theme={defaultTheme}>
      
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <GlobalsStyle />
    </ThemeProvider>

  )
}
