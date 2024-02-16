'use client'

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/state/atoms/user";
import { AlertDialog, Button, Flex, Heading, Link } from "@radix-ui/themes";
import { useEffect } from "react";
import { getUserData, getUserUrls, logoutUser } from "@/app/actions";
import { urlState } from "@/state/atoms/url";
import { useRouter } from "next/navigation";
import { userLoading } from "@/state/selectors/isUserLoading";

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);
    const isUserLoading = useRecoilValue(userLoading);
    const setUrls = useSetRecoilState(urlState);

    useEffect(() => {
        getUserData().then(function(result) {
            setUser({ id: result.id, name: result.name, email: result.email, isLoading: false })
        })
    }, []);

    useEffect(() => {
        if (user.id) {
            getUserUrls(user.id).then(function(result) {
                setUrls({ urls: result, isLoading: false })
            })
        }

    }, [user.id]);

    function RenderAuthButtons() {
        if (isUserLoading) return <p>Loading...</p>
        return (
            <Button className='cursor-pointer' variant={"surface"} onClick={() => router.push('/auth/login')}>Login</Button>
        )
    }

    return (
        <div className="w-full max-w-[1024px] flex ">
            <Flex justify={'between'} my={'2'} mx={'4'} className="w-full items-center">
                <Heading><Link href={'/'} color={'purple'}>Shorty</Link></Heading>
                {user.name && !isUserLoading ? (
                    <Flex align={'center'} gap={'4'}>
                        <Link href={"/user"}>My Account</Link>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button color="red" variant={"surface"} className="cursor-pointer">Logout</Button>
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
                                        <Button color="red" className="cursor-pointer" onClick={() => {
                                            logoutUser().then(function(result) {
                                                if (result.status === 'success') {
                                                    setUser({ id: 0, name: '', email: '', isLoading: false })
                                                    router.push('/')
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
                ) : <RenderAuthButtons />}
            </Flex>
        </div>
    )
}
