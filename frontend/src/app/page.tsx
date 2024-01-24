"use client"

import {Container, Tabs, Box, Text, Card, Flex, TextField, Button} from "@radix-ui/themes";
import {Link1Icon} from "@radix-ui/react-icons";
import {useState} from "react";
import {createShortUrl} from "@/app/actions";

export default function Home() {

    const [longUrl, setLongUrl] = useState("");

    const handleLongUrl = () => {
        createShortUrl(longUrl).then((res) => console.log(res));
    }

  return (
    <main>
      <Container className='h-screen p-12 flex items-center justify-center'>
          <Card size={'2'}>
              <Tabs.Root defaultValue="url">
                  <Tabs.List className='flex justify-center'>
                      <Tabs.Trigger value="url">Shorten URL</Tabs.Trigger>
                      <Tabs.Trigger value="customUrl">Create custom URL</Tabs.Trigger>
                  </Tabs.List>

                  <Box px="4" pt="5" pb="2">
                      <Tabs.Content value="url">
                          <Flex direction={'column'} gap={'2'}>
                              <Text size={'6'} weight={'bold'}>Shorten a long link</Text>
                              <Text>Paste a long URL</Text>
                          </Flex>
                          <Flex direction={'column'} gap={'5'}>
                              <TextField.Root mt={'3'}>
                                  <TextField.Slot>
                                      <Link1Icon height="16" width="16" />
                                  </TextField.Slot>
                                  <TextField.Input radius={'large'} size="3" type={'url'} placeholder="Enter long link here"
                                    onChange={(e) => setLongUrl(e.target.value)}
                                  />
                              </TextField.Root>
                              <Button onClick={handleLongUrl}>Shorten URL</Button>
                          </Flex>
                      </Tabs.Content>

                      <Tabs.Content value="customUrl">
                          <Flex direction={'column'} gap={'4'}>
                              <Text size={'6'} weight={'bold'}>Shorten a long link</Text>
                              <Text>Paste a long URL</Text>
                          </Flex>
                          <Flex direction={'column'} gap={'4'}>
                              <TextField.Root mt={'3'}>
                                  <TextField.Slot>
                                      <Link1Icon height="16" width="16" />
                                  </TextField.Slot>
                                  <TextField.Input radius={'large'} size="3" type={'url'} placeholder="Enter long link here"/>
                              </TextField.Root>
                              <Text>Custom alias (max 7 characters)</Text>
                              <TextField.Input radius={'large'} size="3" type={'url'} placeholder="Enter custom key here "/>
                              <Button>Shorten URL</Button>
                          </Flex>
                      </Tabs.Content>
                  </Box>
              </Tabs.Root>
          </Card>
      </Container>
    </main>
  );
}
