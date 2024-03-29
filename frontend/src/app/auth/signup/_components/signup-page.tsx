"use client"

import { Box, Button, Card, Flex, Heading, Link, Text, TextField } from "@radix-ui/themes";
import { InputIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { signupUser } from "@/app/actions";
import { useSetRecoilState } from "recoil";
import { userState } from "@/state/atoms/user";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const setUserState = useSetRecoilState(userState);

    const handleSignup = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const result = await signupUser({ name, email, password });
        if (result.status === 'success') {
            setUserState({ id: result.id, name: result.name, email: result.email, isLoading: false })
            router.push('/')
        }
        toast.error(result.error);
    }

    return (
        <Card size={'2'}>
            <Flex direction={'column'} gap={'4'}>
                <Box className={'flex flex-col justify-center items-center'}>
                    <Heading size={'8'}>SHORTY</Heading>
                    <Text size={'2'}>A very simple url shortner</Text>
                </Box>
                <Flex direction={'column'} gap={'2'}>
                    <Text>Email</Text>
                    <TextField.Root>
                        <TextField.Slot>
                            <InputIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input type={'email'} placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
                    </TextField.Root>
                </Flex>
                <Flex direction={'column'} gap={'2'}>
                    <Text>Name</Text>
                    <TextField.Root>
                        <TextField.Slot>
                            <InputIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Enter your name..." onChange={(e) => setName(e.target.value)} />
                    </TextField.Root>
                </Flex>
                <Flex direction={'column'} gap={'2'}>
                    <Text>Create a Password</Text>
                    <TextField.Root>
                        <TextField.Slot>
                            <InputIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input type={'password'} placeholder="Enter new password..." onChange={(e) => setPassword(e.target.value)} />
                    </TextField.Root>
                </Flex>
                {error && error.map(err => <Text align={'center'} color={'red'}>{err}</Text>)}
                <Button onClick={(e) => handleSignup(e)}>Sign up</Button>
                <Text align={'right'} size={'2'}>Already have an account? <Link href={"/auth/login"}>Log in</Link></Text>
            </Flex>
            <Toaster />
        </Card>
    );
}
