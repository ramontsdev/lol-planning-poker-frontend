import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../assets/styles/global";
import { Container } from "./styles";

import defaultTheme from '../assets/styles/themes/default'
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "../routes";
import { PokerContextProvider } from "../contexts/poker-context";
import ToastContainer from "../components/toast/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <Container>
          <PokerContextProvider>
            <MyRoutes />
          </PokerContextProvider>
        </Container>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
