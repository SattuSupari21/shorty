"use client"

import MainBody from "@/app/_components/MainBody";
import Header from "./_components/Header";
import {RecoilRoot} from "recoil";

export default function Home() {
  return (
          <main className='w-screen h-screen flex flex-col items-center'>
              <Header/>
              <div className="w-full h-full grid place-items-center">
                  <MainBody/>
              </div>
          </main>
  );
}
