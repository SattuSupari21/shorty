import {Button, Card, Flex, Heading, Link, Text, TextField} from "@radix-ui/themes";
import {InputIcon} from "@radix-ui/react-icons";

export default function Login() {
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
                            <TextField.Input placeholder="Enter your email..." />
                        </TextField.Root>
                    </Flex>
                    <Flex direction={'column'} gap={'2'}>
                        <Text>Password</Text>
                        <TextField.Root>
                            <TextField.Slot>
                                <InputIcon height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input placeholder="Enter your password..." />
                        </TextField.Root>
                    </Flex>
                    <Button>Log in</Button>
                    <Text align={'right'} size={'2'}>Don't have an account? <Link href={"/auth/signup"}>Sign up</Link></Text>
                </Flex>
            </Card>
    );
}
