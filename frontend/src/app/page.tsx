"use client"

import MainBody from "@/app/_components/MainBody";
import Header from "./_components/Header";
import {RecoilRoot} from "recoil";

export default function Home() {
  return (
      <main className='h-screen flex flex-col'>
          <Header />
          <MainBody />
      </main>
  );
}
