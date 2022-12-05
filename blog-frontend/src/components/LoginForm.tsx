import { Box, VStack, Input, Button , Text} from '@chakra-ui/react'
import React from 'react'

interface ILogin {
  username: string;
  password: string;
  submitLogin: () => Promise<void>;
  setUsername : React.Dispatch<React.SetStateAction<string>>;
  setPassword : React.Dispatch<React.SetStateAction<string>>;

}


const LoginForm = ({ username, password, submitLogin, setUsername, setPassword}: ILogin) => {
  return (
    <VStack align='left' width='100%'>
      <Box>
      <Text>Username</Text>
      <Input onChange = {(e) => setUsername(e.target.value)} value={username} type='text' />
      </Box>
      <Box>
      <Text>Password</Text>
      <Input onChange= {(e) => setPassword(e.target.value)} value={password} type='password' />
      </Box>
      <Button onClick={submitLogin} backgroundColor='gray.200'>Login</Button>
    </VStack>
  )
}

export default LoginForm;