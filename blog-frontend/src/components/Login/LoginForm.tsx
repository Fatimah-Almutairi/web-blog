import { Box, VStack, Input, Button , Text} from '@chakra-ui/react'
import React from 'react'

function LoginForm() {
  return (
    <VStack align='left' width='100%'>
      <Box>
      <Text>Username</Text>
      <Input type='text' />
      </Box>
      <Box>
      <Text>Password</Text>
      <Input type='password' />
      </Box>
      <Button backgroundColor='gray.200'>Login</Button>
    </VStack>
  )
}

export default LoginForm