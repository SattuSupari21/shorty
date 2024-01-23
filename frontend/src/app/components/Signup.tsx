import {Button, Card, Flex, Heading, Link, Text, TextField} from "@radix-ui/themes";
import {InputIcon} from "@radix-ui/react-icons";

export default function Signup() {
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
                    <Text>Name</Text>
                    <TextField.Root>
                        <TextField.Slot>
                            <InputIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Enter your name..." />
                    </TextField.Root>
                </Flex>
                <Flex direction={'column'} gap={'2'}>
                    <Text>Create a Password</Text>
                    <TextField.Root>
                        <TextField.Slot>
                            <InputIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Enter new password..." />
                    </TextField.Root>
                </Flex>
                <Button>Log in</Button>
                <Text align={'right'} size={'2'}>Already have an account? <Link href={"/auth/login"}>Log in</Link></Text>
            </Flex>
        </Card>
    );
}
