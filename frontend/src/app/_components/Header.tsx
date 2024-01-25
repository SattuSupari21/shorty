import {useRecoilState, useRecoilValue} from "recoil";
import {userState} from "@/state/atoms/user";
import {Flex, Heading, Link, Text} from "@radix-ui/themes";
import {useEffect} from "react";
import {getUserData} from "@/app/actions";
import * as Avatar from '@radix-ui/react-avatar';

export default function Header() {
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        getUserData().then(function(result) {
            setUser({name: result.name, email: result.email})
        })
    }, []);

    return (
        <div>
            <Flex align={'center'} justify={'between'} m={'2'}>
                <Heading>Shorty</Heading>
                {user.name ? <Link href={"/user"}>My Account</Link> : <Link href={"/auth/login"}>Log in</Link>}
            </Flex>
        </div>
    )
}