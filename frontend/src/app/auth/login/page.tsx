"use client"

import Login from "@/app/components/Login";
import {Container} from "@radix-ui/themes";

export default function Page() {
    return (
        <Container size={'1'} className='h-screen flex items-center justify-center'>
            <Login />
        </Container>
    )
}