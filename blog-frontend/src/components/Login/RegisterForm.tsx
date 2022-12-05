import { Box, VStack, Input, Button , Text} from '@chakra-ui/react'
import React from 'react'

interface IRegister {
  username: string;
  email: string;
  password: string;
  password2: string;
  submitRegister: () => Promise<void>;
  setUsername : React.Dispatch<React.SetStateAction<string>>;
  setEmail : React.Dispatch<React.SetStateAction<string>>;
  setPassword : React.Dispatch<React.SetStateAction<string>>;
  setPassword2 : React.Dispatch<React.SetStateAction<string>>;

}


const RegisterForm = ({ username, email, password, password2, submitRegister, setUsername, setEmail, setPassword, setPassword2}: IRegister) => {
  return (
    <VStack align='left' width='100%'>
      <Box>
      <Text>Username</Text>
      <Input onChange = {(e) => setUsername(e.target.value)} value={username} type='text' />
      </Box>
      <Box>
      <Text>Email</Text>
      <Input onChange = {(e) => setEmail(e.target.value)} value={email} type='email' />
      </Box>
      <Box>
      <Text>Password</Text>
      <Input onChange= {(e) => setPassword(e.target.value)} value={password} type='password' />
      </Box>
      <Box>
      <Text>Confirm Password</Text>
      <Input onChange= {(e) => setPassword2(e.target.value)} value={password2} type='password' />
      </Box>
      <Button onClick={submitRegister} backgroundColor='gray.200'>Register</Button>
    </VStack>
  )
}

export default RegisterForm;