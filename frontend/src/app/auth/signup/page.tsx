"use client"

import {Container} from "@radix-ui/themes";
import Signup from "@/app/components/Signup";

export default function Page() {
    return (
        <Container size={'1'} className='h-screen flex items-center justify-center'>
            <Signup />
        </Container>
    )
}