import { ThemeProvider } from "styled-components";
import { Router } from './router';;
import { BrowserRouter } from "react-router-dom";

import { defaultTheme } from "./styles/theme/default";
import { GlobalsStyle } from "./styles/global";
import { CyclesContextProvider } from "./contexts/CyclesContext";



export function App() {

  return (
    
    <ThemeProvider theme={defaultTheme}>
      
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalsStyle />
    </ThemeProvider>

  )
}
