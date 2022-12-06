import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

export const App = () =>{

  return (
    <BrowserRouter>
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path= '/login' element={ <LoginPage />} />
      <Route path= '/register' element={ <RegisterPage />} />
      <Route element={<ProtectedRoute /> }>
      <Route path= '/' element={ <HomePage />} />
      </Route>
    </Routes>
  </ChakraProvider>
  </BrowserRouter>
);
}
