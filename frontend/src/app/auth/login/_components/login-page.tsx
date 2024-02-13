"use client"

import {Box, Button, Card, Flex, Heading, Link, Text, TextField} from "@radix-ui/themes";
import {InputIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {loginUser} from "@/app/actions";
import {useRouter} from "next/navigation";
import {userState} from "@/state/atoms/user";
import {useRecoilState} from "recoil";

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [user, setUser] = useRecoilState(userState);

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let res = loginUser({email, password})
        res.then(function(result) {
            if (result.status === 'success') {
                setUser({id: result.id, name: result.name, email: result.email})
                router.push('/')
            } else if (result.status === 'error') {
                setError(result.error);
            }
        })
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
                            <TextField.Input type={"email"} placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
                        </TextField.Root>
                    </Flex>
                    <Flex direction={'column'} gap={'2'}>
                        <Text>Password</Text>
                        <TextField.Root>
                            <TextField.Slot>
                                <InputIcon height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input type={'password'} placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
                        </TextField.Root>
                    </Flex>
                    {error && <Text align={'center'} color={'red'}>{error}</Text>}
                    <Button onClick={handleLogin}>Log in</Button>
                    <Text align={'right'} size={'2'}>Don't have an account? <Link href={"/auth/signup"}>Sign up</Link></Text>
                </Flex>
            </Card>
    );
}
