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

  const submitLogin = async () => {};
   
  return (

    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <VStack spacing='2rem'>
      <Heading>Login</Heading>
      <LoginForm username={username} 
      setUsername = {setUsername}
      setPassword ={setPassword}
      password= {password} submitLogin= {submitLogin}/>
      </VStack>
    </Flex>

);
}
