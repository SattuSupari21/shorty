import {Box, Button, Card, Container, Flex, Tabs, Text, TextField} from "@radix-ui/themes";
import {Link1Icon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {createShortUrl} from "@/app/actions";

export default function MainBody() {

    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [key, setKey] = useState("");
    const [error, setError] = useState("");

    const handleLongUrl = () => {
        let res = createShortUrl(longUrl, key)
        res.then(function(result) {
            if (result.status === 'success') {
                setShortUrl(result.shortUrl)
            } else if (result.status === 'Unauthorized') {
                setError("You need to log in first.")
            } else if (result.status === 'failed') {
                setError(result.message)
            } else if (result.status === 'error') {
                setError(result.error);
            }
        })
    }

    useEffect(() => {
        setError("")
    }, [shortUrl])

    return (
        <Container className='px-16 md:p-8 flex items-center justify-center'>
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

                                { shortUrl && <Text align={'center'} color={'green'}>{shortUrl}</Text> }
                                { error && <Text align={'center'} color={'red'}>{error}</Text> }


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
                                    <TextField.Input radius={'large'} size="3" type={'url'} placeholder="Enter long link here" onChange={(e) => setLongUrl(e.target.value)} />
                                </TextField.Root>
                                <Text>Custom alias (max 7 characters)</Text>
                                <TextField.Input radius={'large'} size="3" type={'url'} placeholder="Enter custom key here " onChange={(e) => setKey(e.target.value)} />

                                { shortUrl && <Text align={'center'} color={'green'}>{shortUrl}</Text> }
                                { error && <Text align={'center'} color={'red'}>{error}</Text> }

                                <Button onClick={handleLongUrl}>Shorten URL</Button>
                            </Flex>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Card>
        </Container>
    )
}