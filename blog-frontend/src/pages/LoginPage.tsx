import {
  Flex,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { useState } from "react";
import LoginForm from "../components/Login/LoginForm";

export const LoginPage = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (

    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <VStack spacing='2rem'>
      <Heading>Login</Heading>
      <LoginForm />
      </VStack>
    </Flex>

);
}
