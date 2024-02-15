"use client"

import MainBody from "@/app/_components/MainBody";
import Header from "./_components/Header";

export default function Home() {
    return (
        <div className='w-screen h-screen flex flex-col items-center'>
            <Header />
            <div className="w-full h-full max-w-[1024px]">
                <MainBody />
            </div>
        </div>
    );
}
