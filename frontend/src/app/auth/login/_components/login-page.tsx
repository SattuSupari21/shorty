import {Button, Card, Flex, Heading, Link, Text, TextField} from "@radix-ui/themes";
import {InputIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {loginUser} from "@/app/actions";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const res = await loginUser({email, password});
        console.log(res)
    }

    return (
            <Card size={'2'}>
                <Flex direction={'column'} gap={'4'}>
                    <Heading align={'center'}>URL SHORTNER</Heading>
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
                    <Button type={'submit'} onClick={handleLogin}>Log in</Button>
                    <Text align={'right'} size={'2'}>Don't have an account? <Link href={"/auth/signup"}>Sign up</Link></Text>
                </Flex>
            </Card>
    );
}
