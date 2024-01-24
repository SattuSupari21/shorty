import {Button, Card, Flex, Heading, Link, Text, TextField} from "@radix-ui/themes";
import {InputIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {signupUser} from "@/app/actions";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const res = signupUser({name, email, password});
        console.log(res);
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
                <Button onClick={handleSignup}>Sign up</Button>
                <Text align={'right'} size={'2'}>Already have an account? <Link href={"/auth/login"}>Log in</Link></Text>
            </Flex>
        </Card>
    );
}
