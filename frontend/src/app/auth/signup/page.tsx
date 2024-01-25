"use client"

import {Container} from "@radix-ui/themes";
import SignupPage from "@/app/auth/signup/_components/signup-page";
import {RecoilRoot} from "recoil";

export default function Page() {
    return (
        <Container size={'1'} className='h-screen flex items-center justify-center'>
            <SignupPage />
        </Container>
    )
}