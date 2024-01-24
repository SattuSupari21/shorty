"use client"

import LoginPage from "@/app/auth/login/_components/login-page";
import {Container} from "@radix-ui/themes";

export default function Page() {
    return (
        <Container size={'1'} className='h-screen flex items-center justify-center'>
            <LoginPage />
        </Container>
    )
}