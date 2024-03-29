import { Box, Button, Card, Flex, Tabs, Text, TextField, Link } from "@radix-ui/themes";
import { CopyIcon, CrossCircledIcon, Link1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
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
        setLongUrl("");
    }

    return (
        <div className='w-full h-full flex flex-col justify-evenly px-2'>
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

                        <Box px="2" pt="4" pb="2">
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

                                    {
                                        shortUrl && <div className="flex gap-2 items-center justify-center">
                                            <CrossCircledIcon className="w-4 h-4 cursor-pointer hover:text-zinc-500 active:text-zinc-700"
                                                onClick={() => {
                                                    setShortUrl("")
                                                    setLongUrl("")
                                                }}
                                            />
                                            <Link href={shortUrl} color={'green'} target="_blank" className="text-center">{shortUrl}</Link>
                                            <CopyIcon className="w-4 h-4 cursor-pointer hover:text-zinc-500 active:text-zinc-700"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(shortUrl)
                                                    toast.success("Link copied successfully!")
                                                }}
                                            />
                                        </div>
                                    }

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

                                    {
                                        shortUrl && <div className="flex gap-2 items-center justify-center">
                                            <CrossCircledIcon className="w-4 h-4 cursor-pointer hover:text-zinc-500 active:text-zinc-700"
                                                onClick={() => {
                                                    setShortUrl("")
                                                    setLongUrl("")
                                                }}
                                            />
                                            <Link href={shortUrl} color={'green'} target="_blank" className="text-center">{shortUrl}</Link>
                                            <CopyIcon className="w-4 h-4 cursor-pointer hover:text-zinc-500 active:text-zinc-700"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(shortUrl)
                                                    toast.success("Link copied successfully!")
                                                }}
                                            />
                                        </div>
                                    }

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
