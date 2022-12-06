import { Card, CardBody, Flex, VStack , Text, Heading, useToast, Input, Button} from '@chakra-ui/react';
import { useEffect, useState } from 'react'

function HomePage() {
const [blog, setBlog] = useState<string[]>([]);
const [title, setTitle] = useState('');
const toast = useToast();

    const fetchBlog = async () => {
      const request = await fetch('/api/v1/blog',{
         headers: {
          Authorization: 'Bearer' + localStorage.getItem('token'),
         },
      });
      const data = await request.json();
      setBlog(data);
    };
    const addNew = async () => {
      try{
        if(!title) {
          return;
        }
      
      const request = await fetch('/api/v1/blog', {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json',
        Authorization: 'Bearer' + localStorage.getItem('token'),
      },
      body: JSON.stringify({title}),
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
      fetchBlog();
      setTitle('');
    }catch(error){
      console.log(error)
      toast({
        title: 'Server Error',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
    };
    useEffect ( () => {
    fetchBlog();
    },[])

  return (
  <Flex justifyContent='center' alignItems='center' height='100vh'>
      <Heading>Blogs</Heading>
      <VStack border='1rem' padding='3rem'>
        {blog.map( (blog: any) => (
      <Card>
      <CardBody key={blog.id}>
        <Text>{blog.title}</Text>
      </CardBody>
    </Card>
        ))}

        <VStack >
          <Input value={title} onChange= {(e) => setTitle(e.target.value)} placeholder='Add new blog' />
          <Button onClick={addNew}>Add Blog</Button>
        </VStack>

    </VStack>

  </Flex>    
  )
}

export default HomePage;
