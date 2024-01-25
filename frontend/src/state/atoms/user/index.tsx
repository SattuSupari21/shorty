"use client"

import {atom, RecoilRoot} from "recoil";
import React from "react";
export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {
        name: '',
        email: ''
    }
});

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )
}