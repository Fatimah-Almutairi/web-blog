import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";

export const App = () =>{

  return (
    <BrowserRouter>
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path= '/login' element={ <LoginPage />} />
    </Routes>
  </ChakraProvider>
  </BrowserRouter>
);
}
