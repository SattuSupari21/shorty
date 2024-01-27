'use client'

import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "@/state/atoms/user";
import {AlertDialog, Button, Flex, Heading, Link} from "@radix-ui/themes";
import {useEffect} from "react";
import {getUserData, getUserUrls, logoutUser} from "@/app/actions";
import {urlState} from "@/state/atoms/url";
import {useRouter} from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);
    const setUrls = useSetRecoilState(urlState);

    useEffect(() => {
        getUserData().then(function(result) {
            setUser({id: result.id, name: result.name, email: result.email})
        })
    }, []);

    useEffect(() => {
        if (user.id) {
            getUserUrls(user.id).then(function(result) {
                setUrls(result)
            })
        }

    }, [user.id]);

    return (
        <div>
            <Flex align={'center'} justify={'between'} mt={'2'} mx={'6'}>
                <Heading><Link href={'/'} color={'purple'}>Shorty</Link></Heading>
                {user.name ? (
                    <Flex align={'center'} gap={'4'}>
                        <Link href={"/user"}>My Account</Link>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button color="red" variant={'surface'}>Logout</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content style={{ maxWidth: 450 }}>
                                <AlertDialog.Title>Logout</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure you want to logout?
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button variant="solid" color="red" onClick={() => {
                                            logoutUser().then(function(result) {
                                                if (result.status === 'success') {
                                                    setUser({id: 0, name: '', email: ''})
                                                    router.refresh()
                                                }
                                            });
                                        }}>
                                            Logout
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                ) : <Button className='cursor-pointer' variant="outline" onClick={() => router.push('/auth/login')}>Login</Button>}
            </Flex>
        </div>
    )
}