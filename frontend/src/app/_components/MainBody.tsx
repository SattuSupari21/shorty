import { Box, Button, Card, Flex, Tabs, Text, TextField } from "@radix-ui/themes";
import { Link1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { createShortUrl } from "@/app/actions";
import MainBodyHeading from "@/app/_components/MainBodyHeading";
import FeaturesComponent from "@/app/_components/FeaturesComponent";
import { Toaster, toast } from "react-hot-toast";

export default function MainBody() {

    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [key, setKey] = useState("");

    const handleLongUrl = async () => {
        let result = await createShortUrl(longUrl, key);
        if (result.status !== 'success') {
            toast.error(result.error)
            return;
        }
        setShortUrl(result.shortUrl);
    }

    return (
        <div className='w-full h-full max-w-[1024px] px-16 md:p-8 flex flex-col justify-evenly'>
            <div className="grid place-items-center">
                <MainBodyHeading />
            </div>

            <div>
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

                                    {shortUrl && <Text align={'center'} color={'green'}>{shortUrl}</Text>}

                                    <Button onClick={handleLongUrl}>Shorten URL</Button>
                                </Flex>
                            </Tabs.Content>

                            <Tabs.Content value="customUrl">
                                <Flex direction={'column'} gap={'2'}>
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

                                    {shortUrl && <Text align={'center'} color={'green'}>{shortUrl}</Text>}

                                    <Button onClick={handleLongUrl}>Shorten URL</Button>
                                </Flex>
                            </Tabs.Content>
                        </Box>
                    </Tabs.Root>
                </Card>
            </div>

            <FeaturesComponent />

            <Toaster />

        </div>
    )
}
