import { Card, CardBody, Flex, VStack , Text, Heading} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function HomePage() {
const [blog, setBlog] = useState();
  useEffect( () => {
    const fetchBlog = async () => {
      const request = await fetch('/api/v1/blog',{
         headers: {
          Authorization: 'Bearer' + localStorage.getItem('token'),
         },
      });
      const data = await request.json();
      setBlog(data);
    };
    fetchBlog();
  },[])
  return (
  <Flex justifyContent='center' alignItems='center' height='100vh'>
      <Heading>Blogs</Heading>
      <VStack border='1rem' padding='3rem'>
        {blog.map( (blog: any) => (
      <Card>
      <CardBody>
        <Text>{blog.title}</Text>
      </CardBody>
    </Card>
        ))}

    </VStack>

  </Flex>    
  )
}

export default HomePage;
