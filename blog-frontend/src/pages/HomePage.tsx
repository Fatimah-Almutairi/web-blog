import {
  Flex,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react";
import LoginForm from "../components/LoginForm";

export const HomePage = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();


  const submitLogin = async () => {
    try{
      const request = await fetch('/api/v1/blog/login',
      {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
       } ,
       body: JSON.stringify({username, password})
      });
      const data = await request.json();
      if(request.status!== 200){
        toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          position: 'top',
        });
        return;
      }
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        position: 'top',
      });

      localStorage.setItem('token', data.token)

    }catch(error){
      toast({
        title: 'Server Error',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };
   
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