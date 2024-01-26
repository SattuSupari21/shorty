import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "@/state/atoms/user";
import {Button, Flex, Heading, Link, Text} from "@radix-ui/themes";
import {useEffect} from "react";
import {getUserData, getUserUrls, logoutUser} from "@/app/actions";
import {urlState} from "@/state/atoms/url";

export default function Header() {
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
            <Flex align={'center'} justify={'between'} m={'2'}>
                <Heading><Link href={'/'} color={'purple'}>Shorty</Link></Heading>
                {user.name ? (
                    <Flex align={'center'} gap={'4'}>
                        <Link href={"/user"}>My Account</Link>
                        <Button onClick={logoutUser}>Log out</Button>
                    </Flex>
                ) : <Link href={"/auth/login"}>Log in</Link>}
            </Flex>
        </div>
    )
}