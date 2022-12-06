import {
  Flex,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export const RegisterPage = () =>{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const nvaigate = useNavigate();
  const toast = useToast();

  const submitRegister = async () => {
    try{
    if(password !== password2){
      toast({
        title: 'Your passwords dosen\'t match',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
      return;
    }

    const request = await fetch('/api/v1/blog/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password,email}) 
    });

    const data = await request.json();

    if(request.status !== 201){
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

    nvaigate('/login')
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
