import {
  Flex,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react";
import RegisterForm from "../components/Login/RegisterForm";

export const RegisterPage = () =>{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const toast = useToast();

  const submitRegister = async () => {
    if(password !== password2){
      toast({
        title: 'Your passwords dosen\'t match',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
      return;
    }

    const request = await fetch('')
  };
   
  return (

    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <VStack spacing='2rem'>
      <Heading>Register</Heading>
      <RegisterForm username={username} 
      email={email}
      setUsername = {setUsername}
      setEmail = {setEmail}
      setPassword ={setPassword} 
      setPassword2= {setPassword2}
      password2 ={password2}
      password= {password} submitRegister= {submitRegister}/>
      </VStack>
    </Flex>

);
}
